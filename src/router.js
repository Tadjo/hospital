import Vue from "vue";
import VueRouter from "vue-router";
import Home from './components/Home.vue';
import LoginComponent from './components/Login.vue';
import Patients from './components/Patients.vue';
import Patient from './components/Patient.vue';
import PatientHistory from './components/History.vue';
import Doctor from './components/Doctor.vue';

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: "/", name: 'home', component: Home, children: [
        {path: '', component: Patients},
        {path: 'patient/add', component: Patient },
        {path: 'patient/:id', component: Patient },
        {path: 'patient/:id/history', component: PatientHistory},
        {path: 'doctor/add', component: Doctor },
        {path: 'doctor/:id', component: Doctor },
      ]},
      { path: "/login", component: LoginComponent },
      { path: "*", redirect: '/' },
    ]
  });
export default router;