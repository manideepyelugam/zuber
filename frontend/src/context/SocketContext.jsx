import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${import.meta.env.VITE_BASE_URL}`, {
            reconnectionAttempts: 5, // Retry 5 times on disconnection
            timeout: 10000,         // 10 seconds timeout for connection
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
        });

        newSocket.on('reconnect_attempt', () => {
            console.log('Attempting to reconnect...');
        });

        // Cleanup on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
