import { useState,useEffect } from "react"
import Header from "./components/Header"
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from "./components/Modal"
import ListadoGastos from "./components/ListadoGastos"
 

import { generarId } from './helpers'
import Filtros from "./components/Filtros"


function App() {

  const [presupuesto, setPresupuesto] = useState(parseInt(localStorage.getItem('presupuesto')) || 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if(Object.keys(gastoEditar).length !== 0){
      setModalIsOpen(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto)
  } , [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = parseInt(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    if(filtro === ''){
      setGastosFiltrados(gastos)
    }else{
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])



  const handleNuevoGasto = () => {    
    setModalIsOpen(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoMap => {
        if(gastoMap.id === gasto.id){
          return gasto
        }else{
          return gastoMap
        }
      })
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modalIsOpen ?  'fijar': ''}>
     <Header
      gastos={gastos}
      setGastos={setGastos}
      setPresupuesto={setPresupuesto}
      presupuesto={presupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
     /> 

     {isValidPresupuesto && (
      <> 
        <main>
          <Filtros 
          filtro={filtro}
          setFiltro={setFiltro}
          />
          <ListadoGastos 
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          gastosFiltrados={gastosFiltrados}
          filtro={filtro}
          />
        </main>
        <div className="nuevo-gasto">
        <img src={IconoNuevoGasto} alt="Icono nuevo gasto" onClick={handleNuevoGasto}/>
        </div>
        </>
      )}


      {modalIsOpen && (
        <Modal 
        setModalIsOpen={setModalIsOpen}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        />
      )}

    </div>
  )
}

export default App
