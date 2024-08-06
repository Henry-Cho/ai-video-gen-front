import { useState } from 'react';
import { signInWithEmail } from '../api/auth/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signInWithGoogle } from '../api/auth/auth';

export default function LoginForm({handleSignUpClick, onClose}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSignIn = async () => {
    const { data, error } = await signInWithEmail(email, password);
  
    if (error) {
      setMessage('Sign in failed: ' + error.message);
    } else {
      document.cookie = `auth-token=${data.session.access_token}; path=/`;
      document.cookie = `refresh-token=${data.session.refresh_token}; path=/; HttpOnly;`;
      setUser(data.user);
      router.push("/");
      onClose();
      setMessage('Sign in successful! Welcome back.');
    }
  };
  
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
      <p className="text-gray-400 mb-4">
        Don&apos;t have an account? <a onClick={handleSignUpClick} className="text-orange-500 cursor-pointer">Sign up</a>
      </p>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="email">Email</label>
        <div className="flex items-center bg-gray-700 rounded">
          <span className="inline-block px-3 text-gray-400">
            <i className="fas fa-user"></i>
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
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center text-white">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <a href="#" className="text-orange-500">Forgot Password?</a>
      </div>
      <button
        className="w-full py-2 text-white rounded"
        onClick={handleSignIn}
        style={{
          background: 'linear-gradient(90deg, #BF4212, #FFB193)', // Orange gradient effectBF4212
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      {message && <p className='text-white m-1 mt-3'>{message}</p>}
      <div className="text-center text-white mt-4">
        {/* <p>Or login with</p> */}
        <button className='bg-blue-500 text-white p-2 m-1 mt-2 rounded-md' onClick={signInWithGoogle}>Sign in with Google</button>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-white"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-white"><i className="fab fa-google"></i></a>
          <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
}