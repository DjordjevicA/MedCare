import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { registerPatient, loginPatient, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      // Login
      try {
        if (email.trim() === '' || password.trim() === '') {
          setError('All fields are required');
          return;
        }

        await loginPatient({
          email,
          password,
        });

        navigate('/');
      } catch (error) {
        setError(error?.response?.data?.message || 'Something went wrong');
        console.error(error);
      }
    } else {
      // Register
      try {
        if (
          firstName.trim() === '' ||
          lastName.trim() === '' ||
          email.trim() === '' ||
          !dateOfBirth ||
          phoneNumber.trim() === '' ||
          gender.trim() === '' ||
          password.trim() === ''
        ) {
          setError('All fields are required');
          return;
        }

        if (gender.toLowerCase() === 'male') {
          setGender('Male');
        } else if (gender.toLowerCase() === 'female') {
          setGender('Female');
        } else {
          setGender('Male');
        }

        await registerPatient({
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          phone_number: phoneNumber,
          email,
          password,
          gender,
        });

        navigate('/');
      } catch (error) {
        setError(error?.response?.data?.message || 'Something went wrong');
        console.error(error);
      }
    }
  };

  return (
    <section className='login'>
      <h1 className='heading'>
        <span>{isLogin ? 'login' : 'register'}</span> now
      </h1>

      <div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type='text'
                className='box'
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type='text'
                className='box'
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
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
          {!isLogin && (
            <>
              <input
                type='date'
                className='box'
                placeholder='Date of birth'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <input
                type='text'
                className='box'
                placeholder='Phone number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type='text'
                className='box'
                placeholder='Gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </>
          )}

          {error && <div className='error'>{error}</div>}

          <input
            type='submit'
            value={isLogin ? 'login' : 'register'}
            className='btn'
            disabled={isLoading}
          />
          <br />
          <span className='change' onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Register here"
              : 'Already have an account? Login here'}
          </span>
        </form>
      </div>

      <div className='doctor-link'>
        <Link to='/login-doctor'>You are a doctor? Login here</Link>
      </div>
    </section>
  );
};

export default Login;
