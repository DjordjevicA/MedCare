import React, { useEffect, useState } from 'react';

import doctor from '../assets/book.png';
import { useAuthStore } from '../store/authStore';
import { useAppointmentStore } from '../store/appointmentStore';

const AppointmentForm = ({ appointments }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);

  const { user, getDoctors } = useAuthStore();
  const { createAppointment, isLoading } = useAppointmentStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!selectedDoctor || selectedDoctor === '0') {
        setError('Please select a Doctor');
        return;
      }
      if (reason.trim() === '' || !date) {
        setError('All fields are required!');
        return;
      }

      const res = await createAppointment({
        doctor_id: selectedDoctor,
        patient_id: user.patient_id,
        appointment_date: date,
        status: 'Scheduled',
        reason_for_visit: reason,
      });
      appointments.push(res.data.appointment);
      setDate('');
      setSelectedDoctor('0');
      setReason('');
    } catch (error) {
      setError(error?.response?.data?.message || 'Something went wrong');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const docRes = await getDoctors();
        setDoctors(docRes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
  }, [getDoctors]);

  return (
    <section className='book'>
      <h1 className='heading'>
        <span>book</span> now
      </h1>

      <div className='row'>
        <div className='image'>
          <img src={doctor} alt='doctor' />
        </div>

        <form onSubmit={handleSubmit}>
          <h3>book appointment</h3>
          <select
            className='box'
            onChange={(e) => {
              if (e.target.value === '0') {
                setSelectedDoctor(null);
              } else {
                setSelectedDoctor(e.target.value);
              }
            }}
          >
            <option value={0}>Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                Dr. {doctor.first_name} {doctor.last_name} - {doctor.specialty}
              </option>
            ))}
          </select>
          <input
            type='text'
            className='box'
            placeholder='Reason for visit'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <input
            type='date'
            className='box'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {error && <div className='error'>{error}</div>}

          <input
            type='submit'
            value='book now'
            className='btn'
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default AppointmentForm;
