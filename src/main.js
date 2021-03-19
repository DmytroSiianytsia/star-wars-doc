import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import routes from "./routes"
import firebase from 'firebase/app'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: "history",
  routes,
})

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyB80fDRtDTLeLyEy1dCoWvj64X8mDPGbMU",
  authDomain: "star-wars-doc.firebaseapp.com",
  projectId: "star-wars-doc",
  storageBucket: "star-wars-doc.appspot.com",
  messagingSenderId: "526962222719",
  appId: "1:526962222719:web:08210084f1766f88d6014a",
  measurementId: "G-3YNY3RE0Y3"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app")
