<template>
  <div class="content">
    <v-app-bar absolute primary>
      <router-link to="/">
        <v-toolbar-title >Hospital</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn @click="signin">Войти</v-btn>
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
  methods: {
    signin() {
      this.$router.push("/login");
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