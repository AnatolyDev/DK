from flask import Blueprint, request, jsonify
from .models import Doctor, DoctorSchema, Reception, ReceptionSchema, db

module = Blueprint('api', __name__, url_prefix='/api')
doctor_schema = DoctorSchema()
reception_schema = ReceptionSchema()

@module.route('/doctors/', methods=['GET'])
def getDoctors():
    doctors = Doctor.query.all()
    docs_list = []
    for doc in doctors:
        docs_list.append(doctor_schema.dump(doc))
    return {'doctors' : docs_list}

@module.route('/adddoctor/', methods=['POST'])
def addDoctor():
    data = request.get_json()
    name = data['name']
    photo = data['photo']
    newDoctor = Doctor(name=name, photo=photo)
    db.session.add(newDoctor)
    db.session.commit()
    return {'result' : 'Add doctor with id={}'.format(newDoctor.id)}

@module.route('/deldoctor/', methods=['DELETE'])
def deleteDoctor():
    data = request.get_json()
    id = data['id']
    doctor = Doctor.query.filter_by(id=id).first()
    db.session.delete(doctor)
    db.session.commit()
    return {'result' : 'Doctor {0} was deleted'.format(doctor.name)}

# запись ко врачу
# добавить запись
@module.route('/reception/add/', methods=['POST'])
def addPriem():
    data = request.get_json()
    day = data['day']
    time = data['time']
    client = data['client']
    doctor_id = data['doctor_id']
    if not day or not time or not doctor_id:
        return {'result' : 'Not enough options'}
    doctor = Doctor.query.filter_by(id=doctor_id).first()
    if not doctor:
        return {'result' : 'No doctor with id={}'.format(doctor_id)}
    else:
        try:
            newReception = Reception(day=day, time=time, client=client, doctor=doctor)
            db.session.add(newReception)
            db.session.commit()
            return {'result' : 'Added a new entry to the doctor %s with id=%d' % (doctor.name, newReception.id)}
        except:
            return {'result' : 'Error adding seans'}

# вывести записи к заданному врачу за день
@module.route('/reception/', methods=['POST'])
def getPriem():
    data = request.get_json()
    doctor_id = data['doctor_id']
    day = data['day']
    if not doctor_id:
        return {'result' : 'No doctor'}
    if not day:
        return {'result' : 'No day'}
    
    receptions = Reception.query.filter_by(doctor_id=doctor_id, day=day).order_by(Reception.time.asc()).all()
    receptions_list = []
    for rec in receptions:
        receptions_list.append(reception_schema.dump(rec))
    return {'receptions' : receptions_list}