<template>
  <v-app-bar style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); " prominent>
    <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />-->
    <q-avatar style="margin-left: 1rem;">
      <q-img
        :src="require('../assets/tecnol.png')"
        spinner-color="white"
        style="height: 50px; max-width: 50px"
        />
      </q-avatar>
    <v-toolbar-title style="color: white; font-size: 2rem;">Mr'Tecnol</v-toolbar-title>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return { drawer: false };
  },
};
</script>

