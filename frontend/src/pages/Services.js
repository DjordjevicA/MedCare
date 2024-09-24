import React from 'react';
import {
  FaAmbulance,
  FaChevronRight,
  FaHeartbeat,
  FaNotesMedical,
  FaPills,
  FaProcedures,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <section className='services'>
      <h1 className='heading'>
        our <span>services</span>
      </h1>

      <div className='box-container'>
        <div className='box'>
          <FaNotesMedical className='icon' />
          <h3>Chekups</h3>
          <p>Get medical checkup at our hostipatls</p>
          <Link to='/appointments' className='btn'>
            Learn more <FaChevronRight className='btnicon' />
          </Link>
        </div>

        <div className='box'>
          <FaAmbulance className='icon' />
          <h3>ambulance</h3>
          <p>Just call us, we are available 24/7</p>
          <Link to='/appointments' className='btn'>
            Learn more <FaChevronRight className='btnicon' />
          </Link>
        </div>

        <div className='box'>
          <FaUser className='icon' />
          <h3>expert doctors</h3>
          <p>Team of super experienced doctors is at your disposal</p>
          <Link to='/appointments' className='btn'>
            Learn more <FaChevronRight className='btnicon' />
          </Link>
        </div>

        <div className='box'>
          <FaPills className='icon' />
          <h3>medication</h3>
          <p>Wide offer of prescribed medication</p>
          <Link to='/appointments' className='btn'>
            Learn more <FaChevronRight className='btnicon' />
          </Link>
        </div>

        <div className='box'>
          <FaProcedures className='icon' />
          <h3>bed facility</h3>
          <p>Many bed facilities available for you</p>
          <Link to='/appointments' className='btn'>
            Learn more <FaChevronRight className='btnicon' />
          </Link>
        </div>

        <div className='box'>
          <FaHeartbeat className='icon' />
          <h3>total care</h3>
          <p>Best services and doctors only for you</p>
          <Link to='/appointments' className='btn'>
            Learn more <FaChevronRight className='btnicon' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
