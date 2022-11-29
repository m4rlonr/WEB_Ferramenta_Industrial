<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import store from "./store";

export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    if (localStorage.token) {
      store.dispatch("getClientes");
      store.dispatch("getUsuarios");
      store.dispatch("getMateriais");
      store.dispatch("getEstoque");
      store.dispatch("getMovimentos");
      store.dispatch("getListaMovimentos");
      store.dispatch("getEstoqueTos");
      store.dispatch("getMovimentosTos");
      store.dispatch("getListaMovimentosTos");
    }
  },
};
</script>
