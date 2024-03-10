import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesProvider from './router/router'
import { PetProvider } from './contexts/PetContext'

ReactDOM.createRoot(
  document.getElementById('root')!).render(
    <React.StrictMode>
      <PetProvider>
        <RoutesProvider />
      </PetProvider>
    </React.StrictMode>,
  )
