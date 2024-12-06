import { Button, Spinner, Col, Form, InputGroup,Row} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarCategoria } from '../../../servicos/servicoCategoria';
import { alterarProduto, gravarProduto } from '../../../servicos/servicoProduto';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadProdutos(props) {
const [produto, setProduto] = useState(props.produtoSelecionado);
const [formValidado, setFormValidado] = useState(false);
const [categorias, setCategorias] = useState([]);
const [temCategorias, setTemCategorias] = useState(false);

useEffect(()=>{
   consultarCategoria().then((resultado)=>{
       if (Array.isArray(resultado)){
           setCategorias(resultado);
           setTemCategorias(true);
       }
       else{
           toast.error("Não foi possível carregar as categorias");
       }
   }).catch((erro)=>{
       setTemCategorias(false);
       toast.error("Não foi possível carregar as categorias");
   });
   
},[]); //didMount

function selecionarCategoria(evento){
   setProduto({...produto, 
                  categoria:{
                   codigo: evento.currentTarget.value

                  }});
}

   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"
       const dataValidadeFormatada = new Date(produto.dataValidade).toLocaleDateString('pt-BR');
       produto.dataValidade = dataValidadeFormatada;

       if (!props.modoEdicao) {
           // Cadastrar o produto
           gravarProduto(produto)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o produto
           alterarProduto(produto)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDeProdutos(
                           props.listaDeProdutos.map((item) => {
                               if (item.codigo !== produto.codigo) return item;
                               else return produto;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o produto selecionado
                       props.setProdutoSelecionado({
                           codigo: 0,
                           descricao: "",
                           precoCusto: 0,
                           precoVenda: 0,
                           qtdEstoque: 0,
                           urlImagem: "",
                           dataValidade: "",
                           categoria: {}
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
   setProduto({ ...produto, [elemento]: valor });
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
                   value={produto.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
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
                   value={produto.descricao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="4">
               <Form.Label>Preço de Custo:</Form.Label>
               <InputGroup hasValidation>
                   <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                   <Form.Control
                       type="text"
                       id="precoCusto"
                       name="precoCusto"
                       aria-describedby="precoCusto"
                       value={produto.precoCusto}
                       onChange={manipularMudanca}
                       required
                   />
                   <Form.Control.Feedback type="invalid">
                       Por favor, informe o preço de custo!
                   </Form.Control.Feedback>
               </InputGroup>
           </Form.Group>
           <Form.Group as={Col} md="4">
               <Form.Label>Preço de Venda:</Form.Label>
               <InputGroup hasValidation>
                   <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                   <Form.Control
                       type="text"
                       id="precoVenda"
                       name="precoVenda"
                       aria-describedby="precoVenda"
                       value={produto.precoVenda}
                       onChange={manipularMudanca}
                       required
                   />
                   <Form.Control.Feedback type="invalid">
                       Por favor, informe o preço de venda!
                   </Form.Control.Feedback>
               </InputGroup>
           </Form.Group>
           <Form.Group as={Col} md="4">
               <Form.Label>Qtd em estoque:</Form.Label>
               <InputGroup hasValidation>
                   <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                   <Form.Control
                       type="text"
                       id="qtdEstoque"
                       name="qtdEstoque"
                       aria-describedby="qtdEstoque"
                       value={produto.qtdEstoque}
                       onChange={manipularMudanca}
                       required
                   />
                   <Form.Control.Feedback type="invalid">
                       Por favor, informe a quantidade em estoque!
                   </Form.Control.Feedback>
               </InputGroup>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Url da imagem:</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="urlImagem"
                   name="urlImagem"
                   value={produto.urlImagem}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
            <Form.Group as={Col} md="4">
           <Form.Label>Válido até:</Form.Label>
           <Form.Control
               required
               type="date" 
               id="dataValidade"
               name="dataValidade"
               value={produto.dataValidade ? produto.dataValidade.split('T')[0] : ''}  
               onChange={manipularMudanca}
           />
           <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
       </Form.Group>
           <Form.Group as={Col} md={7}>
               <Form.Label>Categoria:</Form.Label>
               <Form.Select id='categoria' 
                            name='categoria'
                            onChange={selecionarCategoria}>
                   {// criar em tempo de execução as categorias existentes no banco de dados
                       categorias.map((categoria) =>{
                           return <option value={categoria.codigo}>
                                       {categoria.descricao}
                                  </option>
                       })
                   }
                   
               </Form.Select>
           </Form.Group>
           <Form.Group as={Col} md={1}>
               {
                 !temCategorias ? <Spinner className='mt-4' animation="border" variant="success" />
                 : ""
               }
           </Form.Group>
       </Row>
       <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit" disabled={!temCategorias}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
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
import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProdutos, addProduto, updateProduto } from '../../../redux/produtoSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadProdutos(props) {
    const dispatch = useDispatch();
    const { listaDeProdutos, estado } = useSelector((state) => state.produtos);

    const [produto, setProduto] = useState(
        props.produtoSelecionado || {
            codigo: '',
            descricao: '',
            precoCusto: '',
            precoVenda: '',
            qtdEstoque: '',
            urlImagem: '',
            dataValidade: '',
            categoria: {},
        }
    );

    const [formValidado, setFormValidado] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [temCategorias, setTemCategorias] = useState(false);

    useEffect(() => {
        // Simular a consulta às categorias
        dispatch(fetchProdutos()).then((resultado) => {
            if (resultado.meta.requestStatus === 'fulfilled') {
                setCategorias(resultado.payload);
                setTemCategorias(true);
            } else {
                toast.error('Não foi possível carregar as categorias.');
            }
        });
    }, [dispatch]);

    function selecionarCategoria(evento) {
        setProduto({
            ...produto,
            categoria: { codigo: evento.currentTarget.value },
        });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;

        if (form.checkValidity()) {
            const produtoFormatado = {
                ...produto,
                dataValidade: new Date(produto.dataValidade).toISOString(),
            };

            if (props.modoEdicao) {
                // Atualizar produto
                dispatch(updateProduto(produtoFormatado)).then((resultado) => {
                    if (resultado.meta.requestStatus === 'fulfilled') {
                        toast.success('Produto atualizado com sucesso!');
                        props.setExibirTabela(true);
                    } else {
                        toast.error('Erro ao atualizar produto.');
                    }
                });
            } else {
                // Adicionar produto
                dispatch(addProduto(produtoFormatado)).then((resultado) => {
                    if (resultado.meta.requestStatus === 'fulfilled') {
                        toast.success('Produto cadastrado com sucesso!');
                        props.setExibirTabela(true);
                    } else {
                        toast.error('Erro ao cadastrar produto.');
                    }
                });
            }
        } else {
            setFormValidado(true);
        }
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setProduto({ ...produto, [name]: value });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="codigo"
                        value={produto.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o código do produto!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="descricao"
                        value={produto.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a descrição do produto!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Custo</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control
                            required
                            type="number"
                            name="precoCusto"
                            value={produto.precoCusto}
                            onChange={manipularMudanca}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control
                            required
                            type="number"
                            name="precoVenda"
                            value={produto.precoVenda}
                            onChange={manipularMudanca}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Quantidade em Estoque</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="qtdEstoque"
                        value={produto.qtdEstoque}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>URL da Imagem</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="urlImagem"
                        value={produto.urlImagem}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Data de Validade</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="dataValidade"
                        value={produto.dataValidade?.split('T')[0] || ''}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="7">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select onChange={selecionarCategoria}>
                        {categorias.map((categoria) => (
                            <option key={categoria.codigo} value={categoria.codigo}>
                                {categoria.descricao}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mt-2">
                <Col md="2">
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Confirmar'}</Button>
                </Col>
                <Col md="2">
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    );
}*/
