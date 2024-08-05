"use client";

import { loginUser } from '@/app/utils/authApi';
import React, { useState } from 'react';

const LoginSection: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token); 
      setMessage('Login successful!');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='bg-red'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginSection;
