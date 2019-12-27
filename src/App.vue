<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
  created() {
  this.$http.interceptors.response.use(undefined, function (err) {
    return new Promise(() => {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch("logout")
      }
      throw err;
    });
  // this.$http.interceptors.request.use(config => {
  //   config.headers.Authorization = `Bearer ${this.$store.token}`;
  // })
})
  }
};
</script>
