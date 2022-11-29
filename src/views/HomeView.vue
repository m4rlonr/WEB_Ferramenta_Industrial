<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col>
        <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <v-container>
              <v-row>
                <v-col>
                  <v-form v-model="valid_form" ref="ref_form">
                    <v-row>
                      <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                        <v-text-field v-model="Objeto.descricao" required :rules="rules.existencia" label="Descrição">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">
                        <v-text-field type="number" required :rules="rules.existencia"
                          @change="mudaValores(Objeto.cv, 0)" v-model="Objeto.cv" label="CV">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">
                        <v-text-field type="number" :rules="rules.existencia" required v-model="Objeto.kw" label="kW"
                          @change="mudaValores(Objeto.kw, 1)">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">
                        <v-text-field type="number" v-model="Objeto.hp" label="HP" :rules="rules.existencia"
                          @change="mudaValores(Objeto.hp, 2)">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat @click="">
              INCLUIR
            </q-btn>
            <q-btn flat @click="cleanForm"> LIMPAR </q-btn>
          </q-card-actions>
          <Alert v-if="alert.status" :type="alert.type" :text="alert.text" />
        </q-card>
      </v-col>
    </v-row>

    <Lista :headers="headers" :table="table" title="ITENS" />
  </v-container>
</template>

<script>
// Resources
import { defineComponent } from "vue";
import store from "@/store";
import { PutData, CreateData } from "../service/Reqs";

// Components
import NavBar from "../components/NavBar.vue";
import Lista from "../components/Lista.vue";
import Alert from "../components/Alerts.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    NavBar,
    Lista,
    Alert,
  },
  computed: {
    table() {
      return store.state.estoque;
    },

  },
  data() {
    return {
      valid_form: false,
      alert: {
        type: null,
        text: null,
        status: false,
      },
      Objeto: {
        descricao: "",
        cv: 0,
        kw: 0,
        hp: 0,
      },
      headers: [
        {
          align: "center",
          sortable: true,
          name: "descricao",
          label: "Descrição",
          field: "descricao",
        },
        {
          align: "center",
          name: "cv",
          label: "CV",
          // field: (row) => this.convertProduto(row.produto),
          field: "cv",
        },
        {
          align: "center",
          name: "cv",
          label: "kW",
          field: "kw",
        },
        {
          align: "center",
          name: "cv",
          label: "HP",
          field: "hp",
        },

      ],
      rules: {
        existencia: [(v) => v !== null || "Nome é necessário"],
        textoLongo: [
          (v) => !!v || "Campo é necessário",
          (v) => v.length <= 200 || "Nome não pode exceder 200 caracteres",
        ],
        textoCurto: [
          (v) => !!v || "Campo é necessário",
          (v) => v.length <= 30 || "Nome não pode exceder 30 caracteres",
        ],
      },
    };
  },
  methods: {
    cleanForm() {
      this.$refs.ref_form.reset();
      this.$refs.ref_form.resetValidation();
    },
    mudaValores(valor, medida) {
      if (medida === 0) {           // CV
        this.Objeto.kw = (valor * 0.735499).toFixed(2)
        this.Objeto.hp = (valor * 0.98632).toFixed(2)
      }
      if (medida === 1) {           // kW
        this.Objeto.cv = (valor / 0.735499).toFixed(2)
        this.Objeto.hp = (valor * 1.34102).toFixed(2)
      }
      if ((medida === 2)) {         //HP
        this.Objeto.cv = (valor / 0.98632).toFixed(2)
        this.Objeto.kw = (valor / 1.34102).toFixed(2)
      }
    }
  },
});
</script>
