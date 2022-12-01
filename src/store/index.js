import { createStore } from "vuex";
import { HTTP, AUT } from "../service/axios";

export default createStore({
  state: {
    lista: [{
      descricao: "teste de motor",
      cv: 10,
      kw: 1,
      hp: 2
    }, {
      descricao: "teste de motor2",
      cv: 10,
      kw: 1,
      hp: 2
    }, {
      descricao: "teste de motor3",
      cv: 10,
      kw: 1,
      hp: 2
    }
    ],
    titulo: "Lista armazem Rafaela",
  },
  getters: {},
  mutations: {
    // mudaLista(state, dados) {
    //   state.lista = dados;
    // },
    // mudaTitulo(state, dados) {
    //   state.titulo = dados;
    // },
  },
  actions: {
    // async getLista({ commit }, data) {
    //   try {
    //     console.log(data)
    //     // commit("mudaClientes", data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async getTitulo({ commit }) {
    //   try {
    //     const { data } = await HTTP.get("/api/usuarios/", AUT);
    //     commit("mudaUsuarios", data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  modules: {},
});
