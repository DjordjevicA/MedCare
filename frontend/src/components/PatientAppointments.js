import React from 'react';
import AppointmentCard from './AppointmentCard';

const PatientAppointments = ({ appointments }) => {
  return (
    <section className='appointments'>
      <h1 className='heading'>
        <span>my</span> appointments
      </h1>

      {appointments && (
        <>
          {appointments.length > 0 ? (
            <div className='row'>
              {appointments.map((apptment) => (
                <AppointmentCard
                  key={apptment.appointment_id}
                  appointment={apptment}
                />
              ))}
            </div>
          ) : (
            <div className='row-no'>
              <p>No appointments</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PatientAppointments;
