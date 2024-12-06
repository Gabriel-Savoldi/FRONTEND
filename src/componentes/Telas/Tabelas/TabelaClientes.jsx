import { Button, Container, Table } from "react-bootstrap";
import { excluirCliente } from "../../../servicos/servicoCliente";

export default function TabelaClientes(props) {

    function editarCliente(cliente){
        props.setModoEdicao(true);
        props.setClienteSelecionado(cliente)
        props.setExibirTabela(false);
    }

    function excluirClienteFrontEnd(cliente) {
        if (cliente && cliente.codigo) {
            console.log("Excluindo cliente com código:", cliente.codigo); // Adicionando log
            if (window.confirm("Deseja realmente excluir o cliente " + cliente.nome)) {
                excluirCliente(cliente).then((resposta) => {
                    if (resposta.status) {
                        props.setListaDeClientes(props.listaDeClientes.filter(
                            (item) => item.codigo !== cliente.codigo
                        ));
                    } else {
                        window.alert("Não foi possível excluir o cliente: " + resposta.mensagem);
                    }
                }).catch((erro) => {
                    window.alert("Erro ao excluir cliente: " + erro.message);
                });
            }
        } else {
            window.alert("Cliente ou código inválido.");
        }
    }
    
    
    

    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary"
                    onClick={() => {
                        props.setExibirTabela(false);
                    }}>
                    Adicionar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeClientes?.map((cliente) => {
                                return (
                                    <tr>
                                        <td>{cliente.codigo}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.email}</td>
                                        <td>
                                            <Button onClick={()=>{
                                                editarCliente(cliente);
                                            }}variant="warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                            </Button> <Button onClick={ ()=> {
                                                excluirClienteFrontEnd(cliente);
                                            }} variant="danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>           
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <p>Quatidade de clientes cadastrados: {props.listaDeClientes.length}</p>
            </Container>
        </>
    );
}



// PARTE DE REDUX
/*
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import ESTADO from "../../../redux/estados"; // Ajuste o caminho se necessário
import { useEffect } from "react";
import { fetchClientes, deleteCliente } from "../../../redux/clienteSlice";

export default function TabelaClientes({ setExibirTabela, setModoEdicao, setClienteSelecionado }) {
  const dispatch = useDispatch();
  const { listaDeClientes, estado, mensagem } = useSelector((state) => state.clientes);

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  function editarCliente(cliente) {
    setModoEdicao(true);
    setClienteSelecionado(cliente);
    setExibirTabela(false);
  }

  function excluirClienteHandler(cliente) {
    if (window.confirm(`Deseja realmente excluir o privilégio ${cliente.descricao}?`)) {
      dispatch(deleteCliente(cliente));
    }
  }

  if (estado === ESTADO.PENDENTE) {
    return <p>Carregando clientes...</p>;
  }

  if (estado === ESTADO.ERRO) {
    return <p>Erro: {mensagem}</p>;
  }

  return (
    <Container>
      <Button className="mb-3" onClick={() => setExibirTabela(false)}>
        Adicionar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeClientes.map((cliente) => (
            <tr key={cliente.codigo}>
                <td>{cliente.codigo}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
              <td>

              <Button onClick={()=>{
                    editarCliente(cliente);
                }}variant="warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </Button> <Button onClick={ ()=> {
                    excluirClienteHandler(cliente);
                }} variant="danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>           
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Quantidade de clientes cadastrados: {listaDeClientes.length}</p>
    </Container>
  );
}*/





