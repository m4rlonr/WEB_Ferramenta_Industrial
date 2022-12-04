import { createStore } from "vuex";
// import { HTTP, AUT } from "../service/axios";

export default createStore({
  state: {
    lista: [],
    titulo: null,
  },
  getters: {},
  mutations: {
    addLista(state, dados) {
      state.lista.push(dados)
    },
    addTitle(state, dados) {
      state.titulo = dados;
    },
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
