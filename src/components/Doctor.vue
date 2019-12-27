<template>
  <v-card class="patient-form">
    <v-card-title primary-title>Добавление доктора</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="firstName"
          name="firstname"
          label="Фамилия"
          id="firstname"
          :rules="[rules.required, rules.min]"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          name="secondName"
          label="Имя"
          id="secondName"
          :rules="[rules.required, rules.min]"
        ></v-text-field>
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
              label="Дата устройства"
              append-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="employmentDate" @input="showDatePicker = false" locale="ru"></v-date-picker>
        </v-menu>
        <v-text-field v-model="room" name="room" label="Кабинет" id="room" type="number"></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="login"
          name="login"
          label="Логин"
          :rules="[rules.required, rules.min]"
          id="login"
        ></v-text-field>
        <v-text-field
          v-model="password"
          prepend-icon="mdi-lock"
          :rules="[rules.required, rules.password]"
          name="password"
          label="Пароль"
        ></v-text-field>
        <v-text-field
          v-model="confirm"
          prepend-icon="mdi-lock"
          :rules="[rules.required, rules.confirm]"
          name="confirm"
          label="Подтвердите пароль"
          :disabled="rules.password(password) !== true"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submit" color="primary">Создать</v-btn>
    </v-card-actions>
    <v-snackbar :color="snackColor" v-model="showSnack" :right="true" :top="true">
      {{ snackText }}
      <v-btn color="white" text @click="showSnack = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      middleName: "",
      position: "",
      employmentDate: new Date().toISOString().substr(0, 10),
      room: 0,
      login: "",
      password: "",
      confirm: "",
      showDatePicker: false,
      showSnack: false,
      snackColor: 'success',
      snackText: "",
      rules: {
        required: value => !!value || "Заполните поле.",
        min: v => v.length >= 3 || "Введите как минимум 3 символов",
        password: v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
          "Пароль должен содержать как минимум 1 число, 1 маленькую и 1 большую букву",
        confirm: v => this.password === v || "Пароли не совпадают"
      }
    };
  },
  computed: {
    fdate() {
      return this.formatDate(this.employmentDate);
    },
    isValid() {
      return this.$refs.form.validate();
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    submit() {
      if (this.isValid) {
        const {
          firstName,
          lastName,
          middleName,
          position,
          employmentDate,
          room,
          login,
          password
        } = this;
        this.$store
          .dispatch("register", {
            firstName,
            lastName,
            middleName,
            position,
            employmentDate,
            room,
            login,
            password
          })
          .then(() => {
            this.snackColor = 'success';
            this.showSnack = true;
            this.snackText = "Доктор создан";
            this.$refs.form.reset();
          })
          .catch((res) => {
            this.snackColor = 'error';
            this.showSnack = true;
            this.snackText =  (res.response && res.response.data && res.response.data.message) || "Серверная ошибка"
          });
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