import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [userLoaded, setUserLoaded] = useState(false); // Nueva variable de estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/auth/user');
        setIsLoggedIn(data.isLoggedIn);
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          status: data.status,
          type: data.type,
          idUser: data.idUser,
          email: data.email,
        });
        setUserLoaded(true); // Establecer userLoaded en verdadero una vez que se carguen los datos
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, userLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
