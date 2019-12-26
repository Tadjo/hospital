<template>
  <div class="login-container">
    <h1>HOSPITAL</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="24">
            <v-text-field
              v-model="login"
              prepend-icon="mdi-account"
              :rules="[rules.required, rules.min]"
              name="input-10-2"
              label="Логин"
              hint="At least 8 characters"
              counter
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-lock"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Пароль"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div class="login-controls">
      <v-btn @click="submit" color="primary">Войти</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      password: "root",
      login: "admin",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    submit() {
      if (this.password === "root" && this.login === "admin") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.login-container {
  display: flex;
  margin: 0 auto;
  height: 100vh;
  width: 400px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
.login-container form {
  width: 100%;
}
</style>