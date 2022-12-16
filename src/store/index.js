import { createStore } from "vuex";
// import { HTTP, AUT } from "../service/axios";

export default createStore({
  state: {
    lista: [],
    material: [],
    titulo: null,
    elaborador: null,
    listaImpressao: [],
    tipoImpressao: null
  },
  getters: {},
  mutations: {
    addLista(state, dados) {
      state.lista.push(dados)
    },
    addMaterial(state, dados) {
      state.material.push(dados)
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
      state.lista[dados.id].tensao = dados.tensao
      state.lista[dados.id].corrente = dados.corrente
    },
    changeItemMaterial(state, dados) {
      state.material[dados.id].descricao = dados.descricao
      state.material[dados.id].quantidade = dados.quantidade
      state.material[dados.id].medida = dados.medida
    },
    changeImpressao(state, value) {
      if (value === 0) {
        state.listaImpressao = state.lista
        state.tipoImpressao = 0
      }
      if (value === 1) {
        state.listaImpressao = state.material
        state.tipoImpressao = 1
      }
    }
  },
  actions: {
  },
  modules: {},
});
