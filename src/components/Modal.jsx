import React, { useState, useEffect } from 'react'

import Mensaje from './Mensaje'

import Cerrar from '../img/cerrar.svg'



const Modal = ({setModalIsOpen,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')


    useEffect(() => {
        if(Object.keys(gastoEditar).length !== 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [gastoEditar])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModalIsOpen(false)
        }, 500)
    }

    const handleGasto = (e) => {
        e.preventDefault()

        if(nombre.trim() === '' || categoria.trim() === '' || cantidad <= 0 || isNaN(cantidad)){
            setMensaje('Todos los campos son obligatorios')
            return
        }

        if(cantidad <= 0 || isNaN(cantidad)){
            setMensaje('La cantidad no es valida')
            return
        }



        guardarGasto({nombre,cantidad,categoria,id,fecha})
        setMensaje('')
        setNombre('')
        setCantidad('')
        setCategoria('')
        ocultarModal()
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={Cerrar} alt="" onClick={ocultarModal}/>
        </div>
        <form onSubmit={handleGasto} className={`formulario ${animarModal ? "animar": "cerrar"} `}>
                <legend>{gastoEditar.nombre ? 'EDITAR GASTO' : 'NUEVO GASTO'}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Gasto</label>
                    <input type="text" id="nombre" placeholder="Añade el tranporte de gasto" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" placeholder="Añade la cantidad de gasto" 
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select name="" id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripcion">Suscripcion</option>
                    </select>
                </div> 

                <input type="submit" value={gastoEditar.nombre ? 'Guardar Gasto' : 'Crear Gasto'} />

        </form>
    </div>
    )
  }


export default Modal
