import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`
        );
        const data = await response.json();

        setIsLoggedIn(data.isLoggedIn);
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          status: data.status,
          type: data.type,
          idUser: data.idUser,
          email: data.email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
