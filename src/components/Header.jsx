import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"



const Header = ({setPresupuesto,presupuesto,isValidPresupuesto,setIsValidPresupuesto,gastos,setGastos}) => {
  return (
    <header>
        <h1>Control de gastos</h1>

        {isValidPresupuesto ? ( 
            <ControlPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                gastos={gastos}
                setGastos={setGastos}
                setIsValidPresupuesto={setIsValidPresupuesto}
            /> 
            ) 
        : (
            <NuevoPresupuesto

            setPresupuesto={setPresupuesto}
            presupuesto={presupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )}
    </header>
  )
}

export default Header
