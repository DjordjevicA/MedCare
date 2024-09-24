from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class Doctor(db.Model):
    __tablename__ = 'doctors'
    doctor_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(256), nullable=False)

    appointments = db.relationship('Appointment', backref='doctor', lazy=True, cascade='all, delete-orphan')
    # availability = db.relationship('Availability', backref='doctor', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<Doctor {self.first_name} {self.last_name}>'


class Patient(db.Model):
    __tablename__ = 'patients'
    patient_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    gender = db.Column(db.Enum('Male', 'Female', 'Other', name='gender_types'), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    appointments = db.relationship('Appointment', backref='patient', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<Patient {self.first_name} {self.last_name}>'


class Appointment(db.Model):
    __tablename__ = 'appointments'
    appointment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.doctor_id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.patient_id'), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum('Scheduled', 'Completed', 'Cancelled', name='appointment_status'), nullable=False)
    reason_for_visit = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Appointment {self.appointment_id} - Doctor {self.doctor_id} - Patient {self.patient_id}>'


# class Availability(db.Model):
#     __tablename__ = 'availability'
#     availability_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.doctor_id'), nullable=False)
#     available_date = db.Column(db.Date, nullable=False)
#     start_time = db.Column(db.Time, nullable=False)
#     end_time = db.Column(db.Time, nullable=False)

#     def __repr__(self):
#         return f'<Availability Doctor {self.doctor_id} on {self.available_date}>'
