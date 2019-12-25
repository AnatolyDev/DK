from flask import Blueprint, request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from .models import User, UserSchema, db
import datetime

module = Blueprint('auth', __name__, url_prefix='/auth')
user_schema = UserSchema()

@module.route('/users/', methods=['post'])
def create_user():
    data = request.get_json()
    login = data['login']
    password = data['password']
    if User.query.filter_by(login=login).first():
        return {'msg' : 'User {} already exist'.format(login)}, 500
    newUser = User(login=login, password=password)
    db.session.add(newUser)
    db.session.commit()
    return {'result' : 'Add new user with login={}'.format(login)}, 200

@module.route('/login/', methods=['post'])
def login_user():
    data = request.get_json()
    if not 'login' in data:
        return {'msg' : 'Field LOGIN not found'}, 500
    login = data['login']
    if not 'password' in data:
        return {'msg' : 'Field PASSWORD not found'}, 500
    password = data['password']
    current_user = User.query.filter_by(login=login).first()
    if not current_user:
        return {'msg' : 'User {} not fount'.format(login)}
    if current_user.password != password:
        return {'msg' : 'Password incorrect'}, 500

    expires = datetime.timedelta(minutes=2)
    access_token = create_access_token(identity = login, expires_delta=expires)
    refresh_token = create_refresh_token(identity = login)
    return {
            'id' : 1, # должен быть реальный id
            'message': login,
            'access_token': access_token,
            'refresh_token': refresh_token
            }

@module.route('/refresh/', methods=['POST'])
@jwt_refresh_token_required
def refresh_token():
    current_user = get_jwt_identity()
    ret = {
        'access_token': create_access_token(identity=current_user),
        'refresh_token' : create_refresh_token(identity = current_user)
    }
    return jsonify(ret), 200

@module.route('/users/<int:id>', methods=['get'])
#@jwt_required
def get_user(id):
    user = User.query.filter_by(id=id).first()
    if user:
        return {
            'id' : user.id,
            'login' : user.login,
            'name' : user.name,
            'surname' : user.surname
        }, 200

    return {
        'msg' : 'User id={} not found'.format(id)
    }, 404

@module.route('/users/<int:id>', methods=['put'])
# редактирование пользователя
#@jwt_required
def edit_user(id):
    data = request.get_json() or {}
    user = User.query.filter_by(id=id).first()
    if not user:
        return {
            'msg' : 'User id={} not found'.format(id)
        }, 404

    if 'login' in data and data['login'].strip():
        user.login = data['login']

    if 'name' in data and data['name'].strip():
        user.name = data['name']

    if 'surname' in data and data['surname'].strip():
        user.surname = data['surname']

    if 'password' in data and data['password'].strip():
        user.password = data['password']
    
    db.session.commit()
    return jsonify(user.to_dict()), 200