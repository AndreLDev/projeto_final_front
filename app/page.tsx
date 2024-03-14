'use client'

import { useState, FormEvent } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Button, Input } from '@nextui-org/react';
import {useRouter} from 'next/navigation'


export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getErrorMessage = () => {
    if (!username || !password) {
      return 'Por favor, preencha todos os campos.';
    }

    if (username !== 'test@test.com' || password !== 'password') {
      return 'Credenciais inválidas. Tente novamente.';
    }

    return '';
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const errorMessage = getErrorMessage();
      setError(errorMessage);

      setLoading(false);

      if (errorMessage === '') {
        router.push('/Home'); 
      }

    }, 1500);
  };
  return (
    <main >
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Bem-vindo</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <div className="relative mt-1">
                <Input
                  type="email"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative mt-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="Senha"
                  required
                />
                <div
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer ${
                    showPassword ? 'text-blue-500' : 'text-gray-500'
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-red-500 text-xs">{error}</span>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Esqueceu a senha?
              </a>
            </div>
            
          </form>
        </div>
      </div>
    </main>
  );
}
