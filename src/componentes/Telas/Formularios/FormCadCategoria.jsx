/*import { Button, Spinner, Col, Form, InputGroup,
    Row
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { alterarCategoria, gravarCategoria } from '../../../servicos/servicoCategoria';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadCategorias(props) {
const [categoria, setCategoria] = useState(props.categoriaSelecionado);
const [formValidado, setFormValidado] = useState(false);

   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"
       const dataValidadeFormatada = new Date(categoria.dataValidade).toLocaleDateString('pt-BR');
       categoria.dataValidade = dataValidadeFormatada;

       if (!props.modoEdicao) {
           // Cadastrar o categoria
           gravarCategoria(categoria)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o categoria
           alterarCategoria(categoria)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDeCategorias(
                           props.listaDeCategorias.map((item) => {
                               if (item.codigo !== categoria.codigo) return item;
                               else return categoria;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o categoria selecionado
                       props.setCategoriaSelecionado({
                           codigo: 0,
                           descricao: ""
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
   setCategoria({ ...categoria, [elemento]: valor });
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
                   value={categoria.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do categoria!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Descrição</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="descricao"
                   name="descricao"
                   value={categoria.descricao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do categoria!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
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
}*/


// PARTE DE REDUX

import { useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
//import { addCategoria, updateCategoria } from "../../../redux/categoriaReducer";

export default function FormCadCategorias({
  modoEdicao,
  categoriaSelecionado,
  setExibirTabela,
}) {
  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState(categoriaSelecionado);

  function manipularMudanca(evento) {
    const { name, value } = evento.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
  }

  function manipularSubmissao(evento) {
    evento.preventDefault();
    if (modoEdicao) {
      //dispatch(updateCategoria(categoria));
    } else {
      //dispatch(addCategoria(categoria));
    }
    setExibirTabela(true);
  }

  return (
    <Form onSubmit={manipularSubmissao}>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Código</Form.Label>
            <Form.Control
              name="codigo"
              value={categoria.codigo}
              onChange={manipularMudanca}
              disabled={modoEdicao}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              name="descricao"
              value={categoria.descricao}
              onChange={manipularMudanca}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit">{modoEdicao ? "Alterar" : "Adicionar"}</Button>{" "}
      <Button onClick={() => setExibirTabela(true)}>Cancelar</Button>
    </Form>
  );
}
