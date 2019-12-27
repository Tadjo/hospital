<template>
  <div class="content">
    <v-app-bar absolute primary>
      <router-link to="/">
        <v-toolbar-title>Hospital</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <span style="margin-right: 10px">{{ user && user.login }}</span>
        <v-btn v-if="isLoggedIn" @click="logout">Выйти</v-btn>
      </div>
      <v-btn v-if="!isLoggedIn" @click="login">Войти</v-btn>
    </v-app-bar>
    <v-container>
      <router-view></router-view>
    </v-container>
    <v-footer absolute height="48">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    user: function() {
      return this.$store.getters.user;
    }
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style>
.content {
  margin-top: 64px;
  margin-bottom: 48px;
  height: calc(100% - 64px 48px);
}
</style>