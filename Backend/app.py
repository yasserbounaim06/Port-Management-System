import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import check_password_hash
from models.user import db, User
from auth import generate_token

# Load environment variables from .env file at project root
load_dotenv()

app = Flask(__name__, instance_relative_config=True)

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:4200"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
CORS(app, origins=['http://localhost:4200'], supports_credentials=True)

# Load config from config.py (project root or instance/)
app.config.from_pyfile(os.getenv('FLASK_CONFIG', 'config.py'), silent=True)

# Override with environment variables (recommended for secrets)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', app.config.get('SQLALCHEMY_DATABASE_URI'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# --- Models (Corrected) ---
class Container(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    container_number = db.Column(db.String(20), nullable=False, unique=True)
    iso_code = db.Column(db.String(10))
    other_info = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    horaire_debut = db.Column(db.Time, nullable=False)
    horaire_fin = db.Column(db.Time, nullable=False)
    nom = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class Personnel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    prenom = db.Column(db.String(50), nullable=False)
    poste = db.Column(db.String(50), nullable=False)
    id_shift = db.Column(db.Integer, db.ForeignKey('shift.id'), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class Navire(db.Model):
    matricule_navire = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class Engins(db.Model):
    matricule_engin = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    type_engin = db.Column(db.String(50))
    statut = db.Column(db.String(20), default='disponible')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class Arrets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    duree = db.Column(db.Integer)  # durée en minutes
    type_arret = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

# --- Association tables for many-to-many relationships ---
operation_containers = db.Table('operation_containers',
    db.Column('operation_id', db.Integer, db.ForeignKey('operation.id'), primary_key=True),
    db.Column('container_id', db.Integer, db.ForeignKey('container.id'), primary_key=True)
)

operation_engins = db.Table('operation_engins',
    db.Column('operation_id', db.Integer, db.ForeignKey('operation.id'), primary_key=True),
    db.Column('matricule_engin', db.Integer, db.ForeignKey('engins.matricule_engin'), primary_key=True)
)

operation_shifts = db.Table('operation_shifts',
    db.Column('operation_id', db.Integer, db.ForeignKey('operation.id'), primary_key=True),
    db.Column('shift_id', db.Integer, db.ForeignKey('shift.id'), primary_key=True)
)

operation_personnels = db.Table('operation_personnels',
    db.Column('operation_id', db.Integer, db.ForeignKey('operation.id'), primary_key=True),
    db.Column('personnel_id', db.Integer, db.ForeignKey('personnel.id'), primary_key=True)
)

class Operation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    type_operation = db.Column(db.String(50))
    statut = db.Column(db.String(20), default='planifiee')
    date_debut = db.Column(db.DateTime)
    date_fin = db.Column(db.DateTime)
    id_navire = db.Column(db.Integer, db.ForeignKey('navire.matricule_navire'), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    containers = db.relationship('Container', secondary=operation_containers, backref='operations')
    engins = db.relationship('Engins', secondary=operation_engins, backref='operations')
    shifts = db.relationship('Shift', secondary=operation_shifts, backref='operations')
    personnels = db.relationship('Personnel', secondary=operation_personnels, backref='operations')

class Mission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_personnel = db.Column(db.Integer, db.ForeignKey('personnel.id'), nullable=False)
    id_operation = db.Column(db.Integer, db.ForeignKey('operation.id'), nullable=False)
    role = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class Occupation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    matricule_engin = db.Column(db.Integer, db.ForeignKey('engins.matricule_engin'), nullable=False)
    id_operation = db.Column(db.Integer, db.ForeignKey('operation.id'), nullable=False)
    heure_debut = db.Column(db.DateTime)
    heure_fin = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    

# --- Initialize Database ---
with app.app_context():
    db.create_all()

# ========================================
# CONTAINER ROUTES (Already implemented)
# ========================================

@app.route('/api/containers', methods=['POST'])
def add_container():
    data = request.get_json()
    container_number = data.get('container_number')
    iso_code = data.get('iso_code')
    other_info = data.get('other_info')

    if not container_number:
        return jsonify({'error': 'container_number is required'}), 400

    existing_container = Container.query.filter_by(container_number=container_number).first()
    if existing_container:
        return jsonify({'error': 'Container with this number already exists'}), 409

    new_container = Container(
        container_number=container_number,
        iso_code=iso_code,
        other_info=other_info
    )
    db.session.add(new_container)
    db.session.commit()
    return jsonify({'message': 'Container saved', 'id': new_container.id}), 201

@app.route('/api/containers', methods=['GET'])
def get_containers():
    containers = Container.query.all()
    results = []
    for c in containers:
        results.append({
            'id': c.id,
            'container_number': c.container_number,
            'iso_code': c.iso_code,
            'other_info': c.other_info,
            'created_at': c.created_at.isoformat() if c.created_at else None,
            'updated_at': c.updated_at.isoformat() if c.updated_at else None
        })
    return jsonify(results)

@app.route('/api/containers/<int:container_id>', methods=['GET'])
def get_container(container_id):
    container = Container.query.get(container_id)
    if not container:
        return jsonify({'error': 'Container not found'}), 404
    
    return jsonify({
        'id': container.id,
        'container_number': container.container_number,
        'iso_code': container.iso_code,
        'other_info': container.other_info,
        'created_at': container.created_at.isoformat() if container.created_at else None,
        'updated_at': container.updated_at.isoformat() if container.updated_at else None
    }), 200

@app.route('/api/containers/<int:container_id>', methods=['PUT'])
def update_container(container_id):
    container = Container.query.get(container_id)
    if not container:
        return jsonify({'error': 'Container not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'container_number' in data:
        existing_container = Container.query.filter(
            Container.container_number == data['container_number'],
            Container.id != container_id
        ).first()
        if existing_container:
            return jsonify({'error': 'Container with this number already exists'}), 409
    
    if 'container_number' in data:
        container.container_number = data['container_number']
    if 'iso_code' in data:
        container.iso_code = data['iso_code']
    if 'other_info' in data:
        container.other_info = data['other_info']
    
    try:
        db.session.commit()
        return jsonify({
            'message': 'Container updated successfully',
            'id': container.id,
            'container_number': container.container_number,
            'iso_code': container.iso_code,
            'other_info': container.other_info,
            'created_at': container.created_at.isoformat() if container.created_at else None,
            'updated_at': container.updated_at.isoformat() if container.updated_at else None
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update container'}), 500

@app.route('/api/containers/<int:container_id>', methods=['DELETE'])
def delete_container(container_id):
    container = Container.query.get(container_id)
    if not container:
        return jsonify({'error': 'Container not found'}), 404
    
    try:
        db.session.delete(container)
        db.session.commit()
        return jsonify({
            'message': 'Container deleted successfully',
            'deleted_container': {
                'id': container.id,
                'container_number': container.container_number
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete container'}), 500

@app.route('/api/containers/search', methods=['GET'])
def search_containers():
    container_number = request.args.get('number')
    iso_code = request.args.get('iso_code')
    
    if not container_number and not iso_code:
        return jsonify({'error': 'Please provide number or iso_code parameter'}), 400
    
    query = Container.query
    
    if container_number:
        query = query.filter(Container.container_number.ilike(f'%{container_number}%'))
    
    if iso_code:
        query = query.filter(Container.iso_code.ilike(f'%{iso_code}%'))
    
    containers = query.all()
    
    results = []
    for c in containers:
        results.append({
            'id': c.id,
            'container_number': c.container_number,
            'iso_code': c.iso_code,
            'other_info': c.other_info,
            'created_at': c.created_at.isoformat() if c.created_at else None,
            'updated_at': c.updated_at.isoformat() if c.updated_at else None
        })
    
    return jsonify({
        'containers': results,
        'count': len(results)
    }), 200

# ========================================
# PERSONNEL ROUTES
# ========================================

@app.route('/api/personnel', methods=['POST'])
def add_personnel():
    data = request.get_json()
    nom = data.get('nom')
    prenom = data.get('prenom')
    poste = data.get('poste')
    id_shift = data.get('id_shift')

    if not nom or not prenom or not poste:
        return jsonify({'error': 'nom, prenom, and poste are required'}), 400

    new_personnel = Personnel(
        nom=nom,
        prenom=prenom,
        poste=poste,
        id_shift=id_shift
    )
    db.session.add(new_personnel)
    db.session.commit()
    return jsonify({'message': 'Personnel saved', 'id': new_personnel.id}), 201

@app.route('/api/personnel', methods=['GET'])
def get_personnel():
    personnel = Personnel.query.all()
    results = []
    for p in personnel:
        results.append({
            'id': p.id,
            'nom': p.nom,
            'prenom': p.prenom,
            'poste': p.poste,
            'id_shift': p.id_shift,
            'created_at': p.created_at.isoformat() if p.created_at else None,
            'updated_at': p.updated_at.isoformat() if p.updated_at else None
        })
    return jsonify(results)

@app.route('/api/personnel/<int:personnel_id>', methods=['GET'])
def get_personnel_by_id(personnel_id):
    personnel = Personnel.query.get(personnel_id)
    if not personnel:
        return jsonify({'error': 'Personnel not found'}), 404
    
    return jsonify({
        'id': personnel.id,
        'nom': personnel.nom,
        'prenom': personnel.prenom,
        'poste': personnel.poste,
        'id_shift': personnel.id_shift,
        'created_at': personnel.created_at.isoformat() if personnel.created_at else None,
        'updated_at': personnel.updated_at.isoformat() if personnel.updated_at else None
    }), 200

@app.route('/api/personnel/<int:personnel_id>', methods=['PUT'])
def update_personnel(personnel_id):
    personnel = Personnel.query.get(personnel_id)
    if not personnel:
        return jsonify({'error': 'Personnel not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'nom' in data:
        personnel.nom = data['nom']
    if 'prenom' in data:
        personnel.prenom = data['prenom']
    if 'poste' in data:
        personnel.poste = data['poste']
    if 'id_shift' in data:
        personnel.id_shift = data['id_shift']
    
    try:
        db.session.commit()
        return jsonify({'message': 'Personnel updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update personnel'}), 500

@app.route('/api/personnel/<int:personnel_id>', methods=['DELETE'])
def delete_personnel(personnel_id):
    personnel = Personnel.query.get(personnel_id)
    if not personnel:
        return jsonify({'error': 'Personnel not found'}), 404
    
    try:
        db.session.delete(personnel)
        db.session.commit()
        return jsonify({'message': 'Personnel deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete personnel'}), 500

@app.route('/api/personnel/search', methods=['GET'])
def search_personnel():
    nom = request.args.get('nom')
    poste = request.args.get('poste')
    
    query = Personnel.query
    
    if nom:
        query = query.filter(Personnel.nom.ilike(f'%{nom}%'))
    if poste:
        query = query.filter(Personnel.poste.ilike(f'%{poste}%'))
    
    personnel = query.all()
    results = []
    for p in personnel:
        results.append({
            'id': p.id,
            'nom': p.nom,
            'prenom': p.prenom,
            'poste': p.poste,
            'id_shift': p.id_shift
        })
    
    return jsonify({'personnel': results, 'count': len(results)})

# ========================================
# SHIFT ROUTES
# ========================================

@app.route('/api/shifts', methods=['POST'])
def add_shift():
    data = request.get_json()
    horaire_debut = data.get('horaire_debut')
    horaire_fin = data.get('horaire_fin')
    nom = data.get('nom')

    if not horaire_debut or not horaire_fin:
        return jsonify({'error': 'horaire_debut and horaire_fin are required'}), 400

    try:
        from datetime import time
        # Parse time strings (format: "HH:MM")
        debut = time.fromisoformat(horaire_debut)
        fin = time.fromisoformat(horaire_fin)
        
        new_shift = Shift(
            horaire_debut=debut,
            horaire_fin=fin,
            nom=nom
        )
        db.session.add(new_shift)
        db.session.commit()
        return jsonify({'message': 'Shift saved', 'id': new_shift.id}), 201
    except Exception as e:
        return jsonify({'error': 'Invalid time format. Use HH:MM'}), 400

@app.route('/api/shifts', methods=['GET'])
def get_shifts():
    shifts = Shift.query.all()
    results = []
    for s in shifts:
        results.append({
            'id': s.id,
            'horaire_debut': s.horaire_debut.strftime('%H:%M') if s.horaire_debut else None,
            'horaire_fin': s.horaire_fin.strftime('%H:%M') if s.horaire_fin else None,
            'nom': s.nom,
            'created_at': s.created_at.isoformat() if s.created_at else None,
            'updated_at': s.updated_at.isoformat() if s.updated_at else None
        })
    return jsonify(results)

@app.route('/api/shifts/<int:shift_id>', methods=['GET'])
def get_shift(shift_id):
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({'error': 'Shift not found'}), 404
    
    return jsonify({
        'id': shift.id,
        'horaire_debut': shift.horaire_debut.strftime('%H:%M') if shift.horaire_debut else None,
        'horaire_fin': shift.horaire_fin.strftime('%H:%M') if shift.horaire_fin else None,
        'nom': shift.nom,
        'created_at': shift.created_at.isoformat() if shift.created_at else None,
        'updated_at': shift.updated_at.isoformat() if shift.updated_at else None
    }), 200

@app.route('/api/shifts/<int:shift_id>', methods=['PUT'])
def update_shift(shift_id):
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({'error': 'Shift not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        from datetime import time
        if 'horaire_debut' in data:
            shift.horaire_debut = time.fromisoformat(data['horaire_debut'])
        if 'horaire_fin' in data:
            shift.horaire_fin = time.fromisoformat(data['horaire_fin'])
        if 'nom' in data:
            shift.nom = data['nom']
        
        db.session.commit()
        return jsonify({'message': 'Shift updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update shift or invalid time format'}), 500

@app.route('/api/shifts/<int:shift_id>', methods=['DELETE'])
def delete_shift(shift_id):
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({'error': 'Shift not found'}), 404
    
    try:
        db.session.delete(shift)
        db.session.commit()
        return jsonify({'message': 'Shift deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete shift'}), 500

# ========================================
# NAVIRE ROUTES
# ========================================

@app.route('/api/navires', methods=['POST'])
def add_navire():
    data = request.get_json()
    matricule_navire = data.get('matricule_navire')
    nom = data.get('nom')
    capacity = data.get('capacity')

    if not matricule_navire or not nom:
        return jsonify({'error': 'matricule_navire and nom are required'}), 400

    existing_navire = Navire.query.filter_by(matricule_navire=matricule_navire).first()
    if existing_navire:
        return jsonify({'error': 'Navire with this matricule already exists'}), 409

    new_navire = Navire(
        matricule_navire=matricule_navire,
        nom=nom,
        capacity=capacity
    )
    db.session.add(new_navire)
    db.session.commit()
    return jsonify({'message': 'Navire saved', 'matricule_navire': new_navire.matricule_navire}), 201

@app.route('/api/navires', methods=['GET'])
def get_navires():
    navires = Navire.query.all()
    results = []
    for n in navires:
        results.append({
            'matricule_navire': n.matricule_navire,
            'nom': n.nom,
            'capacity': n.capacity,
            'created_at': n.created_at.isoformat() if n.created_at else None,
            'updated_at': n.updated_at.isoformat() if n.updated_at else None
        })
    return jsonify(results)

@app.route('/api/navires/<int:matricule_navire>', methods=['GET'])
def get_navire(matricule_navire):
    navire = Navire.query.get(matricule_navire)
    if not navire:
        return jsonify({'error': 'Navire not found'}), 404
    
    return jsonify({
        'matricule_navire': navire.matricule_navire,
        'nom': navire.nom,
        'capacity': navire.capacity,
        'created_at': navire.created_at.isoformat() if navire.created_at else None,
        'updated_at': navire.updated_at.isoformat() if navire.updated_at else None
    }), 200

@app.route('/api/navires/<int:matricule_navire>', methods=['PUT'])
def update_navire(matricule_navire):
    navire = Navire.query.get(matricule_navire)
    if not navire:
        return jsonify({'error': 'Navire not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'nom' in data:
        navire.nom = data['nom']
    if 'capacity' in data:
        navire.capacity = data['capacity']
    
    try:
        db.session.commit()
        return jsonify({'message': 'Navire updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update navire'}), 500

@app.route('/api/navires/<int:matricule_navire>', methods=['DELETE'])
def delete_navire(matricule_navire):
    navire = Navire.query.get(matricule_navire)
    if not navire:
        return jsonify({'error': 'Navire not found'}), 404
    
    try:
        db.session.delete(navire)
        db.session.commit()
        return jsonify({'message': 'Navire deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete navire'}), 500

# ========================================
# ENGINS ROUTES
# ========================================

@app.route('/api/engins', methods=['POST'])
def add_engin():
    data = request.get_json()
    matricule_engin = data.get('matricule_engin')
    nom = data.get('nom')
    type_engin = data.get('type_engin')
    statut = data.get('statut', 'disponible')

    if not matricule_engin or not nom:
        return jsonify({'error': 'matricule_engin and nom are required'}), 400

    existing_engin = Engins.query.filter_by(matricule_engin=matricule_engin).first()
    if existing_engin:
        return jsonify({'error': 'Engin with this matricule already exists'}), 409

    new_engin = Engins(
        matricule_engin=matricule_engin,
        nom=nom,
        type_engin=type_engin,
        statut=statut
    )
    db.session.add(new_engin)
    db.session.commit()
    return jsonify({'message': 'Engin saved', 'matricule_engin': new_engin.matricule_engin}), 201

@app.route('/api/engins', methods=['GET'])
def get_engins():
    engins = Engins.query.all()
    results = []
    for e in engins:
        results.append({
            'matricule_engin': e.matricule_engin,
            'nom': e.nom,
            'type_engin': e.type_engin,
            'statut': e.statut,
            'created_at': e.created_at.isoformat() if e.created_at else None,
            'updated_at': e.updated_at.isoformat() if e.updated_at else None
        })
    return jsonify(results)

@app.route('/api/engins/<int:matricule_engin>', methods=['GET'])
def get_engin(matricule_engin):
    engin = Engins.query.get(matricule_engin)
    if not engin:
        return jsonify({'error': 'Engin not found'}), 404
    
    return jsonify({
        'matricule_engin': engin.matricule_engin,
        'nom': engin.nom,
        'type_engin': engin.type_engin,
        'statut': engin.statut,
        'created_at': engin.created_at.isoformat() if engin.created_at else None,
        'updated_at': engin.updated_at.isoformat() if engin.updated_at else None
    }), 200

@app.route('/api/engins/<int:matricule_engin>', methods=['PUT'])
def update_engin(matricule_engin):
    engin = Engins.query.get(matricule_engin)
    if not engin:
        return jsonify({'error': 'Engin not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'nom' in data:
        engin.nom = data['nom']
    if 'type_engin' in data:
        engin.type_engin = data['type_engin']
    if 'statut' in data:
        engin.statut = data['statut']
    
    try:
        db.session.commit()
        return jsonify({'message': 'Engin updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update engin'}), 500

@app.route('/api/engins/<int:matricule_engin>', methods=['DELETE'])
def delete_engin(matricule_engin):
    engin = Engins.query.get(matricule_engin)
    if not engin:
        return jsonify({'error': 'Engin not found'}), 404
    
    try:
        db.session.delete(engin)
        db.session.commit()
        return jsonify({'message': 'Engin deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete engin'}), 500

# ========================================
# ARRETS ROUTES
# ========================================

@app.route('/api/arrets', methods=['POST'])
def add_arret():
    data = request.get_json()
    description = data.get('description')
    duree = data.get('duree')
    type_arret = data.get('type_arret')

    if not description:
        return jsonify({'error': 'description is required'}), 400

    new_arret = Arrets(
        description=description,
        duree=duree,
        type_arret=type_arret
    )
    db.session.add(new_arret)
    db.session.commit()
    return jsonify({'message': 'Arret saved', 'id': new_arret.id}), 201

@app.route('/api/arrets', methods=['GET'])
def get_arrets():
    arrets = Arrets.query.all()
    results = []
    for a in arrets:
        results.append({
            'id': a.id,
            'description': a.description,
            'duree': a.duree,
            'type_arret': a.type_arret,
            'created_at': a.created_at.isoformat() if a.created_at else None,
            'updated_at': a.updated_at.isoformat() if a.updated_at else None
        })
    return jsonify(results)

@app.route('/api/arrets/<int:arret_id>', methods=['GET'])
def get_arret(arret_id):
    arret = Arrets.query.get(arret_id)
    if not arret:
        return jsonify({'error': 'Arret not found'}), 404
    
    return jsonify({
        'id': arret.id,
        'description': arret.description,
        'duree': arret.duree,
        'type_arret': arret.type_arret,
        'created_at': arret.created_at.isoformat() if arret.created_at else None,
        'updated_at': arret.updated_at.isoformat() if arret.updated_at else None
    }), 200

@app.route('/api/arrets/<int:arret_id>', methods=['PUT'])
def update_arret(arret_id):
    arret = Arrets.query.get(arret_id)
    if not arret:
        return jsonify({'error': 'Arret not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'description' in data:
        arret.description = data['description']
    if 'duree' in data:
        arret.duree = data['duree']
    if 'type_arret' in data:
        arret.type_arret = data['type_arret']
    
    try:
        db.session.commit()
        return jsonify({'message': 'Arret updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update arret'}), 500

@app.route('/api/arrets/<int:arret_id>', methods=['DELETE'])
def delete_arret(arret_id):
    arret = Arrets.query.get(arret_id)
    if not arret:
        return jsonify({'error': 'Arret not found'}), 404
    
    try:
        db.session.delete(arret)
        db.session.commit()
        return jsonify({'message': 'Arret deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete arret'}), 500

# ========================================
# OPERATION ROUTES
# ========================================

@app.route('/api/operations', methods=['POST'])
def add_operation():
    data = request.get_json()
    nom = data.get('nom')
    type_operation = data.get('type_operation')
    statut = data.get('statut', 'planifiee')
    id_navire = data.get('id_navire')
    container_ids = data.get('containers', [])
    engin_ids = data.get('engins', [])
    personnel_ids = data.get('personnels', [])

    if not nom:
        return jsonify({'error': 'nom is required'}), 400

    from datetime import datetime
    # Parse date_debut and date_fin if provided
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    dt_debut = datetime.fromisoformat(date_debut) if date_debut else None
    dt_fin = datetime.fromisoformat(date_fin) if date_fin else None

    shift_ids = data.get('shifts', [])
    new_operation = Operation(
        nom=nom,
        type_operation=type_operation,
        statut=statut,
        id_navire=id_navire,
        date_debut=dt_debut,
        date_fin=dt_fin
    )
    # Link containers
    if container_ids:
        new_operation.containers = Container.query.filter(Container.id.in_(container_ids)).all()
    # Link engins
    if engin_ids:
        new_operation.engins = Engins.query.filter(Engins.matricule_engin.in_(engin_ids)).all()
    # Link shifts
    if shift_ids:
        new_operation.shifts = Shift.query.filter(Shift.id.in_(shift_ids)).all()
    # Link personnels
    if personnel_ids:
        new_operation.personnels = Personnel.query.filter(Personnel.id.in_(personnel_ids)).all()

    db.session.add(new_operation)
    db.session.commit()
    return jsonify({'message': 'Operation saved', 'id': new_operation.id}), 201

@app.route('/api/operations', methods=['GET'])
def get_operations():
    operations = Operation.query.all()
    results = []
    for o in operations:
        results.append({
            'id': o.id,
            'nom': o.nom,
            'type_operation': o.type_operation,
            'statut': o.statut,
            'id_navire': o.id_navire,
            'date_debut': o.date_debut.isoformat() if o.date_debut else None,
            'date_fin': o.date_fin.isoformat() if o.date_fin else None,
            'created_at': o.created_at.isoformat() if o.created_at else None,
            'updated_at': o.updated_at.isoformat() if o.updated_at else None,
            'containers': [c.id for c in o.containers],
            'engins': [e.matricule_engin for e in o.engins],
            'shifts': [s.id for s in o.shifts],
            'personnels': [p.id for p in o.personnels]
        })
    return jsonify(results)


@app.route('/api/operations/<int:operation_id>', methods=['GET'])
def get_operation(operation_id):
    operation = Operation.query.get(operation_id)
    if not operation:
        return jsonify({'error': 'Operation not found'}), 404
    
    return jsonify({
        'id': operation.id,
        'nom': operation.nom,
        'type_operation': operation.type_operation,
        'statut': operation.statut,
        'id_navire': operation.id_navire,
        'date_debut': operation.date_debut.isoformat() if operation.date_debut else None,
        'date_fin': operation.date_fin.isoformat() if operation.date_fin else None,
        'created_at': operation.created_at.isoformat() if operation.created_at else None,
        'updated_at': operation.updated_at.isoformat() if operation.updated_at else None
    }), 200

@app.route('/api/operations/<int:operation_id>', methods=['PUT'])
def update_operation(operation_id):
    operation = Operation.query.get(operation_id)
    if not operation:
        return jsonify({'error': 'Operation not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    from datetime import datetime
    if 'nom' in data:
        operation.nom = data['nom']
    if 'type_operation' in data:
        operation.type_operation = data['type_operation']
    if 'statut' in data:
        operation.statut = data['statut']
    if 'id_navire' in data:
        operation.id_navire = data['id_navire']
    if 'date_debut' in data:
        operation.date_debut = datetime.fromisoformat(data['date_debut']) if data['date_debut'] else None
    if 'date_fin' in data:
        operation.date_fin = datetime.fromisoformat(data['date_fin']) if data['date_fin'] else None
    if 'containers' in data:
        operation.containers = Container.query.filter(Container.id.in_(data['containers'])).all() if data['containers'] else []
    if 'engins' in data:
        operation.engins = Engins.query.filter(Engins.matricule_engin.in_(data['engins'])).all() if data['engins'] else []
    if 'shifts' in data:
        operation.shifts = Shift.query.filter(Shift.id.in_(data['shifts'])).all() if data['shifts'] else []
    if 'personnels' in data:
        operation.personnels = Personnel.query.filter(Personnel.id.in_(data['personnels'])).all() if data['personnels'] else []
    try:
        db.session.commit()
        return jsonify({'message': 'Operation updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update operation'}), 500

@app.route('/api/operations/<int:operation_id>', methods=['DELETE'])
def delete_operation(operation_id):
    operation = Operation.query.get(operation_id)
    if not operation:
        return jsonify({'error': 'Operation not found'}), 404
    
    try:
        db.session.delete(operation)
        db.session.commit()
        return jsonify({'message': 'Operation deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete operation'}), 500

# ========================================
# MISSION ROUTES
# ========================================

@app.route('/api/missions', methods=['POST'])
def add_mission():
    data = request.get_json()
    id_personnel = data.get('id_personnel')
    id_operation = data.get('id_operation')
    role = data.get('role')

    if not id_personnel or not id_operation:
        return jsonify({'error': 'id_personnel and id_operation are required'}), 400

    new_mission = Mission(
        id_personnel=id_personnel,
        id_operation=id_operation,
        role=role
    )
    db.session.add(new_mission)
    db.session.commit()
    return jsonify({'message': 'Mission saved', 'id': new_mission.id}), 201

@app.route('/api/missions', methods=['GET'])
def get_missions():
    missions = Mission.query.all()
    results = []
    for m in missions:
        results.append({
            'id': m.id,
            'id_personnel': m.id_personnel,
            'id_operation': m.id_operation,
            'role': m.role,
            'created_at': m.created_at.isoformat() if m.created_at else None
        })
    return jsonify(results)

@app.route('/api/missions/<int:mission_id>', methods=['GET'])
def get_mission(mission_id):
    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    return jsonify({
        'id': mission.id,
        'id_personnel': mission.id_personnel,
        'id_operation': mission.id_operation,
        'role': mission.role,
        'created_at': mission.created_at.isoformat() if mission.created_at else None
    }), 200

@app.route('/api/missions/<int:mission_id>', methods=['PUT'])
def update_mission(mission_id):
    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'id_personnel' in data:
        mission.id_personnel = data['id_personnel']
    if 'id_operation' in data:
        mission.id_operation = data['id_operation']
    if 'role' in data:
        mission.role = data['role']
    
    try:
        db.session.commit()
        return jsonify({'message': 'Mission updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update mission'}), 500

@app.route('/api/missions/<int:mission_id>', methods=['DELETE'])
def delete_mission(mission_id):
    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    
    try:
        db.session.delete(mission)
        db.session.commit()
        return jsonify({'message': 'Mission deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete mission'}), 500

# ========================================
# OCCUPATION ROUTES
# ========================================

@app.route('/api/occupations', methods=['POST'])
def add_occupation():
    data = request.get_json()
    matricule_engin = data.get('matricule_engin')
    id_operation = data.get('id_operation')

    if not matricule_engin or not id_operation:
        return jsonify({'error': 'matricule_engin and id_operation are required'}), 400

    new_occupation = Occupation(
        matricule_engin=matricule_engin,
        id_operation=id_operation
    )
    db.session.add(new_occupation)
    db.session.commit()
    return jsonify({'message': 'Occupation saved', 'id': new_occupation.id}), 201

@app.route('/api/occupations', methods=['GET'])
def get_occupations():
    occupations = Occupation.query.all()
    results = []
    for o in occupations:
        results.append({
            'id': o.id,
            'matricule_engin': o.matricule_engin,
            'id_operation': o.id_operation,
            'heure_debut': o.heure_debut.isoformat() if o.heure_debut else None,
            'heure_fin': o.heure_fin.isoformat() if o.heure_fin else None,
            'created_at': o.created_at.isoformat() if o.created_at else None
        })
    return jsonify(results)

@app.route('/api/occupations/<int:occupation_id>', methods=['GET'])
def get_occupation(occupation_id):
    occupation = Occupation.query.get(occupation_id)
    if not occupation:
        return jsonify({'error': 'Occupation not found'}), 404
    
    return jsonify({
        'id': occupation.id,
        'matricule_engin': occupation.matricule_engin,
        'id_operation': occupation.id_operation,
        'heure_debut': occupation.heure_debut.isoformat() if occupation.heure_debut else None,
        'heure_fin': occupation.heure_fin.isoformat() if occupation.heure_fin else None,
        'created_at': occupation.created_at.isoformat() if occupation.created_at else None
    }), 200

@app.route('/api/occupations/<int:occupation_id>', methods=['PUT'])
def update_occupation(occupation_id):
    occupation = Occupation.query.get(occupation_id)
    if not occupation:
        return jsonify({'error': 'Occupation not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'matricule_engin' in data:
        occupation.matricule_engin = data['matricule_engin']
    if 'id_operation' in data:
        occupation.id_operation = data['id_operation']
    
    try:
        db.session.commit()
        return jsonify({'message': 'Occupation updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update occupation'}), 500

@app.route('/api/occupations/<int:occupation_id>', methods=['DELETE'])
def delete_occupation(occupation_id):
    occupation = Occupation.query.get(occupation_id)
    if not occupation:
        return jsonify({'error': 'Occupation not found'}), 404
    
    try:
        db.session.delete(occupation)
        db.session.commit()
        return jsonify({'message': 'Occupation deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete occupation'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    role = data.get('role')
    password = data.get('password')
    if not role or not password:
        return jsonify({'error': 'Role and password required'}), 400

    user = User.query.filter_by(role=role).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid role or password'}), 401

    token = generate_token(user.id, user.role)
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': user.to_dict()
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
