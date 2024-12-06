import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCategoria, excluirCategoria } from "../servicos/servicoCategoria";

import ESTADO from "./estados";

export const buscarCategorias = createAsyncThunk('buscarCategorias', async ()=>{
    //lista de categorias
    const resultado = await consultarCategoria();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"categorias recuperados com sucesso",
                "listaDeCategorias":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os categorias do backend.",
                "listaDeCategorias":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeCategorias":[]
        }
    }
});

export const apagarCategoria = createAsyncThunk('apagarCategoria', async (categoria)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de categorias
    console.log(categoria);
    const resultado = await excluirCategoria(categoria);
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

const categoriaReducer = createSlice({
    name:'categoria',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeCategorias:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarCategorias.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando categorias)"
        })
        .addCase(buscarCategorias.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
        })
        .addCase(buscarCategorias.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
        })
        .addCase(apagarCategoria.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarCategoria.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de categorias?
        })
        .addCase(apagarCategoria.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
    }
});
export default categoriaReducer.reducer;
