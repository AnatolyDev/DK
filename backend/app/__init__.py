import os
from flask import Flask
from flask_cors import CORS

from .database import db

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(os.environ['APP_SETTINGS'])

    db.init_app(app)
    with app.test_request_context():
        db.create_all()

    if app.debug == True:
        try:
            from flask_debugtoolbar import DebugToolbarExtension
            toolbar = DebugToolbarExtension(app)
        except:
            pass

    #import app.entity.controllers as entity
    #import app.comment.controllers as comment
    import app.general.controllers as general
    #import app.api.controllers as api
    import app.auth.controllers as auth

    app.register_blueprint(general.module)
    #app.register_blueprint(api.module)
    app.register_blueprint(auth.module)
    #app.register_blueprint(entity.module)
    #app.register_blueprint(comment.module)

    return app
