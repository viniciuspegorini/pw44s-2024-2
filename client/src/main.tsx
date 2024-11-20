import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserSignupPage } from '@/pages/UserSignupPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <UserSignupPage />
  </StrictMode>,
)
