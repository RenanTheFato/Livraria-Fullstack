import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      console.log("Token no localStorage durante a verificação:", token); // Adicione esta linha para depuração
      if (token) {
        try {
          const response = await api.get('/user-login', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate('/unauthorized');
          }
        } catch (error) {
          setIsAuthenticated(false);
          navigate('/unauthorized');
        }
      } else {
        setIsAuthenticated(false);
        navigate('/unauthorized');
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated;
}
