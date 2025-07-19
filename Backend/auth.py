from functools import wraps
from flask import jsonify, request, session
from flask_login import current_user, login_required
import jwt
from datetime import datetime, timedelta
import os

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check for token in Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]  # Bearer <token>
            except IndexError:
                return jsonify({'error': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, os.getenv('SECRET_KEY', 'your-secret-key'), algorithms=['HS256'])
            current_user_id = data['user_id']
            current_user_role = data['role']
            
            # Add user info to request context
            request.current_user = {
                'id': current_user_id,
                'role': current_user_role
            }
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token is invalid'}), 401

        return f(*args, **kwargs)
    return decorated

def role_required(allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not hasattr(request, 'current_user'):
                return jsonify({'error': 'Authentication required'}), 401
            
            user_role = request.current_user.get('role')
            if user_role not in allowed_roles:
                return jsonify({'error': 'Insufficient permissions'}), 403
                
            return f(*args, **kwargs)
        return decorated
    return decorator

def resource_permission_required(resource):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not hasattr(request, 'current_user'):
                return jsonify({'error': 'Authentication required'}), 401
            
            user_role = request.current_user.get('role')
            
            # Define permissions for each role
            permissions = {
                'admin': ['containers', 'operations', 'personnel', 'shifts', 'navires', 'engins', 'arrets', 'missions', 'occupations'],
                'manager': ['operations', 'personnel', 'shifts', 'navires', 'engins', 'missions', 'occupations'],
                'personnel': ['containers']
            }
            
            if resource not in permissions.get(user_role, []):
                return jsonify({'error': f'Access denied to {resource}'}), 403
                
            return f(*args, **kwargs)
        return decorated
    return decorator

def generate_token(user_id, role):
    """Generate JWT token for user"""
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.utcnow() + timedelta(hours=24),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, os.getenv('SECRET_KEY', 'your-secret-key'), algorithm='HS256')