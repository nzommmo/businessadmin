import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpForm from './SignUpForm';

const LoginForm = ({ isvisible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  if (!isvisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        // Display specific error messages
        setMessage(`Login failed: ${JSON.stringify(error.response.data)}`);
      } else {
        // Handle generic errors
        setMessage('Login failed: An unexpected error occurred.');
      }
    }
  };

  return (
    <Fragment>
      <div id="wrapper" className='fixed inset-0 bg-black z-10 bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClose}>
        <div className='w-[400px] '>
          <div className='bg-white text-black p-2 rounded flex flex-col my-0 pt-'>

            <button className='text-black text-xl place-self-end z-50' onClick={onClose}>
              X
            </button>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-2xl'>Login To Your Account</h1>
              {message && <p className='text-red-500'>{message}</p>}
              <div className='pt-10'>
                <form onSubmit={handleLogin}>
                  <label htmlFor="Username">Username</label> <br />
                  <input
                    type="text"
                    className='my-2 bg-neutral-400 rounded w-[300px] h-[28px]'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  /> <br />
                  <label htmlFor="Password">Password</label> <br />
                  <input
                    type="password"
                    name="password"
                    className='bg-neutral-400 rounded w-[300px] h-[28px]'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  /> <br />
                  <div className='flex justify-center items-center pb-20'>
                    <button className='bg-black text-white text-xl px-10 mt-10 rounded' type='submit'>Login</button>
                  </div>
                  <div className='flex justify-center items-center pb-20'>
                    <button type='button' className='bg-black text-white text-xl px-10 mt-10 rounded' onClick={() => setShowForm(true)}>Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SignUpForm isopen={showForm} closeform={() => setShowForm(false)} />
    </Fragment>
  );
};

export default LoginForm;
