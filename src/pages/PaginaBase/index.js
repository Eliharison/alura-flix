import Cabecalho from "components/Cabecalho"
import Rodape from "components/Rodape"
import { Outlet } from "react-router-dom"


function PaginaBase() {
    
    return (
        <main>
            <Cabecalho />
            <Outlet  />
            <Rodape />
        </main>

    )

}

export default PaginaBase