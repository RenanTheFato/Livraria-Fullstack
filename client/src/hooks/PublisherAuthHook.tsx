import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';

export function publisherAuth() {
  const [publisherData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      const type = localStorage.getItem("userType")

      if (!token || !type) {
        navigate('/unauthorized');
        return;
      }

      if (type != 'publisher') {
        navigate('/unauthorized');
        return;
      }

      try {
        const response = await api.get('/publisher-profile', {
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

  return publisherData;
}
