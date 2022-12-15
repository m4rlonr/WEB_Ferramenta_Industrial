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
                    <h4 style="text-align: center; margin-bottom: 2rem;">Lista de materiais</h4>
                    <v-form v-model="valid_form" ref="ref_form">
                      <v-row>
                        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field v-model="Objeto.descricao" required :rules="rules.existencia" label="Descrição">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                          <v-text-field type="number" required :rules="rules.existencia" v-model="Objeto.quantidade" label="Quantidade">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                          <v-text-field :rules="rules.existencia" required v-model="Objeto.medida" label="Unidade de medida" >
                          </v-text-field>
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
        return store.state.material;
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
          quantidade: null,
          medida: null,
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
            name: "quantidade",
            label: "Quantidade",
            field: "quantidade",
          },
          {
            align: "center",
            name: "medida",
            label: "Unidade de medida",
            field: "medida",
          },
  
        ],
        rules: {
          existencia: [(v) => v.length !== 0 || "Campo é necessário"],
        },
        choices: [
        'Metro', 'Centimetro', 'Unidade', 'Litro', 'Mililitro'
      ]
      };
    },
    methods: {
      cleanForm() {
        this.salvarItem = false
        this.$refs.ref_form.reset();
        this.$refs.ref_form.resetValidation();
      },
      incluirLista() {
        let LocalObj = {
          id: this.table.length,
          descricao: this.Objeto.descricao,
          quantidade: this.Objeto.quantidade,
          medida: this.Objeto.medida,
        }
        if (this.valid_form) {
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
        this.$store.commit("addMaterial", valor)
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
        this.Objeto.quantidade = data.quantidade
        this.Objeto.id = data.id
        this.Objeto.medida = data.medida
        this.salvarItem = true
      },
      alterarItem() {
        this.$store.commit("changeItemMaterial", this.Objeto)
        this.cleanForm()
      },
      impressaoPage(){
        this.$store.commit("changeImpressao", 1)
        this.$router.push('/pdf')
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
  