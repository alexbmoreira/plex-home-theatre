import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SCHEDULER_API_ENABLED = True
    
    # Add any other config variables you need
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
