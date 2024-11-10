import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
//import { produtos } from "../../dados/mockProdutos";
import { consultarProduto } from "../../servicos/servicoProduto";

export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeProdutos, setListaDeProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo:0,
        descricao:"",
        precoCusto:0,
        precoVenda:0,
        qtdEstoque:0,
        urlImagem:"",
        dataValidade:"",
        categoria: {}

    });

    useEffect(()=>{
        consultarProduto().then((lista)=>{
            setListaDeProdutos(lista);
        });
    },[]); //listaVazia -> didMount
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Produto
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={listaDeProdutos}
                                        setListaDeProdutos={setListaDeProdutos} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setProdutoSelecionado={setProdutoSelecionado} /> :
                        <FormCadProdutos listaDeProdutos={listaDeProdutos}
                                         setListaDeProdutos={setListaDeProdutos}
                                         setExibirTabela={setExibirTabela}
                                         produtoSelecionado={produtoSelecionado}
                                         setProdutoSelecionado={setProdutoSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}