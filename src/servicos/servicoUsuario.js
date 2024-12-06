const urlBase = 'https://backend-amber-eta-26.vercel.app/usuario';

export async function gravarUsuario(usuario) {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: { 
                'Content-Type': "application/json"
            },
            body: JSON.stringify(usuario)
        });

        // Verificando se a resposta foi bem-sucedida
        if (!resposta.ok) {
            throw new Error('Erro ao gravar usuário');
        }

        const resultado = await resposta.json();
        return resultado;

    } catch (erro) {
        console.error("Erro ao gravar usuário:", erro);
        return { status: false, mensagem: erro.message };
    }
}

export async function alterarUsuario(usuario) {
    try {
        const resposta = await fetch(urlBase + "/" + usuario.codigo, {
            method: "PUT",
            headers: { 
                'Content-Type': "application/json"
            },
            body: JSON.stringify(usuario)
        });

        // Verificando se a resposta foi bem-sucedida
        if (!resposta.ok) {
            throw new Error('Erro ao alterar usuário');
        }

        const resultado = await resposta.json();
        return resultado;

    } catch (erro) {
        console.error("Erro ao alterar usuário:", erro);
        return { status: false, mensagem: erro.message };
    }
}

export async function excluirUsuario(usuario) {
    try {
        const resposta = await fetch(urlBase + "/" + usuario.codigo, {
            method: "DELETE"
        });

        // Verificando se a resposta foi bem-sucedida
        if (!resposta.ok) {
            throw new Error('Erro ao excluir usuário');
        }

        const resultado = await resposta.json();
        return resultado;

    } catch (erro) {
        console.error("Erro ao excluir usuário:", erro);
        return { status: false, mensagem: erro.message };
    }
}

export async function consultarUsuario() {
    try {
        const resposta = await fetch(urlBase, {
            method: "GET"
        });

        // Verificando se a resposta foi bem-sucedida
        if (!resposta.ok) {
            throw new Error('Erro ao consultar usuários');
        }

        const resultado = await resposta.json();
        return resultado;

    } catch (erro) {
        console.error("Erro ao consultar usuários:", erro);
        return { status: false, mensagem: erro.message };
    }
}
