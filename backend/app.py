
from datetime import datetime
from models import db,Doctor,Patient,Appointment
from flask_migrate import Migrate
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS
from formatters import format_appointment, format_doctor, format_patient  # Import the format function


app = Flask(__name__)

# PostgreSQL configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] ='eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNTk4ODAzOSwiaWF0IjoxNzI1OTg4MDM5fQ'



db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
cors = CORS(app)

@app.route('/api/doctors/register', methods=['POST'])
def register_doctor():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    specialty = data['specialty']
    phone_number = data['phone_number']
    email = data['email']
    password = data['password']
    
    if db.session.query(Doctor).filter_by(email=email).first():
        return jsonify({"message": "Doctor with this email already exists!"}), 400

    new_doctor = Doctor(first_name=first_name, last_name=last_name, specialty=specialty,
                        phone_number=phone_number, email=email)
    new_doctor.set_password(password)
    
    db.session.add(new_doctor)
    db.session.commit()

    return jsonify({
        "doctor": format_doctor(new_doctor),  # Use the format function
        "message": "Doctor registered successfully!"
    }), 200


@app.route('/api/doctors/login', methods=['POST'])
def login_doctor():
    data = request.get_json()
    email = data['email']
    password = data['password']

    doctor = db.session.query(Doctor).filter_by(email=email).first()
    if doctor is None or not doctor.check_password(password):
        return jsonify({"message": "Invalid email or password!"}), 401

    access_token = create_access_token(identity=doctor.email)
    return jsonify({
        "token": access_token,
        "doctor": format_doctor(doctor),  # Use the format function
        "message": "Logged in successfully!"
    }), 200

@app.route('/api/doctors', methods=['GET'])
def list_doctors():
    try:
        doctors = Doctor.query.all()
        doctors_list = [
            {
                'doctor_id': doctor.doctor_id,
                'first_name': doctor.first_name,
                'last_name': doctor.last_name,
                'specialty': doctor.specialty,
                'phone_number': doctor.phone_number,
                'email': doctor.email
            } for doctor in doctors
        ]
        return jsonify(doctors_list), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/doctors/<int:doctor_id>', methods=['DELETE'])
