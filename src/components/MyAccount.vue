<template>
  <div id="app1">
    <p>My account</p>
    <p v-show="usersignedin.status">hello {{vueuser.email}}</p>
    <p v-show="!usersignedin.status">Please log in {{vueuser.email}} {{usersignedin.status}}<router-link to="/#" tag="button">Login</router-link></p>
  </div>
</template>

<script>
 // import Vue from 'vue'
 // import MorseService from '@/service/morseservice'

 import firebase from "firebase"


  export default {
    name: "MyAccount",
    data () {
      return {
        vueuser:{
          id:"",
          email:""
        },
        usersignedin:{status:false}
      }
    },
    created () {
      this.checkUser(this.vueuser,this.usersignedin)

    },
    methods: {
      checkUser: function (vueuser,usersignedin) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            console.log(user.email)
            vueuser.email=user.email
            vueuser.id=user.uid
            usersignedin.status=true
          } else {
            // No user is signed in.
            usersignedin.status=false
            console.log("no User Logged in")
          }
        });
        if(vueuser.email!=""){
          usersignedin.status=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
