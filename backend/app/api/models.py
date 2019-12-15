from sqlalchemy import event

from ..database import db, ma

class Doctor(db.Model):
    __tablename__ = 'doctor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    photo = db.Column(db.String(50))
    receptions = db.relationship('Reception', backref='doctor', lazy='dynamic')

    def __str__(self):
        return self.name

class DoctorSchema(ma.Schema):
    class Meta:
        model = Doctor
        fields = ('id', 'name', 'photo')

# таблица записей на приём
class Reception(db.Model):
    __tablename__ = 'reception'
    __table_args__ = (
        db.UniqueConstraint('day', 'time', 'doctor_id', name='unique_doctor_time'),
    )

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.Date)
    time = db.Column(db.Integer)
    client = db.Column(db.String(50))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))

class ReceptionSchema(ma.Schema):
    class Meta:
        model = Reception
        fields = ('id', 'day', 'time', 'client', 'doctor_id')