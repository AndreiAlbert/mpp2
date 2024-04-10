import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesProvider from './router/router'
import { PetProvider } from './contexts/PetContext'
import { useState, useEffect } from 'react'


const InternetConnectionWarning = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!isOnline) {
    return (
      <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
        You are currently offline. Some features may not be available.
      </div>
    );
  }
}


ReactDOM.createRoot(
  document.getElementById('root')!).render(
    <React.StrictMode>
      <PetProvider>
        <RoutesProvider />
        <div>
          <InternetConnectionWarning />
        </div>
      </PetProvider>
    </React.StrictMode>,
  )
