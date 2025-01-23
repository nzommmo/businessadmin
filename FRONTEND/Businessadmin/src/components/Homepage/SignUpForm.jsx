import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = ({ isopen, closeform }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!isopen) return null;

  const handleCloseForm = (e) => {
    if (e.target.id === 'Sign') closeform();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const response = await axios.post('https://businessadmin-vbwe.onrender.com/register/', {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status); // Log status code
      console.log('Response data:', response.data); // Log response data

      if (response.status === 201) {
        setMessage(response.data.message); // Correctly access the message from response data
        // Optionally, you can clear the form fields here
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error during signup:', error); // Log the full error
      if (error.response) {
        // Display specific error messages
        setMessage(`Signup failed: ${JSON.stringify(error.response.data)}`);
      } else {
        // Handle generic errors
        setMessage('Signup failed: An unexpected error occurred.');
      }
    }
  };

  return (
    <div
      id="Sign"
      className="fixed inset-0 bg-black z-10 bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleCloseForm}
    >
      <div className="w-[400px]">
        <div className="bg-black text-white p-2 rounded flex flex-col my-0">
          <button className="text-Customl text-xl place-self-end z-50" onClick={closeform}>
            X
          </button>

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl pb-4">Sign Up</h1>
            {message && <p className='text-black bg-green-400 rounded px-5 '>{message}</p>}

            <div className="pt-10">

              <form onSubmit={handleSubmit}>
                <label htmlFor="Username">Username</label>
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="my-2 text- bg-white-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Firstname">First Name</label>
                <br />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="my-2 bg-white-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Lastname">Last Name</label>
                <br />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="my-2 bg-white-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Email">Email</label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 bg-white-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Password">Password</label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <div className="flex justify-center items-center pb-20">
                  <button type="submit" className="bg-CustomGold text-white text-xl px-10 mt-10 rounded">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
