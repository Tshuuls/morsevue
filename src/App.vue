<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Morse Trainer</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/morsetable"><i class="fa fa-list" style="padding: 5px"> Morse Table</i></b-nav-item>
          <b-nav-item to="/userlist"><i class="fa fa-list" style="padding: 5px"> ScoreBoard</i></b-nav-item>
          <b-nav-item v-show="usersignedin.status" to="/Course"><i class="fa fa-sign-out" style="padding: 5px"> Course </i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/myaccount"><i class="fa fa-sign-in" style="padding: 5px"> My Account </i></b-nav-item>
          <b-nav-item v-show="!usersignedin.status" to="/Login"><i class="fa fa-sign-out" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item  v-show="usersignedin.status" to="/logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view :UserID="vueuser.id" :UserEmail="vueuser.email" :SigninStatus="usersignedin" />
  </div>
</template>

<script>

import firebase from "firebase"


export default {
  name: "App",
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
          //console.log(user.email)
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
