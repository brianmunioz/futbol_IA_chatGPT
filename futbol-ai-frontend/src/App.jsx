import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Typewriter from "typewriter-effect";


function App() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('Aquí se verá reflejada su respuesta');
  const [cargando, setCargando] = useState(false);
  const funcionSubmit = () => {
    setCargando(true);
    axios.post(import.meta.env.VITE_BACKEND_URL, { pregunta })
      .then((res) => {
        respuestaCallBack(res);
        setTimeout(()=>{
          setCargando(false);
        },3000);
      })
      .catch(console.log)
  }
  const respuestaCallBack = (res) => {
    setRespuesta(res.data);
  }


  return (
    <div style={{ minHeight: '100vh' }} >
      <div className="header">
        <a href="https://brianmunoz.netlify.app/" target='_blank'>Hecho por Brian Muñoz</a>
      <img src="../public/img/maquina.png" alt="Fútbol IA" width="40px" height="40px"/>
    </div>
      <div className='contenedor'>
        <div className="card">
          <h2>Todas tus dudas de fútbol seran respondidas por la inteligencia artificial</h2>
          <input type="text" onChange={(e) => setPregunta(e.target.value)} placeholder='Escriba su duda sobre futbol aquí' />
          <button onClick={() => funcionSubmit()}>
            Preguntar a la IA
          </button>
        </div>



      </div>
      <div className="card" style={{ backgroundColor: '#134962e6' }}>
        <h2>Respuesta: </h2>
        <div className="wrap">
          {
            cargando ?
            <p style={{fontWeight: 'bold',color: '#a5dd82'}}>Cargando...</p>
              : <Typewriter
                style={{ color: "white", fontWeight: 'bold' }}

                onInit={(typewriter) => {
                  typewriter
                    .typeString(respuesta)
                    .changeDelay(1)
                    .start();
                }
                } options={{
                  delay: 10,
                }}
              />

          }
        </div>

      </div>
      
    </div>
  )
}

export default App
