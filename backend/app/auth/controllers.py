from flask import Blueprint, request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from .models import User, UserSchema, db
import datetime

module = Blueprint('auth', __name__, url_prefix='/auth')
user_schema = UserSchema()

@module.route('/user/', methods=['post'])
def postUser():
    data = request.get_json()
    name = data['name']
    password = data['password']
    if User.query.filter_by(name=name).first():
        return {'msg' : 'User {} already exist'.format(name)}, 500
    newUser = User(name=name, password=password)
    db.session.add(newUser)
    db.session.commit()
    return {'result' : 'Add new user with name={}'.format(name)}, 200

@module.route('/login/', methods=['post'])
def loginUser():
    data = request.get_json()
    name = data['name']
    password = data['password']
    current_user = User.query.filter_by(name=name).first()
    if not current_user:
        return {'result' : 'User {} not fount'.format(name)}
    if current_user.password != password:
        return {'result' : 'Password incorrect'}, 500

    expires = datetime.timedelta(minutes=2)
    access_token = create_access_token(identity = name, expires_delta=expires)
    refresh_token = create_refresh_token(identity = name)
    return {
            'message': name,
            'access_token': access_token,
            'refresh_token': refresh_token
            }

@module.route('/refresh/', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    ret = {
        'access_token': create_access_token(identity=current_user),
        'refresh_token' : create_refresh_token(identity = current_user)
    }
    return jsonify(ret), 200

@module.route('/user/', methods=['get'])
@jwt_required
def getInfo():
    return {
        'result' : 20
    }