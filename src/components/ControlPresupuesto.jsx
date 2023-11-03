import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


const ControlPresupuesto = ({presupuesto,gastos,setPresupuesto,setGastos,setIsValidPresupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad +total,0)
        setGastado(totalGastado)
        const totalDisponible = presupuesto - totalGastado
        setDisponible(totalDisponible)

        const totalPorcentaje = ((presupuesto-totalDisponible)/presupuesto)*100
        setPorcentaje(totalPorcentaje)
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US',{style:'currency',currency:'USD'})
    }

    const handleReset = () => {
        const confirmar = window.confirm('¿Estás seguro que deseas resetear la app?')
        if(!confirmar) return
        setPresupuesto(0)
        setGastos([])
        setIsValidPresupuesto(false)
        localStorage.clear()
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar 
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 50 ? 'red' : porcentaje > 25 ? 'orange' : 'green',
            textColor: porcentaje > 50 ? 'red' : porcentaje > 25 ? 'orange' : 'green',
            trailColor: 'transparent'
          })
          } 
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleReset}>Resetear App</button>
        <p>
        <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo': ''}`}>
        <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
        <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