def delete_doctor(doctor_id):
    try:
        # Find the doctor by ID
        doctor = Doctor.query.get(doctor_id)
        if doctor is None:
            return jsonify({'message': 'Doctor not found'}), 404
        
        # Delete the doctor
        db.session.delete(doctor)
        db.session.commit()
        
        return jsonify({'message': 'Doctor deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/doctors/<int:doctor_id>', methods=['GET'])
def get_doctor_by_id(doctor_id):
    try:
        # Find the doctor by ID
        doctor = Doctor.query.get(doctor_id)
        if doctor is None:
            return jsonify({'message': 'Doctor not found'}), 404
        
               
        # Get appointments
        appointments = [
            {
                'appointment_id': appt.appointment_id,
                'patient_id': appt.patient_id,
                'appointment_date': appt.appointment_date.isoformat(),
                'status': appt.status,
                'reason_for_visit': appt.reason_for_visit
            }
            for appt in doctor.appointments
        ]
        
        # Return doctor's details including availability and appointments
        return jsonify({
            'id': doctor.doctor_id,
            'first_name': doctor.first_name,
            'last_name': doctor.last_name,
            'specialty': doctor.specialty,
            'phone_number': doctor.phone_number,
            'email': doctor.email,
            'appointments': appointments
        }), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500



@app.route('/api/patients/register', methods=['POST'])
def register_patient():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    date_of_birth = data['date_of_birth']
    phone_number = data['phone_number']
    email = data['email']
    password = data['password']
    gender = data['gender']

    if db.session.query(Patient).filter_by(email=email).first():
        return jsonify({"message": "Patient with this email already exists!"}), 400

    new_patient = Patient(
        first_name=first_name,
        last_name=last_name,
        date_of_birth=date_of_birth,
        phone_number=phone_number,
        email=email,
        gender=gender
    )
    new_patient.set_password(password)

    db.session.add(new_patient)
    db.session.commit()

    return jsonify({
        "patient": format_patient(new_patient),  # Use the format function
        "message": "Patient registered successfully!"
    }), 200

@app.route('/api/patients/login', methods=['POST'])
def login_patient():
    data = request.get_json()
    email = data['email']
    password = data['password']

    patient = db.session.query(Patient).filter_by(email=email).first()
    if patient is None or not patient.check_password(password):
        return jsonify({"message": "Invalid email or password!"}), 401

    access_token = create_access_token(identity=patient.email)
    return jsonify({
        "token": access_token,
        "patient": format_patient(patient),  # Use the format function
        "message": "Logged in successfully!"
    }), 200


@app.route('/api/patients', methods=['GET'])
def list_patients():
    try:
        patients = Patient.query.all()
        patients_list = [
            {
                'patient_id': patient.patient_id,
                'first_name': patient.first_name,
                'last_name': patient.last_name,
                'date_of_birth': patient.date_of_birth.strftime('%Y-%m-%d'),
                'phone_number': patient.phone_number,
                'email': patient.email,
                'gender': patient.gender
            } for patient in patients
        ]
        return jsonify(patients_list), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500



@app.route('/api/patients/<int:patient_id>', methods=['GET'])
def get_patient_by_id(patient_id):
    try:
        patient = Patient.query.get(patient_id)
        if patient is None:
            return jsonify({'message': 'Patient not found'}), 404
        
        # Get appointments
        appointments = [
            {
                'appointment_id': appt.appointment_id,
                'doctor_id': appt.doctor_id,
                'appointment_date': appt.appointment_date.isoformat(),
                'status': appt.status,
                'reason_for_visit': appt.reason_for_visit
            }
            for appt in patient.appointments
        ]
        
        # Return patient's details including appointments
        return jsonify({
            'patient_id': patient.patient_id,
            'first_name': patient.first_name,
            'last_name': patient.last_name,
            'date_of_birth': patient.date_of_birth.strftime('%Y-%m-%d'),
            'phone_number': patient.phone_number,
            'email': patient.email,
            'gender': patient.gender,
            'appointments': appointments
        }), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/patients/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    try:
        patient = Patient.query.get(patient_id)
        if patient is None:
            return jsonify({'message': 'Patient not found'}), 404
        
        db.session.delete(patient)
        db.session.commit()
        
        return jsonify({'message': 'Patient deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500



@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    doctor_id = data.get('doctor_id')
    patient_id = data.get('patient_id')
    appointment_date = data.get('appointment_date')  # Expecting ISO 8601 format (e.g., "2024-09-15T15:30:00")
    status = data.get('status')
    reason_for_visit = data.get('reason_for_visit')

    if not doctor_id or not patient_id or not appointment_date or not status:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        new_appointment = Appointment(
            doctor_id=doctor_id,
            patient_id=patient_id,
            appointment_date=datetime.fromisoformat(appointment_date),
            status=status,
            reason_for_visit=reason_for_visit
        )
        db.session.add(new_appointment)
        db.session.commit()
        
        return jsonify({
            'appointment':format_appointment(new_appointment)
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/appointments/<int:appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    try:
        # Find the appointment by ID
        appointment = Appointment.query.get(appointment_id)
        if appointment is None:
            return jsonify({'message': 'Appointment not found'}), 404
        
        # Delete the appointment
        db.session.delete(appointment)
        db.session.commit()
        
        return jsonify({'message': 'Appointment deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/appointments', methods=['GET'])
def list_appointments():
    try:
        appointments = Appointment.query.all()
        appointments_list = [
            {
                'appointment_id': appointment.appointment_id,
                'doctor_id': appointment.doctor_id,
                'patient_id': appointment.patient_id,
                'appointment_date': appointment.appointment_date.isoformat(),
                'status': appointment.status,
                'reason_for_visit': appointment.reason_for_visit
            } for appointment in appointments
        ]
        return jsonify(appointments_list), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/appointments/<int:appointment_id>', methods=['GET'])
def get_appointment_by_id(appointment_id):
    try:
        # Find the appointment by ID
        appointment = Appointment.query.get(appointment_id)
        if appointment is None:
            return jsonify({'message': 'Appointment not found'}), 404
        
        # Return the appointment details
        return jsonify({
            'appointment_id': appointment.appointment_id,
            'doctor_id': appointment.doctor_id,
            'patient_id': appointment.patient_id,
            'appointment_date': appointment.appointment_date.isoformat(),
            'status': appointment.status,
            'reason_for_visit': appointment.reason_for_visit
        }), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/api/appointments/<int:appointment_id>/status', methods=['PATCH']) #menjanje status, npr scheduled complited
def update_appointment_status(appointment_id):
    data = request.get_json()
    new_status = data.get('status')
    
    if not new_status:
        return jsonify({'message': 'Status is required'}), 400
    
    # Validate the new status value
    valid_statuses = ['Scheduled', 'Completed', 'Cancelled']
    if new_status not in valid_statuses:
        return jsonify({'message': 'Invalid status value'}), 400
    
    try:
        # Find the appointment by ID
        appointment = Appointment.query.get(appointment_id)
        if appointment is None:
            return jsonify({'message': 'Appointment not found'}), 404
        
        # Update the appointment status
        appointment.status = new_status
        db.session.commit()
        
        return jsonify({
            'appointment': {
                'appointment_id': appointment.appointment_id,
                'doctor_id': appointment.doctor_id,
                'patient_id': appointment.patient_id,
                'appointment_date': appointment.appointment_date.isoformat(),
                'status': appointment.status,
                'reason_for_visit': appointment.reason_for_visit
            },
            'message': 'Appointment status updated successfully!'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


if __name__ == '__main__':
    app.run()


# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()  # Create the tables in PostgreSQL
#     app.run(debug=True)