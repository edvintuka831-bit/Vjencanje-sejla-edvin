import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/great-vibes/latin-400.css'
import '@fontsource/great-vibes/latin-ext-400.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-ext-400.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-ext-400-italic.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-ext-600.css'
import '@fontsource/cinzel/latin-400.css'
import '@fontsource/cinzel/latin-ext-400.css'
import '@fontsource/cinzel/latin-600.css'
import '@fontsource/cinzel/latin-ext-600.css'
import '../styles.css'
import './restoran.css'
import RestoranApp from './RestoranApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RestoranApp />
  </StrictMode>,
)
