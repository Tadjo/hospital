import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import decodeJWT from "jwt-decode";

Vue.use(Vuex);
const token = localStorage.getItem("token");

export default new Vuex.Store({
  state: {
    status: "",
    token: token || "",
    user: token ? decodeJWT(token) : "",
    patients: []
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    get_patients(state, patients) {
      state.patients = patients;
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8081/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8081/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    createPatient({ dispatch }, patient) {
      axios({
        url: "http://localhost:8081/patients",
        data: patient,
        method: "POST"
      }).then(() => {
        dispatch("getPatients");
      });
    },
    getPatients({ commit }) {
      axios({
        url: "http://localhost:8081/patients",
        method: "GET"
      }).then(res => {
        const patients = (res.data.data || []).map(p => {
          (p.fio = `${p.firstName} ${p.lastName} ${p.middleName}`),
            (p.datein = p.datein && new Date(p.datein).toLocaleDateString());
          p.dateout = p.dateout && new Date(p.dateout).toLocaleDateString();
          return p;
        });
        commit("get_patients", patients);
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    patients: state => state.patients
  }
});
