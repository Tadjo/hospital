<template>
  <v-card class="patient-form">
    <v-card-title primary-title>Добавление пациента</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          name="firstname"
          label="Фамилия"
          id="firstname"
          :rules="[rules.required, rules.min]"
          v-model="firstName"
        ></v-text-field>
        <v-text-field
          name="secondName"
          label="Имя"
          id="secondName"
          :rules="[rules.required, rules.min]"
          v-model="lastName"
        ></v-text-field>
        <v-text-field name="MiddleName" label="Отчество" id="MiddleName" v-model="middleName"></v-text-field>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fdatein"
              label="Дата поступления"
              append-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="datein" @input="menu2 = false" locale="ru"></v-date-picker>
        </v-menu>
        <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fdateout"
              label="Дата выписки"
              append-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateout" @input="menu3 = false" locale="ru"></v-date-picker>
        </v-menu>
        <v-radio-group v-model="gender" label="Пол" row>
          <v-radio label="Муж." :value="1"></v-radio>
          <v-radio label="Жен." :value="2"></v-radio>
        </v-radio-group>
        <v-text-field v-model="chamber" name="chamber" label="Палата" id="place" type="chamber"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submit" color="primary">Добавить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menu2: false,
      menu3: false,
      firstName: "",
      lastName: "",
      middleName: "",
      datein: new Date().toISOString().substr(0, 10),
      dateout: new Date().toISOString().substr(0, 10),
      fdatein: this.formatDate(new Date().toISOString().substr(0, 10)),
      fdateout: this.formatDate(new Date().toISOString().substr(0, 10)),
      gender: 1,
      chamber: 0,
      rules: {
        required: value => !!value || "Заполните поле.",
        min: v => v.length >= 3 || "Введите как минимум 3 символов"
      }
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    submit() {
      if (this.$refs.form.validate()) {
        const {
          firstName,
          lastName,
          middleName,
          datein,
          dateout,
          chamber,
          gender
        } = this;
        this.$store.dispatch("createPatient", {
          firstName,
          lastName,
          middleName,
          datein,
          dateout,
          chamber,
          gender
        }).then(() => this.$router.push('/'));
      }
    }
  }
};
</script>

<style>
.patient-form {
  padding: 20px;
}
</style>