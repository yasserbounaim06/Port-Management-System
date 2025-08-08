import os
from dotenv import load_dotenv

load_dotenv()

# Database configuration - supports MySQL, PostgreSQL, and SQLite
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///port_management.db')

# Handle Railway's PostgreSQL URL format if needed
if DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

SQLALCHEMY_DATABASE_URI = DATABASE_URL
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Flask configuration
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
