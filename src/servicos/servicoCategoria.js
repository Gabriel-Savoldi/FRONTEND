const urlBase = 'https://backend-amber-eta-26.vercel.app/categoria';

export async function gravarCategoria(categoria){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(categoria)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarCategoria(categoria){
    const resposta = await fetch(urlBase,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(categoria)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirCategoria(categoria){
    const resposta = await fetch(urlBase + "/" + categoria.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarCategoria() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}