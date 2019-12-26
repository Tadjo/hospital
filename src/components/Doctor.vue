<template>
  <v-card class="patient-form">
    <v-card-title primary-title>
        Добавление доктора
    </v-card-title>
    <v-card-text>     
    <v-form>
      <v-text-field v-model="firstName" name="firstname" label="Фамилия" id="firstname"></v-text-field>
      <v-text-field v-model="lastName" name="secondName" label="Имя" id="secondName"></v-text-field>
      <v-text-field v-model="middleName" name="MiddleName" label="Отчество" id="MiddleName"></v-text-field>
      <v-menu
        v-model="showDatePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="fdate"
            label="Дата поступления"
            append-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="showDatePicker = false" locale="ru"></v-date-picker>
      </v-menu>
      <v-text-field v-model="room" name="room" label="Кабинет" id="room" type="number"></v-text-field>
    </v-form>
    </v-card-text>
    <v-card-actions>        
      <v-spacer></v-spacer>
      <v-btn color="primary">Создать</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
        firstName: '',
        lastName: '',
        middleName: '',
        position: '',
        date: new Date().toISOString().substr(0, 10),
        room: 0,
        login: '',
        pass: '',
        conf: '',
        showDatePicker: false
    };
  },
  computed: {
      fdate() {
          return this.formatDate(this.date);
      }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  }
};
</script>

<style>
.patient-form {
  padding: 20px;
}
</style>