<template>
  <v-row>
    <v-col>
      <v-alert dense :type="type">
        {{ text }}
      </v-alert>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Alerts",
  props: ["type", "text"],
  data() {
    return { drawer: false };
  },
};
</script>
