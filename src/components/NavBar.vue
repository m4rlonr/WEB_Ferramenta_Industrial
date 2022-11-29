<template>
  <v-app-bar style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); " prominent>

    <v-toolbar-title style="color: white; font-weight: bolder;">LISTA DE CARGA DE MOTORES</v-toolbar-title>

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

