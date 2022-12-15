<template>
  <NavBar />
  <v-container>
    <q-dialog v-model="dialog">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">INSERIR TÍTULO</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="InsertTitle" required :rules="rules.existencia" label="Insira um título" />
                <v-text-field v-model="InsertElaborador" required :rules="rules.existencia" label="Insira seu nome" />
              </v-col>
            </v-row>
          </v-container>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="SALVAR" v-close-popup @click="storeTitleElab" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <v-row>
      <v-col>
        <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <v-container>
              <v-row>
                <v-col>
                  <h4 style="text-align: center; margin-bottom: 2rem;">Lista de carga de motores</h4>
                  <v-form v-model="valid_form" ref="ref_form">
                    <v-row>
                      <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
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
                        <v-text-field type="number" v-model="Objeto.hp" label="HP" required :rules="rules.existencia"
                          @change="mudaValores(Objeto.hp, 2)">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="2" md="2" lg="2" xl="2">
                        <v-select v-model="Objeto.tensao" required :rules="rules.existencia" :items="choices"
                          label="Tensão"></v-select>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat label="TÍTULO/ELABORADOR" @click="dialog = true" />
            <q-btn flat v-if="!salvarItem" @click="incluirLista" label="INCLUIR" />
            <q-btn flat v-else @click="alterarItem" label="SALVAR" />
            <q-btn flat @click="cleanForm" label="LIMPAR" />
            <q-btn flat @click="impressaoPage" label="PDF" :disable="disableFileButtons()" />
            <q-btn flat @click="exportCSV" label="EXPORTA CSV" :disable="disableFileButtons()" />
            <q-btn flat to="/home" label="VOLTAR A HOME" />
            <!-- <q-btn flat @click="" label="IMPORTAR CSV" /> -->
          </q-card-actions>
          <Alert v-if="alert.status" :type="alert.type" :text="alert.text" />
        </q-card>
      </v-col>
    </v-row>

    <Lista :headers="headers" :table="table" :title="title" :pagination="true" @EmitData="EmitData" />
  </v-container>
</template>
  
<script>
// Resources
import { defineComponent } from "vue";
import store from "@/store";

// Components
import NavBar from "../components/NavBar.vue";
import Lista from "../components/Lista.vue";
import Alert from "../components/Alerts.vue";
import { parse } from 'json2csv';
// import { saveAs } from 'file-saver';   // REMOVER 

export default defineComponent({
  name: "HomeView",

  components: {
    NavBar,
    Lista,
    Alert,
  },
  computed: {
    table() {
      return store.state.lista;
    },
    title() {
      return store.state.titulo;
    },
    elaborador() {
      return store.state.elaborador;
    },
  },
  data() {
    return {
      choices: ["220", "380", "440"],
      salvarItem: false,
      dialog: false,
      valid_form: false,
      InsertTitle: null,
      InsertElaborador: null,
      alert: {
        type: null,
        text: null,
        status: false,
      },
      Objeto: {
        id: null,
        descricao: null,
        cv: null,
        kw: null,
        hp: null,
        tensao: null,
      },
      headers: [
        {
          align: 'left',
          sortable: true,
          name: "id",
          label: "#",
          field: "id",
        },
        {
          align: 'left',
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
        {
          align: "center",
          name: "tensao",
          label: "Tensão",
          field: "tensao",
        },
        {
          align: "center",
          name: "Corrente ",
          label: "Corrente",
          field: (row) => this.convertProduto(row.cv, row.tensao),
        },
      ],
      rules: {
        existencia: [(v) => v.length !== 0 || "Campo é necessário"],
      },
      listaObjetos: {
        titulo: "",
        lista: []
      }
    };
  },
  methods: {
    cleanForm() {
      this.salvarItem = false
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
    },
    incluirLista() {
      let LocalObj = {
        id: this.table.length,
        descricao: this.Objeto.descricao,
        cv: this.Objeto.cv,
        kw: this.Objeto.kw,
        hp: this.Objeto.hp,
        tensao: this.Objeto.tensao,
      }
      if (this.valid_form) {
        // this.listaObjetos.lista.push(LocalObj)
        this.alertAction("Valores inseridos", "success")
        this.storeAdd(LocalObj)
      } else {
        this.alertAction("Insira valores válidos!", "error")
      }
    },
    alertAction(text, type) {
      this.alert.text = text
      this.alert.status = true
      this.alert.type = type;

      setTimeout(() => {
        this.alert.status = false
      }, 3000);
    },
    storeAdd(valor) {
      this.$store.commit("addLista", valor)
    },
    storeTitleElab() {
      this.$store.commit("addTitle", this.InsertTitle)
      this.$store.commit("addElaborador", this.InsertElaborador)
    },
    exportCSV() {
      let csvContent = "data:text/csv;charset=utf-8," + parse(store.state.lista)
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", store.state.titulo + ".csv");
      document.body.appendChild(link);

      link.click();
    },
    disableFileButtons() {
      if (this.table.length <= 0 || this.title === null || this.elaborador === null) {
        return true
      } else {
        return false
      }
    },
    EmitData(data) {
      this.Objeto.descricao = data.descricao
      this.Objeto.cv = data.cv
      this.Objeto.id = data.id
      this.Objeto.kw = data.kw
      this.Objeto.hp = data.hp
      this.Objeto.tensao = data.tensao
      this.salvarItem = true
    },
    alterarItem() {
      this.$store.commit("changeItemList", this.Objeto)
      this.cleanForm()
    },
    impressaoPage() {
      this.$store.commit("changeImpressao", 0)
      this.$router.push('/pdf')
    },
    convertProduto(cv, tensao) {
      console.log(cv, tensao)
      if (tensao === "220") {
        return cv * 3.5
      } if (tensao === "380") {
        return cv * 2.02
      } if (tensao === "440") {
        return cv * 1.75
      }
    }
  },
  mounted() {
    if (this.title !== null || this.elaborador !== null) {
      this.InsertTitle = this.title
      this.InsertElaborador = this.elaborador
    }
  }
});
</script>
  