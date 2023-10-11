import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    // Ocultar notificacion después de 3 segundos.
    const time = setTimeout(() => {
      setShowNotification(false);
    }, 30000);

    return () => clearTimeout(time);
  }, [showNotification]);

  const notificationHandler = (args) => {
    setType(args.type);
    setMessage(args.message);
    setShowNotification(true);
  };
  const notificationHideHandler = () => {
    setShowNotification(false);
  };

  return (
    <NotificationContext.Provider
      value={{ notificationHandler, notificationHideHandler, showNotification, type, message }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;