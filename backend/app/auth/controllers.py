from flask import Blueprint, request, jsonify
from .models import User, UserSchema, db

module = Blueprint('auth', __name__, url_prefix='/auth')
user_schema = UserSchema()

@module.route('/user/', methods=['post'])
def postUser():
    data = request.get_json()
    name = data['name']
    password = data['password']
    if User.query.filter_by(name=name).first():
        return {'result' : 'User {} already exist'.format(name)}
    newUser = User(name=name, password=password)
    db.session.add(newUser)
    db.session.commit()
    return {'result' : 'Add new user with name={}'.format(name)}