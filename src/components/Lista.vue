<template>
  <v-row>
    <v-col>
      <q-table v-if="(pagination === true)" :title="title" :rows="table" :columns="headers" row-key="descricao"
        :filter="filter" style="page-break-inside: auto;" rows-per-page-label="Itens por página">
        <template v-slot:top-right>
          <q-input v-if="!pesquisa" borderless debounce="300" v-model="filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <q-table v-else :title="title" :rows="table" :columns="headers" row-key="descricao" :filter="filter"
        style="page-break-inside: auto;" rows-per-page-label="Itens por página" :rows-per-page-options="[0]">
        <template v-slot:top-right>
          <q-input v-if="!pesquisa" borderless debounce="300" v-model="filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Lista",
  props: ["headers", "table", "loading", "title", "pesquisa", "pagination"],
  emits: ["showData"],
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    ToShowData(evt, row) {
      this.$emit("showData", row);
    },
  },
};
</script>
