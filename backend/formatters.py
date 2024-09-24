def format_doctor(doctor):
    return {
        "doctor_id": doctor.doctor_id,
        "first_name": doctor.first_name,
        "last_name": doctor.last_name,
        "specialty": doctor.specialty,
        "phone_number": doctor.phone_number,
        "email": doctor.email
    }

def format_patient(patient):
    return {
        'patient_id': patient.patient_id,
        'first_name': patient.first_name,
        'last_name': patient.last_name,
        'date_of_birth': patient.date_of_birth.strftime('%Y-%m-%d'),
        'phone_number': patient.phone_number,
        'email': patient.email,
        'gender': patient.gender
    }

def format_appointment(appointment):
    return{
        'appointment_id': appointment.appointment_id,
        'doctor_id': appointment.doctor_id,
        'patient_id': appointment.patient_id,
        'appointment_date': appointment.appointment_date.isoformat(),
        'status': appointment.status,
        'reason_for_visit': appointment.reason_for_visit
    }
