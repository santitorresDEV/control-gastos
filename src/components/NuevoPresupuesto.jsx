import React, { useState } from 'react'
import Mensaje from './Mensaje';


function NuevoPresupuesto({setPresupuesto,presupuesto,setIsValidPresupuesto}) {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if(presupuesto < 1 || isNaN(presupuesto)){
            setMensaje('El presupuesto debe ser mayor a 0')
            return
        }

        setMensaje(null)
        setPresupuesto(presupuesto)
        setIsValidPresupuesto(true)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>

      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
            <label htmlFor="">Definir presupuesto</label>
            <input type="number" value={presupuesto} 
            className='nuevo-presupuesto'
             placeholder='Añade tu presupuesto'
             onChange={e => setPresupuesto(parseInt(e.target.value,10))}
             />
        </div>

        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
