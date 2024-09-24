import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronRight,
  FaHospitalSymbol,
  FaProcedures,
  FaUserMd,
  FaUsers,
} from 'react-icons/fa';

import doctor from '../assets/home.png';

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='image'>
          <img src={doctor} alt='doctor' />
        </div>

        <div className='content'>
          <h3>stay safe, stay healthy</h3>
          <p>Get the best medical care from the comfort of your home</p>
          <Link to='/appointments' className='btn'>
            Contact Us <FaChevronRight className='btnicon' />
          </Link>
        </div>
      </section>

      <section className='icons-container'>
        <div className='icons'>
          <FaUserMd className='icon' />
          <h3>140+</h3>
          <p>doctors available</p>
        </div>
        <div className='icons'>
          <FaUsers className='icon' />
          <h3>1100+</h3>
          <p>satisfied patients</p>
        </div>
        <div className='icons'>
          <FaProcedures className='icon' />
          <h3>500+</h3>
          <p>bed facilities</p>
        </div>
        <div className='icons'>
          <FaHospitalSymbol className='icon' />
          <h3>80+</h3>
          <p>available services</p>
        </div>
      </section>
    </>
  );
};

export default Home;
