/*import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
//import { categorias } from "../../dados/mockCategorias";
import { consultarCategoria } from "../../servicos/servicoCategoria";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeCategorias, setListaDeCategorias] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState({
        codigo:0,
        descricao:""

    });

    useEffect(()=>{
        consultarCategoria().then((lista)=>{
            setListaDeCategorias(lista);
        });
    },[]); //listaVazia -> didMount
   

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias listaDeCategorias={listaDeCategorias}
                                        setListaDeCategorias={setListaDeCategorias} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setCategoriaSelecionado={setCategoriaSelecionado} /> :
                        <FormCadCategorias listaDeCategorias={listaDeCategorias}
                                         setListaDeCategorias={setListaDeCategorias}
                                         setExibirTabela={setExibirTabela}
                                         categoriaSelecionado={categoriaSelecionado}
                                         setCategoriaSelecionado={setCategoriaSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}*/



// PARTE DE REDUX

import { useState } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import { useSelector } from "react-redux";

export default function TelaCadastroCategoria() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [categoriaSelecionado, setCategoriaSelecionado] = useState({
    codigo: "",
    descricao: ""
  });

  const { listaDeCategorias } = useSelector((state) => state.categorias);

  return (
    <>
      {exibirTabela ? (
        <TabelaCategorias
          setExibirTabela={setExibirTabela}
          setModoEdicao={setModoEdicao}
          setCategoriaSelecionado={setCategoriaSelecionado}
        />
      ) : (
        <FormCadCategorias
          listaDeCategorias={listaDeCategorias}
          setExibirTabela={setExibirTabela}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
          categoriaSelecionado={categoriaSelecionado}
          setCategoriaSelecionado={setCategoriaSelecionado}
        />
      )}
    </>
  );
}
