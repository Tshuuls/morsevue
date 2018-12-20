<template>
  <div class="hero">
    <h1 class="vue-title">Morse Trainer</h1>


    <p v-show="usersignedin.status" class="lead">
      Welcome {{vueuser.email}}
    </p>
  </div>
</template>
<script>
  import Vue from 'vue'
  import firebase from "firebase"



  export default {
    name: 'FormData',
    data () {
      return {
        vueuser:{
          id:"",
          email:""
        },
        usersignedin:{status:false}
      }
    },created () {
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
<style>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }
</style>
