 "use client"
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const isAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  
    }
  }, []);

  return isAuthenticated;
};

interface DecodedToken {
  id: string;
  role: 'admin' | 'customer';
  iat: number;
  exp: number;
}
const getRole = () => {
  const [role, setRole] = useState<'admin' | 'customer' | ''>('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log(decodedToken)
        setRole(decodedToken.role);

      } catch (error) {
        console.error('Failed to decode token', error);
        setRole('');
      }
    }
  }, []);

  return role;
};

const useAuth = {
  isAuth,
  getRole
}


export default useAuth;
