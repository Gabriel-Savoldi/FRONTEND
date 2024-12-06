/*import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const {usuario,setUsuario} = useContext(ContextoUsuario);
    
    function manipularSubmissao(evento){
        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada   = senha.current.value;

        if (usuarioDigitado === 'admin' &&
            senhaDigitada   === 'admin')
        {
            setUsuario({
                "usuario":usuarioDigitado,
                "logado":true
            })
        }
        
        evento.preventDefault();
        evento.stopPropagation();
    }
    
    
    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicEmail">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário" 
                        ref={nomeUsuario}
                        />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        ref={senha}
                         />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}*/


import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef, useState } from "react";
import { ContextoUsuario } from "../../App";
import { usuarios } from "../../dados/mockUsuarios"; // Importe a lista de usuários
import { useNavigate } from "react-router-dom"; // Para redirecionamento

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const { setUsuario } = useContext(ContextoUsuario);
    const [erro, setErro] = useState("");
    const navigate = useNavigate(); // Hook para redirecionamento

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senha.current.value;

        // Verifica se o usuário e senha existem na lista de usuários
        const usuarioEncontrado = usuarios.find(
            (u) =>
                u.nome === usuarioDigitado && // Verifica o email
                u.senha === senhaDigitada     // Verifica a senha
        );

        if (usuarioEncontrado) {
            setUsuario({
                ...usuarioEncontrado,
                logado: true, // Define como logado
            });
            setErro(""); // Limpa mensagem de erro

            // Redirecionar para outra parte do programa
            navigate("/criar-usuario", { state: { usuario: usuarioEncontrado } });
        } else {
            setErro("Usuário ou senha inválidos."); // Exibe mensagem de erro
        }
    }

    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário"
                        ref={nomeUsuario}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        ref={senha}
                    />
                </Form.Group>

                {erro && <p className="text-danger">{erro}</p>}

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}
