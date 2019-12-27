<template>
  <v-card>
    <v-card-title>
      Patients
      <v-spacer></v-spacer>
      <router-link to="patient/add" v-if="isLoggedIn && !isAdmin">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn x-small fab dark color="primary" v-on="on">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Добавить Пациента</span>
        </v-tooltip>
      </router-link>
      <router-link to="doctor/add" v-if="isLoggedIn && isAdmin">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn x-small fab dark color="primary" v-on="on">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Добавить Врача</span>
        </v-tooltip>
      </router-link>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="20"
      class="patients-table"
      @click:row="onRowClick"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "ФИО", value: "fio" },
        { text: "Врач", value: "dc" },
        { text: "Диагноз", value: "di" },
        { text: "Дата поступления", value: "datein" },
        { text: "Дата выписки", value: "dateout" },
        { text: "Палата", value: "appartment" }
      ],
      data: [
        {
          id: 1,
          fio: "AAA",
          di: "a",
          dc: "HOUSE1",
          datein: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
          dateout: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
          appartment: "1"
        },
        {
          id: 2,
          fio: "BBB",
          di: "b",
          dc: "HOUSE2",
          datein: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
          dateout: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
          appartment: "2"
        },
        {
          id: 3,
          fio: "CCC",
          di: "c",
          dc: "HOUSE3",
          datein: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
          dateout: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
          appartment: "3"
        }
      ]
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.user.login === 'admin'
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    items() {
      return this.data.filter(
        it =>
          it.fio.toLowerCase().includes(this.search.trim().toLowerCase()) ||
          it.dc.toLowerCase().includes(this.search.trim().toLowerCase())
      );
    }
  },
  methods: {
    onRowClick(patient) {
      this.$router.push(`patient/${patient.id}/history`);
    }
  }
};
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
</script>

<style>
.search {
  padding-top: 0 !important;
  margin-top: 0 !important;
  margin-left: 15px !important;
}
a + a button.v-btn {
  margin-left: 10px;
}
.patients-table tbody tr {
  cursor: pointer !important;
}
</style>