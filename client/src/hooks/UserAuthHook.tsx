import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';

export function userAuth() {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate('/unauthorized');
        return;
      }

      try {
        const response = await api.get('/user-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          navigate('/unauthorized');
        }
      } catch (error) {
        navigate('/unauthorized');
      }
    };

    fetchUserData();
  }, [navigate]);

  return userData;
}
