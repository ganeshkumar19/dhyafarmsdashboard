import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext.tsx';

const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryclient}>
  <BrowserRouter>
        <App />
  </BrowserRouter>
  </QueryClientProvider>,
)
