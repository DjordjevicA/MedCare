import React from 'react';
import {
  FaChevronRight,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className='footer'>
      <div className='box-container'>
        <div className='box'>
          <h3>quick links</h3>
          <Link to='/'>
            <FaChevronRight className='icon' /> home
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> services
          </Link>
          <Link to='/appointments'>
            <FaChevronRight className='icon' /> book appointment
          </Link>
          <Link to='/appointments'>
            <FaChevronRight className='icon' /> your appointments
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> facilities
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> about us
          </Link>
        </div>

        <div className='box'>
          <h3>our services</h3>
          <Link to='/services'>
            <FaChevronRight className='icon' /> dental care
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> cardiology
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> massage therapy
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> ambulance
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> diagnosis
          </Link>
          <Link to='/services'>
            <FaChevronRight className='icon' /> neurology
          </Link>
        </div>

        <div className='box'>
          <h3>contact us</h3>
          <Link to='/services'>
            <FaPhone className='icon' /> +381-60-123-456
          </Link>
          <Link to='/services'>
            <FaPhone className='icon' /> +381-11-123-456
          </Link>
          <Link to='/services'>
            <FaEnvelope className='icon' /> med@care.com
          </Link>
          <Link to='/services'>
            <FaEnvelope className='icon' /> office@medcare.com
          </Link>
          <Link to='/services'>
            <FaMapMarkerAlt className='icon' /> Belgrade, Serbia
          </Link>
        </div>

        <div className='box'>
          <h3>follow us</h3>
          <Link to='/'>
            <FaFacebook className='icon' /> MedCare@Facebook
          </Link>
          <Link to='/'>
            <FaTwitter className='icon' />
            MedCare@Twitter
          </Link>
          <Link to='/'>
            <FaInstagram className='icon' /> MedCare@Instagram
          </Link>
          <Link to='/'>
            <FaTiktok className='icon' /> MedCare@TikTok
          </Link>
          <Link to='/'>
            <FaLinkedin className='icon' /> MedCare@LinkedIn
          </Link>
        </div>
      </div>

      <div className='credit'>
        created by <span>&copy; ANS</span> | 2024
      </div>
    </section>
  );
};

export default Footer;
