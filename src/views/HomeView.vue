<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col style="display: flex; flex-direction: row; align-content: center; justify-content: center; align-items: center; ">
        <h2 style="text-align: center;">
          Bem vindo, escolha a ferramenta que deseja usar.
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col> 
        <q-card @click="Router(0)" class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section style="cursor: pointer;">
            <v-container>
              <v-row>
                <v-col style="display: flex; flex-direction: row; align-content: center; align-items: center; justify-content: center;">
                  <q-img
                    :src="require('../assets/motor-eletrico.png')"
                    spinner-color="white"
                    style="height: 50px; max-width: 50px"
                  />
                  <p style="margin: 0 1rem; font-size: 1.4rem;">Lista de carga de motores</p> 
                </v-col>
              </v-row>
            </v-container>
          </q-card-section>
        </q-card>
      </v-col>
      <v-col>
        <q-card @click="Router(1)" class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section style="cursor: pointer;" >
            <v-container>
              <v-row>
                <v-col style="display: flex; flex-direction: row; align-content: center; align-items: center; justify-content: center;">
                  <q-img
                    :src="require('../assets/lista-materiais.png')"
                    spinner-color="white"
                    style="height: 50px; max-width: 50px"
                  />
                 <p style="margin: 0 1rem; font-size: 1.5rem;">Lista de materiais</p> 
                </v-col>
              </v-row>
            </v-container>
          </q-card-section>
        </q-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Resources
import { defineComponent } from "vue";

// Components
import NavBar from "../components/NavBar.vue";
// import { saveAs } from 'file-saver';   // REMOVER 


export default defineComponent({
  name: "HomeView",

  components: {
    NavBar,
  },

  methods: {
    Router(value) {
      if(value === 0 ) {
        this.$router.push('/carga')
      }
      if(value === 1) {
        this.$router.push('/material')
      }
    }
  }
});
</script>