import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'

import { Buffer } from "buffer";
import process from "process";


window.Buffer = Buffer;
window.process = process;

createRoot(document.getElementById('root')).render(
  <>
    {/* <Navbar/> */}
    <App />
  </>
)
