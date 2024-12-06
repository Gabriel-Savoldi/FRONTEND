import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarFornecedor, excluirFornecedor } from "../servicos/servicoFornecedor";

import ESTADO from "./estados";

export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async ()=>{
    //lista de produtos
    const resultado = await consultarFornecedor();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Fornecedores recuperados com sucesso",
                "listaDeFornecedores":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeFornecedores":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeFornecedores":[]
        }
    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirFornecedor(produto);
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

const fornecedorReducer = createSlice({
    name:'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeFornecedores:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarFornecedores.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarFornecedores.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
          } 
        })
        .addCase(buscarFornecedores.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
        })
        .addCase(apagarFornecedor.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarFornecedor.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos?
        })
        .addCase(apagarFornecedor.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
    }
});

export default fornecedorReducer.reducer;


