import { Alert } from "react-bootstrap";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import { consultarUsuario } from "../../servicos/servicoUsuario";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import { ContextoUsuario } from "../../App"; // Para acessar o usuário logado

export default function TelaCadastroUsuario(props) {
    const { usuario } = useContext(ContextoUsuario); // Obtem o usuário logado
    const navigate = useNavigate(); // Para redirecionar usuários não autorizados

    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        codigo: 0,
        email: "",
        senha: "",
        nome: "",
        telefone: "",
        endereco: "",
        privilegios: {}
    });
    
    useEffect(() => {
        // Verifica se o usuário logado tem nível básico
        if (usuario.privilegios.descricao === "basico") {
            alert("Acesso negado. Você não tem permissão para acessar esta página.");
            navigate("/"); // Redireciona para a página inicial ou de login
            return;
        }

        // Consulta a lista de usuários
        consultarUsuario().then((lista) => {
            setListaDeUsuarios(lista);
        });
    }, []); // O efeito é executado ao carregar o componente e quando o usuário logado muda

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                    />
                ) : (
                    <FormCadUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                )}
            </Pagina>
        </div>
    );
}






// PARTE DE REDUX
/*
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import { useSelector } from "react-redux";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import { ContextoUsuario } from "../../App"; // Para acessar o usuário logado

export default function TelaCadastroUsuario() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    codigo: 0,
    email: "",
    senha: "",
    nome: "",
    telefone: "",
    endereco: "",
    privilegios: {}
  });

  const { usuario } = useContext(ContextoUsuario); // Obtem o usuário logado
  const navigate = useNavigate(); // Para redirecionar usuários não autorizados

  // Obtém a lista de usuários diretamente do estado global
  const listaDeUsuarios = useSelector((state) => state.usuarios.listaDeUsuarios);

  // Verifica as permissões do usuário ao carregar a tela
  useEffect(() => {
    if (usuario.privilegios.descricao === "basico") {
      alert("Acesso negado. Você não tem permissão para acessar esta página.");
      navigate("/"); // Redireciona para a página inicial ou de login
    }
  }, [usuario, navigate]);

  return (
    <>
      {exibirTabela ? (
        <TabelaUsuarios
          setExibirTabela={setExibirTabela}
          setModoEdicao={setModoEdicao}
          setUsuarioSelecionado={setUsuarioSelecionado}
        />
      ) : (
        <FormCadUsuarios
          listaDeUsuarios={listaDeUsuarios || []} // Certifica-se de que será pelo menos um array vazio
          setExibirTabela={setExibirTabela}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
          usuarioSelecionado={usuarioSelecionado}
          setUsuarioSelecionado={setUsuarioSelecionado}
        />
      )}
    </>
  );
}*/
