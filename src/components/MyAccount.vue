<template>
  <div id="app1">
    <p>My account</p>
    <p v-show="usersignedin.status">hello {{vueuser.email}}</p>
    <p v-show="!usersignedin.status">Please <router-link to="/#" tag="button">Login</router-link></p>
    <button v-show="usersignedin.status" class="btn btn-primary btn1" type="deleteUser" v-on:click="deleteUser"> Delete my User</button>
  </div>
</template>

<script>
 // import Vue from 'vue'
  import MorseService from '@/service/morseservice'

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
      deleteUser (){
        var user = firebase.auth().currentUser;

        user.delete().then(function() {
          MorseService.DeleteUser(user.uid)
            .then(response => {
              console.log(response.data)

          })
            .catch(error => {
              //this.errors.push(error)
              console.log(error)
            })
        }).catch(function(error) {
          console.log(error)
        });
        this.$router.push('/')
      }
      ,checkUser: function (vueuser,usersignedin) {
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
