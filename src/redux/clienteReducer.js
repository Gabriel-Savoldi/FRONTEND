import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCliente, excluirCliente } from "../servicos/servicoCliente";

import ESTADO from "./estados";

export const buscarClientes = createAsyncThunk('buscarClientes', async ()=>{
    //lista de produtos
    const resultado = await consultarCliente();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Clientes recuperados com sucesso",
                "listaDeClientes":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeClientes":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeClientes":[]
        }
    }
});

export const apagarCliente = createAsyncThunk('apagarCliente', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirCliente(produto);
    //se for um array/lista a consulta funcionou
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

const clienteReducer = createSlice({
    name:'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeClientes:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarClientes.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarClientes.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
          } 
        })
        .addCase(buscarClientes.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
        })
        .addCase(apagarCliente.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarCliente.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos?
        })
        .addCase(apagarCliente.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
    }
});

export default clienteReducer.reducer;
