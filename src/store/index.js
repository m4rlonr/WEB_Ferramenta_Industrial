import { createStore } from "vuex";
import { HTTP, AUT } from "../service/axios";
export default createStore({
  state: {
    clientes: [],
    materiais: [],
    usuarios: [],

    // SISTEMA PRINCIPAL
    estoque: [],
    movimentos: [],
    listaMovimentos: [],

    // SISTEMA SECUNDARIO
    estoqueTos: [],
    movimentosTos: [],
    listaMovimentosTos: [],
  },
  getters: {},
  mutations: {
    mudaClientes(state, dados) {
      state.clientes = dados;
    },
    mudaUsuarios(state, dados) {
      state.usuarios = dados;
    },
    mudaMateriais(state, dados) {
      state.materiais = dados;
    },
    mudaEstoque(state, dados) {
      state.estoque = dados;
    },
    mudaMovimentos(state, dados) {
      state.movimentos = dados;
    },
    mudaListaMovimentos(state, dados) {
      state.listaMovimentos = dados;
    },
    mudaEstoqueTos(state, dados) {
      state.estoqueTos = dados;
    },
    mudaMovimentosTos(state, dados) {
      state.movimentosTos = dados;
    },
    mudaListaMovimentosTos(state, dados) {
      state.listaMovimentosTos = dados;
    },
  },
  actions: {
    async getClientes({ commit }) {
      try {
        const { data } = await HTTP.get("api/clientes/", AUT);
        commit("mudaClientes", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getUsuarios({ commit }) {
      try {
        const { data } = await HTTP.get("/api/usuarios/", AUT);
        commit("mudaUsuarios", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getMateriais({ commit }) {
      try {
        const { data } = await HTTP.get("api/produtos/", AUT);
        commit("mudaMateriais", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getEstoque({ commit }) {
      try {
        const { data } = await HTTP.get("api/estoque/", AUT);
        commit("mudaEstoque", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getMovimentos({ commit }) {
      try {
        const { data } = await HTTP.get("api/movimentos/", AUT);
        commit("mudaMovimentos", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getListaMovimentos({ commit }) {
      try {
        const { data } = await HTTP.get("/api/lista_movimentos/", AUT);
        commit("mudaListaMovimentos", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getEstoqueTos({ commit }) {
      try {
        const { data } = await HTTP.get("tos/estoque/", AUT);
        commit("mudaEstoqueTos", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getMovimentosTos({ commit }) {
      try {
        const { data } = await HTTP.get("tos/movimentos/", AUT);
        commit("mudaMovimentosTos", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getListaMovimentosTos({ commit }) {
      try {
        const { data } = await HTTP.get("/api/lista_movimentos/", AUT);
        commit("mudaListaMovimentosTos", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
