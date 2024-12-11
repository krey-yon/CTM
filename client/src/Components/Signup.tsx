import { useState } from 'react';
import API from '../api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { email, password, username });
      alert('Signup successful! You can now log in.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Signup
      </button>
    </form>
  );
};

export default Signup;
