const password = "TeamFinSight";
const inserita = prompt("Inserisci la password:");
if (inserita !== password) {
  document.body.innerHTML = "<h1>Accesso negato</h1>";
  throw new Error("Accesso bloccato");
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
