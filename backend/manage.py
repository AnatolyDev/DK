#!/usr/bin/env python
import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_jwt_extended import JWTManager

from app import create_app
from app.database import db

app = create_app()
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
manager = Manager(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
