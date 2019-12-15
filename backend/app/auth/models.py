from sqlalchemy import event

from ..database import db, ma

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(50))

    def __str__(self):
        return self.name

class UserSchema(ma.Schema):
    class Meta:
        model = User
        fields = ('id', 'name', 'password')