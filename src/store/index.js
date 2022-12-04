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
    changeItemList(state, dados) {
      state.lista[dados.id].descricao = dados.descricao
      state.lista[dados.id].cv = dados.cv
      state.lista[dados.id].kw = dados.kw
      state.lista[dados.id].hp = dados.hp

    }
  },
  actions: {
  },
  modules: {},
});
