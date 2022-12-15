<template>
  <v-container style="height: 100%">
    <v-row style="height: 100%">
      <v-col class="d-flex justify-center align-center">
        <v-card elevation="2" width="30rem" max-width="70%" outlined style="color: blue">
          <v-card-title>Bem vindo!</v-card-title>

          <!-------------------->
          <!-- DADOS DE LOGIN -->
          <!-------------------->

          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="InsertElaborador"
                    :rules="rules.nome"
                    :counter="30"
                    label="Digite seu nome"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="InsertTitle"
                    :rules="rules.nome"
                    :counter="30"
                    label="Título da lista"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <!-------------------->
          <!-- AÇÃO DE LOGIN  -->
          <!-------------------->
          <v-card-actions class="d-flex justify-center align-center">
            <v-btn fab x-large dark @click="storeTitleElab" to="/home">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";

export default {
  name: "HomeView",

  data() {
    return {
      loading: false,
      valid: false,
      InsertTitle: null,
      InsertElaborador: null,
      rules: {
        nome: [
          (v) => !!v || "Nome é necessário",
          (v) => (v && v.length <= 30) || "Nome não pode exceder 30 caracteres",
          (v) => (v && v.length >= 5) || "Nome com o minimo 5 caracteres",
        ],
        senha: [
        (v) => !!v || "Senha é necessária",
        (v) => v.length <= 15 || "Senha não pode exceder 15 caracteres",
        (v) => (v && v.length >= 5) || "Senha com o minimo 5 caracteres",
        ]
      },
    };
  },
  methods: {
    closeExpand() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    storeTitleElab() {
      this.$store.commit("addTitle", this.InsertTitle)
      this.$store.commit("addElaborador", this.InsertElaborador)
    },
  }
};
</script>
