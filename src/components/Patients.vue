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
      :disable-pagination="true"
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
        { text: "Дата поступления", value: "datein" },
        { text: "Дата выписки", value: "dateout" },
        { text: "Палата", value: "chamber" }
      ],
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
      const patients =  (this.$store.getters.patients || []).map(p => {
        p.fio = `${p.firstName} ${p.lastName} ${p.middleName}`,
        p.datein = p.datein && new Date(p.datein).toLocaleDateString();
        p.dateout = p.dateout && new Date(p.dateout).toLocaleDateString();
        return p;
      });
      return this.search.trim() ? patients.filter(
        it =>
          it.fio.toLowerCase().includes(this.search.trim().toLowerCase())
      ) : patients;
    }
  },
  methods: {
    onRowClick(patient) {
      this.$router.push(`patient/${patient.id}/history`);
    }
  },
  mounted() {
    if (!this.$store.getters.patients.length) {
      this.$store.dispatch("getPatients");
    }
  }
};
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