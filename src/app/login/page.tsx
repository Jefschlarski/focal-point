"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('username', name);
      router.push('/todo');
    }
  };

  return (
    <div className="login-container card-container">
      <div className="login card-content">
        <h1>Login</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button title='Entrar' className='blue-gradient-button' onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;
