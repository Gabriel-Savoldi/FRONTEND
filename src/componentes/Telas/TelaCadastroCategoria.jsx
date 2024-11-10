import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
export default function TelaCadastroCategoria(props) {
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                <FormCadCategorias />
            </Pagina>
        </div>
    );
}