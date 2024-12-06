import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { alterarUsuario, gravarUsuario } from '../../../servicos/servicoUsuario';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);

   
   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
 
        if (!props.modoEdicao) {
            // Cadastrar o usuario
            gravarUsuario(usuario)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
        } else {
            // Editar o usuario
            alterarUsuario(usuario)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setListaDeUsuarios(
                            props.listaDeUsuarios.map((item) => {
                                if (item.codigo !== usuario.codigo) return item;
                                else return usuario;
                            })
                        );
 
                        // Após a alteração, resetar o estado para o modo de adição
                        props.setModoEdicao(false); // Mudar para o modo de adicionar
                        
                        // Resetar o usuario selecionado
                        props.setUsuarioSelecionado({
                            codigo: 0,
                            email: "",
                            senha: "",
                            nome: "",
                            telefone: "",
                            endereco: "",
                            privilegios: {}
                        });
 
                        // Mostrar a tabela novamente
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
        }
    } else {
        setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
 }
 
 function manipularMudanca(evento) {
    const elemento = evento.target.name;
    const valor = evento.target.value;
    setUsuario({ ...usuario, [elemento]: valor });
 }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={usuario.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o email do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={usuario.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Endereco</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={usuario.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereco do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
        <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit" >{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
           </Col>
           <Col md={{ offset: 1 }}>
               <Button onClick={() => {
                   props.setExibirTabela(true);
               }}>Voltar</Button>
           </Col>
       </Row>
        <Toaster position="top-right" />
        </Form>
    );
}





// PARTE DE REDUX
/*
import { Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsuarios,
  addUsuario,
  updateUsuario,
} from "../../../redux/usuarioSlice"; // Adapte o caminho conforme necessário.
import toast, { Toaster } from "react-hot-toast";

export default function FormCadUsuarios(props) {
  const dispatch = useDispatch();
  const { listaDeUsuarios, estado } = useSelector((state) => state.usuarios);

  const [usuario, setUsuario] = useState(props.usuarioSelecionado || {});
  const [formValidado, setFormValidado] = useState(false);
  const [privilegios, setPrivilegios] = useState([]);
  const [temPrivilegios, setTemPrivilegios] = useState(false);

  useEffect(() => {
    // Carregar privilégios do backend
    fetch("/api/privilegios") // Substitua pela rota correta.
      .then((res) => res.json())
      .then((resultado) => {
        if (Array.isArray(resultado)) {
          setPrivilegios(resultado);
          setTemPrivilegios(true);
        } else {
          toast.error("Não foi possível carregar os privilégios");
        }
      })
      .catch(() => {
        setTemPrivilegios(false);
        toast.error("Não foi possível carregar os privilégios");
      });
  }, []);

  const selecionarPrivilegio = (evento) => {
    const codigoPrivilegio = evento.target.value;
    setUsuario({
      ...usuario,
      privilegios: { codigo: codigoPrivilegio },
    });
  };

  const manipularSubmissao = (evento) => {
    evento.preventDefault();

    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        dispatch(updateUsuario(usuario))
          .unwrap()
          .then(() => {
            toast.success("Usuário atualizado com sucesso!");
            props.setExibirTabela(true);
          })
          .catch((erro) => toast.error(erro));
      } else {
        dispatch(addUsuario(usuario))
          .unwrap()
          .then(() => {
            toast.success("Usuário cadastrado com sucesso!");
            props.setExibirTabela(true);
          })
          .catch((erro) => toast.error(erro));
      }
    } else {
      setFormValidado(true);
    }
  };

  const manipularMudanca = (evento) => {
    const { name, value } = evento.target;
    setUsuario({ ...usuario, [name]: value });
  };

  return (
    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
      <Row className="mb-4">
        <Form.Group as={Col} md="4">
          <Form.Label>Código</Form.Label>
          <Form.Control
            required
            type="text"
            id="codigo"
            name="codigo"
            value={usuario.codigo || ""}
            disabled={props.modoEdicao}
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o código do usuário!
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} md="12">
          <Form.Label>Privilegio:</Form.Label>
          <Form.Select
            id="privilegios"
            name="privilegios"
            onChange={selecionarPrivilegio}
            value={usuario.privilegios?.codigo || ""}
          >
            {temPrivilegios ? (
              privilegios.map((privilegio) => (
                <option key={privilegio.codigo} value={privilegio.codigo}>
                  {privilegio.descricao}
                </option>
              ))
            ) : (
              <option>Carregando...</option>
            )}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mt-2 mb-2">
        <Col md={1}>
          <Button type="submit" disabled={estado === "pendente"}>
            {props.modoEdicao ? "Alterar" : "Confirmar"}
          </Button>
        </Col>
        <Col md={{ offset: 1 }}>
          <Button
            onClick={() => {
              props.setExibirTabela(true);
            }}
          >
            Voltar
          </Button>
        </Col>
      </Row>
      <Toaster position="top-right" />
    </Form>
  );
}*/
