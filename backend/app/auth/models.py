from sqlalchemy import event

from ..database import db, ma

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(30), unique=True)
    name = db.Column(db.String(30))
    surname = db.Column(db.String(30))
    password = db.Column(db.String(50))

    def to_dict(self):
        data = {
            'id' : self.id,
            'login' : self.login,
            'name' : self.name,
            'surname' : self.surname
        }
        return data

    def __str__(self):
        return self.name

class UserSchema(ma.Schema):
    class Meta:
        model = User
        fields = ('id', 'login', 'name', 'surname', 'password')