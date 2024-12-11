import { createContext, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:3000');
const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};
