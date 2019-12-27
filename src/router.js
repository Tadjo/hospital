import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import LoginComponent from "./components/Login.vue";
import Patients from "./components/Patients.vue";
import Patient from "./components/Patient.vue";
import PatientHistory from "./components/History.vue";
import Doctor from "./components/Doctor.vue";
import store from "./store"

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        { path: "", component: Patients },
        {
          path: "patient/add",
          component: Patient,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "patient/:id",
          component: Patient,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "patient/:id/history",
          component: PatientHistory,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "doctor/add",
          component: Doctor,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "doctor/:id",
          component: Doctor,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    { path: "/login", component: LoginComponent },
    { path: "*", redirect: "/" }
  ]
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next(false)
  } else {
    next() 
  }
})
export default router;
