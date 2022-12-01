<template>
  <v-row>
    <v-col>
      <q-table :title="title" :rows="table" :columns="headers" row-key="descricao" :filter="filter"
        :rows-per-page-options="pageNumer">
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
  props: ["headers", "table", "loading", "title", "pesquisa", "pageNumer"],
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
