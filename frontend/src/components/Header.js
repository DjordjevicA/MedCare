import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <div>
      <header className='header'>
        <Link to='/' className='logo'>
          <FaHeartbeat className='icon' /> MedCare
        </Link>

        <nav className='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/services'>Services</Link>
          <Link to='/appointments'>Appointments</Link>
          {isLoggedIn ? (
            <Link to='/login' onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
