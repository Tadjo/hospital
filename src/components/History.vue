<template>
  <div>
    <v-row>
      <v-col>History list</v-col>
      <v-col>History item</v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Диагноз", value: "disease" },
        { text: "Дата поступления", value: "dateIn" },
        { text: "Дата выписки", value: "dateOut" },
        { text: "Врач", value: "doctor" },
      ],
      items: [
        {
          disease: "a",
          dateIn: "ss",
          dateOut: "ss",
          doctor: "ss"
        },
        {
          disease: "b",
          dateIn: "ss",
          dateOut: "ss",
          doctor: "ss"
        },
        {
          disease: "c",
          dateIn: "ss",
          dateOut: "ss",
          doctor: "ss"
        }
      ]
    };
  }
};
</script>

<style>
</style>