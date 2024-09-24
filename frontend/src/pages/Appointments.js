import React, { useEffect, useState } from 'react';

import AppointmentForm from '../components/AppointmentForm';
import { useAuthStore } from '../store/authStore';
import PatientAppointments from '../components/PatientAppointments';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { getPatient, getDoctor, user, isDoctor } = useAuthStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user && !isDoctor) {
          const patRes = await getPatient(user.patient_id);
          setAppointments(patRes.appointments);
        } else if (user && isDoctor) {
          const docRes = await getDoctor(user.doctor_id);
          setAppointments(docRes.appointments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [user, isDoctor, getPatient, getDoctor]);

  return (
    <>
      {appointments && <PatientAppointments appointments={appointments} />}
      {user && !isDoctor && (
        <>
          <AppointmentForm appointments={appointments} />
        </>
      )}
    </>
  );
};

export default Appointments;
