import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';
import { useAppointmentStore } from '../store/appointmentStore';

const AppointmentCard = ({ appointment }) => {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const { getDoctor, getPatient, isDoctor, isLoading } = useAuthStore();
  const { updateStatus, isLoading: apptLoading } = useAppointmentStore();
  const navigate = useNavigate();

  const updateAppointment = async (status) => {
    try {
      await updateStatus(appointment.appointment_id, {
        status: status,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDoctorAndPatient = async () => {
      try {
        if (isDoctor) {
          const patRes = await getPatient(appointment.patient_id);
          setPatient(patRes);
        } else {
          const docRes = await getDoctor(appointment.doctor_id);
          setDoctor(docRes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctorAndPatient();
  }, [appointment, isDoctor, getPatient, getDoctor]);

  return (
    <div className='card'>
      <div className='card-heading'>
        <p># {appointment.appointment_id}</p>
        <span>{appointment.reason_for_visit}</span>
      </div>
      <div className='card-content'>
        <span>
          {isDoctor
            ? patient?.first_name + ' ' + patient?.last_name
            : doctor?.first_name +
              ' ' +
              doctor?.last_name +
              ' (' +
              doctor?.specialty +
              ')'}
        </span>
        <span>
          {new Date(appointment.appointment_date).toLocaleDateString()}
        </span>
      </div>
      <div className='card-actions'>
        {appointment.status === 'Scheduled' ? (
          <>
            <button
              type='button'
              className='btn-cancel'
              onClick={() => {
                updateAppointment('Cancelled');
              }}
              disabled={
                isLoading ||
                apptLoading ||
                new Date(appointment.appointment_date) < new Date()
              }
            >
              cancel
            </button>
            {isDoctor && (
              <button
                type='button'
                className='btn-complete'
                onClick={() => {
                  updateAppointment('Completed');
                }}
                disabled={
                  isLoading ||
                  apptLoading ||
                  new Date(appointment.appointment_date) > new Date()
                }
              >
                mark as complete
              </button>
            )}
          </>
        ) : appointment.status === 'Completed' ? (
          <p className='complete'>Completed</p>
        ) : (
          <p className='cancel'>Cancelled</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
