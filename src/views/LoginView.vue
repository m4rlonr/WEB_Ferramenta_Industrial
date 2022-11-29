<template>
  <v-container style="height: 100%">
    <v-row style="height: 100%">
      <v-col class="d-flex justify-center align-center">
        <v-card elevation="2" width="30rem" max-width="70%" outlined>
          <v-card-title>Fazer login</v-card-title>

          <!-------------------->
          <!-- DADOS DE LOGIN -->
          <!-------------------->

          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="userObject.username"
                    :rules="rules.nome"
                    :counter="30"
                    label="Nome de usuário"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="userObject.password"
                    :rules="rules.senha"
                    :counter="15"
                    label="Senha"
                    :type="showPass ? 'text' : 'password'"
                    required
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <!-------------------->
          <!-- AÇÃO DE LOGIN  -->
          <!-------------------->
          <v-card-actions class="d-flex justify-center align-center">
            <v-btn fab x-large dark @click="Logar">
              Logar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Login} from "../service/Reqs"

export default {
  name: "HomeView",

  data() {
    return {
      loading: false,
      showPass: false,
      valid: false,
      userObject: {
        username: null,
        password: null
      },
      rules: {
        nome: [
          (v) => !!v || "Nome é necessário",
          (v) => (v && v.length <= 30) || "Nome não pode exceder 30 caracteres",
          (v) => (v && v.length >= 3) || "Nome com o minimo 3 caracteres",
        ],
        senha: [
        (v) => !!v || "Senha é necessária",
        (v) => v.length <= 15 || "Senha não pode exceder 15 caracteres",
        (v) => (v && v.length >= 3) || "Senha com o minimo 3 caracteres",
        ]
      },
    };
  },
  methods: {
    closeExpand() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    async Logar(){
      if(this.$refs.form.validate()){
        if(this.valid) {
          const info = await Login({ url: "/aut/token/", data: this.userObject});
          if(info.status === 200){
            this.$router.push({ name: 'home' })
          }
        }
      }
    }
  }
};
</script>
