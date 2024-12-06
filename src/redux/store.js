import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import categoriaReducer from "./categoriaReducer";
import fornecedorReducer from "./fornecedorReducer";
import clienteReducer from "./clienteReducer";
import usuarioReducer from "./usuarioReducer";

const store = configureStore({
    reducer:{
        'produto':produtoReducer,
        'categoria':categoriaReducer,
        'fornecedor':fornecedorReducer,
        'cliente':clienteReducer,
        'usuario':usuarioReducer
    }
});

export default store;