import React, { useState } from 'react';

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
    
    const response = await fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Signup successful!');
      // Optionally, you can clear the form fields here
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } else {
      setMessage(`Signup failed: ${data.error}`);
    }
  };

  return (
    <div
      id="Sign"
      className="fixed inset-0 bg-black z-10 bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleCloseForm}
    >
      <div className="w-[400px]">
        <div className="bg-white text-black p-2 rounded flex flex-col my-0">
          <button className="text-black text-xl place-self-end z-50" onClick={closeform}>
            X
          </button>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">Sign Up</h1>
            <div className="pt-10">
              <form onSubmit={handleSubmit}>
                <label htmlFor="Username">Username</label>
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="my-2 bg-neutral-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Firstname">First Name</label>
                <br />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="my-2 bg-neutral-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Lastname">Last Name</label>
                <br />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="my-2 bg-neutral-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Email">Email</label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 bg-neutral-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <label htmlFor="Password">Password</label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-neutral-400 rounded w-[300px] h-[28px]"
                  required
                />
                <br />
                <div className="flex justify-center items-center pb-20">
                  <button type="submit" className="bg-black text-white text-xl px-10 mt-10 rounded">
                    Sign Up
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;