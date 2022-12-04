import { createStore } from "vuex";
// import { HTTP, AUT } from "../service/axios";

export default createStore({
  state: {
    lista: [],
    titulo: null,
    elaborador: []
  },
  getters: {},
  mutations: {
    addLista(state, dados) {
      state.lista.push(dados)
    },
    addTitle(state, dados) {
      state.titulo = dados;
    },
    addElaborador(state, dados) {
      state.elaborador = dados;
    },
  },
  actions: {
  },
  modules: {},
});
