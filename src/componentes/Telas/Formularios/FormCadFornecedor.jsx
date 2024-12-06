
// PARTE DE REDUX

import { useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { addFornecedor, updateFornecedor } from "../../../redux/fornecedorReducer"

export default function FormCadFornecedores({
  modoEdicao,
  fornecedorSelecionado,
  setExibirTabela,
}) {
  const dispatch = useDispatch();
  const [fornecedor, setFornecedor] = useState(fornecedorSelecionado);

  function manipularMudanca(evento) {
    const { name, value } = evento.target;
    setFornecedor((prev) => ({ ...prev, [name]: value }));
  }

  function manipularSubmissao(evento) {
    evento.preventDefault();
    if (modoEdicao) {
      //dispatch(updateFornecedor(fornecedor));
    } else {
      //dispatch(addFornecedor(fornecedor));
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
                   value={fornecedor.codigo}
                   disabled={modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do fornecedor!</Form.Control.Feedback>
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
                   value={fornecedor.nome}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o nome do fornecedor!</Form.Control.Feedback>
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
                   value={fornecedor.endereco}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o endereço do fornecedor!</Form.Control.Feedback>
           </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group as={Col} md="12">
               <Form.Label>Contato</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="contato"
                   name="contato"
                   value={fornecedor.contato}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o contato do fornecedor!</Form.Control.Feedback>
           </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col} md="12">
               <Form.Label>CPF</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="cpf"
                   name="cpf"
                   value={fornecedor.cpf}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o cpf do fornecedor!</Form.Control.Feedback>
           </Form.Group>
       </Row>
      <Button type="submit">{modoEdicao ? "Alterar" : "Adicionar"}</Button>{" "}
      <Button onClick={() => setExibirTabela(true)}>Cancelar</Button>
    </Form>
  );
}
