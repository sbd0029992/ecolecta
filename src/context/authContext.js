import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subscribers = new Set();

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

  const subscribe = (listener) => {
    const subscribers = new Set();
    subscribers.add(listener);

    return () => {
      subscribers.delete(listener);
    };
  };

  useEffect(() => {
    subscribers.forEach((listener) => listener());
  }, [isLoggedIn, subscribers, userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
