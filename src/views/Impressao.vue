<template>
  <v-container>
    <v-row>
      <v-col style="display: flex; justify-content: center; padding: 6px;">
        <v-btn @click="download">generate PDF</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container id="PDFpage">
    <v-row class="ma-0">
      <v-col>
        <Lista :headers="headers" :table="table" :title="title" pesquisa="true" :pageNumer="0" />
      </v-col>
    </v-row>
    <v-row class="ma-5">
      <v-col class="CampoAssinatura">
        <span>_____________________________</span>
        <span id="linhaAssinatura">Elaborador</span>
      </v-col>
      <v-col>
        <v-row class="ma-0">
          <v-col>
            <div class="textInfo d-flex justify-space-around">
              <div>
                <strong>Emitido em:</strong>
                <p>{{ emitidoEm }}</p>
              </div>
            </div>
            <!-- <p class="textAlert bg-red-accent-1">Observações: {{ observacoes }}</p> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import hmtl2pdf from "html2pdf.js";
import store from "@/store";
import Lista from "../components/Lista.vue";


export default {
  name: "PDFpage",

  components: {
    Lista,
  },
  computed: {
    table() {
      return store.state.lista;
    },
    title() {
      return store.state.titulo;
    },
  },
  data() {
    return {
      observacoes:
        "A responsabilidade das especificações abaixo é da ELETROTÉCNICA ARAÚJO. Quaisquer alterações ou substituição dos itens listados deverá ser aprovado pela equipe da Engenharia",
      headers: [
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
      emitidoEm: null
    };
  },
  methods: {
    download() {
      let config = {
        // margin: 0.2,
        pagespilt: true,
        filename: "Lista de carga de motores",
        image: { type: "png" },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", oientation: "portrait" },
      };
      let template = document.getElementById("PDFpage");
      hmtl2pdf().set(config).from(template).save();
    },
  },
  mounted() {
    const today = new Date(Date.now());
    this.emitidoEm = today.toLocaleDateString()
  }
};
</script>

<style>
.textAlerts {
  font-size: 10px;
  text-transform: uppercase;
}

.textInfo {
  font-size: 12px;
  text-transform: uppercase;
}

.title_table {
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
}

#linhaAssinatura {
  font-size: 14px;
  font-weight: bold;
}

.CampoAssinatura {
  margin-top: 1rem;
  padding: 0px;
  display: flex;
  place-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>