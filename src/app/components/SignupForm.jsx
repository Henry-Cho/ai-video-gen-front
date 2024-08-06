import { useState } from 'react';
import { signUpNewUser } from '../api/auth/auth';

export default function SignupForm({handleSignInClick}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await signUpNewUser(email, password, username);

    if (error) {
      setMessage('Sign up failed: ' + error.message);
    } else {
      handleSignInClick();
      setMessage('Sign up successful! Please check your email to confirm your account.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
      <p className="text-gray-400 mb-4">
        Already have an account? <a onClick={handleSignInClick} className="text-orange-500 cursor-pointer">Login</a>
      </p>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="name">Name</label>
        <div className="flex items-center bg-gray-700 rounded">
          <span className="inline-block px-3 text-gray-400">
            <i className="fas fa-user"></i>
          </span>
          <input
            className="w-full p-2 bg-gray-700 text-white rounded-r"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="email">Email</label>
        <div className="flex items-center bg-gray-700 rounded">
          <span className="inline-block px-3 text-gray-400">
            <i className="fas fa-envelope"></i>
          </span>
          <input
            className="w-full p-2 bg-gray-700 text-white rounded-r"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="password">Password</label>
        <div className="flex items-center bg-gray-700 rounded">
          <span className="inline-block px-3 text-gray-400">
            <i className="fas fa-lock"></i>
          </span>
          <input
            className="w-full p-2 bg-gray-700 text-white rounded-r"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <button className="px-3 text-gray-400 hover:text-gray-200">Show</button> */}
        </div>
      </div>
      <button
        className="w-full py-2 text-white rounded"
        onClick={handleSignUp}
        style={{
          background: 'linear-gradient(90deg, #BF4212, #FFB193)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Sign Up
      </button>
      {message && <p className='text-white'>{message}</p>}
    </div>
  );
}
  