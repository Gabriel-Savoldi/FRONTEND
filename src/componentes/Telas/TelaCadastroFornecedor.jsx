/*import { Alert } from "react-bootstrap";
import FormCadFornecedores from "./Formularios/FormCadFornecedor";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
//import { usuarios } from "../../dados/mockFornecedores";
import { consultarFornecedor } from "../../servicos/servicoFornecedor";

export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeFornecedores, setListaDeFornecedores] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [usuarios, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        codigo:0,
        email:"",
        senha:"",
        nome:"",
        telefone:"",
        endereco:""
    });

    useEffect(()=>{
        consultarFornecedor().then((lista)=>{
            setListaDeFornecedores(lista);
        });
    },[]); //listaVazia -> didMount
   

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Fornecedor
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaFornecedores listaDeFornecedores={listaDeFornecedores}
                                        setListaDeFornecedores={setListaDeFornecedores} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setFornecedorSelecionado={setFornecedorSelecionado} /> :
                        <FormCadFornecedores listaDeFornecedores={listaDeFornecedores}
                                         setListaDeFornecedores={setListaDeFornecedores}
                                         setExibirTabela={setExibirTabela}
                                         fornecedorSelecionado={fornecedorSelecionado}
                                         setFornecedorSelecionado={setFornecedorSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}
*/




// PARTE DE REDUX

import { useState } from "react";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
import FormCadFornecedores from "./Formularios/FormCadFornecedor";
import { useSelector } from "react-redux";

export default function TelaCadastroFornecedor() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        codigo:0,
        email:"",
        senha:"",
        nome:"",
        telefone:"",
        endereco:""
  });

  const { listaDeFornecedores } = useSelector((state) => state.fornecedores);

  return (
    <>
      {exibirTabela ? (
        <TabelaFornecedores
          setExibirTabela={setExibirTabela}
          setModoEdicao={setModoEdicao}
          setFornecedorSelecionado={setFornecedorSelecionado}
        />
      ) : (
        <FormCadFornecedores
          listaDeFornecedores={listaDeFornecedores}
          setExibirTabela={setExibirTabela}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
          fornecedorSelecionado={fornecedorSelecionado}
          setFornecedorSelecionado={setFornecedorSelecionado}
        />
      )}
    </>
  );
}
