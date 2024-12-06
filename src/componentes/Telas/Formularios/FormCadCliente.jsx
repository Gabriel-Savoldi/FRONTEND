import { Button, Spinner, Col, Form, InputGroup,
    Row
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { alterarCliente, gravarCliente } from '../../../servicos/servicoCliente';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadClientes(props) {
const [cliente, setCliente] = useState(props.clienteSelecionado);
const [formValidado, setFormValidado] = useState(false);

   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"

       if (!props.modoEdicao) {
           // Cadastrar o cliente
           gravarCliente(cliente)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o cliente
           alterarCliente(cliente)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDeClientes(
                           props.listaDeClientes.map((item) => {
                               if (item.codigo !== cliente.codigo) return item;
                               else return cliente;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o cliente selecionado
                       props.setClienteSelecionado({
                           codigo: 0,
                           nome: "",
                           endereco: "",
                           telefone: "",
                           email: ""
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
   setCliente({ ...cliente, [elemento]: valor });
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
                   value={cliente.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do cliente!</Form.Control.Feedback>
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
                   value={cliente.nome}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o nome do cliente!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Endereço</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="endereco"
                   name="endereco"
                   value={cliente.endereco}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o endereço do cliente!</Form.Control.Feedback>
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
                   value={cliente.telefone}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o telefone do cliente!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Email</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="email"
                   name="email"
                   value={cliente.email}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o email do cliente!</Form.Control.Feedback>
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
       <Toaster position="top-right"/>
   </Form>
);
}



// PARTE DE REDUX
/*
import { useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { addCliente, updateCliente } from "../../../redux/clienteSlice";

export default function FormCadClientes({
  modoEdicao,
  clienteSelecionado,
  setExibirTabela,
}) {
  const dispatch = useDispatch();
  const [cliente, setCliente] = useState(clienteSelecionado);

  function manipularMudanca(evento) {
    const { name, value } = evento.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  }

  function manipularSubmissao(evento) {
    evento.preventDefault();
    if (modoEdicao) {
      dispatch(updateCliente(cliente));
    } else {
      dispatch(addCliente(cliente));
    }
    setExibirTabela(true);
  }

  return (
    <Form onSubmit={manipularSubmissao}>
      <Row>
        <Col md={6}>
            <Form.Group as={Col} md="4">
               <Form.Label>Código</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="codigo"
                   name="codigo"
                   value={cliente.codigo}
                   disabled={modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do cliente!</Form.Control.Feedback>
           </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group as={Col} md="12">
               <Form.Label>Nome</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="nome"
                   name="nome"
                   value={cliente.nome}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o nome do cliente!</Form.Control.Feedback>
           </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
            <Form.Group as={Col} md="12">
               <Form.Label>Endereço</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="endereco"
                   name="endereco"
                   value={cliente.endereco}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o endereço do cliente!</Form.Control.Feedback>
           </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group as={Col} md="12">
               <Form.Label>Telefone</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="telefone"
                   name="telefone"
                   value={cliente.telefone}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o telefone do cliente!</Form.Control.Feedback>
           </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Email</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="email"
                   name="email"
                   value={cliente.email}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o email do cliente!</Form.Control.Feedback>
           </Form.Group>
       </Row>
      <Button type="submit">{modoEdicao ? "Alterar" : "Adicionar"}</Button>{" "}
      <Button onClick={() => setExibirTabela(true)}>Cancelar</Button>
    </Form>
  );
}*/
