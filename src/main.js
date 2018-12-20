// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from "firebase";

Vue.config.productionTip = false
Vue.use(BootstrapVue)

var config = {
  apiKey: "AIzaSyArvCfaXgyTLhIgvJaUiygAiKETxWZQPtE",
  authDomain: "morsetrainer-22b90.firebaseapp.com",
  databaseURL: "https://morsetrainer-22b90.firebaseio.com",
  projectId: "morsetrainer-22b90",
  storageBucket: "morsetrainer-22b90.appspot.com",
  messagingSenderId: "611211456354"
};
firebase.initializeApp(config);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
