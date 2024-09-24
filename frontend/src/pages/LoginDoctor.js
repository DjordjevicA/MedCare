import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginDoctor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { loginDoctor, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (email.trim() === '' || password.trim() === '') {
        setError('All fields are required');
        return;
      }

      await loginDoctor({
        email,
        password,
      });

      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.message || 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <section className='login'>
      <h1 className='heading'>
        <span>login</span> doctor
      </h1>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className='box'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='box'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className='error'>{error}</div>}

          <input
            type='submit'
            value='login'
            className='btn'
            disabled={isLoading}
          />
        </form>
      </div>

      <div className='doctor-link'>
        <Link to='/login'>You are a not doctor? Login here</Link>
      </div>
    </section>
  );
};

export default LoginDoctor;
