<template>
  <div id="app1">

    <p>Logout: {{message}}</p>
  </div>
</template>

<script>
  // import Vue from 'vue'
  // import MorseService from '@/service/morseservice'

  import firebase from "firebase"


  export default {
    name: "Logout",
    data () {
      return {
        message:""
      }
    },
    created () {
      this.Logout(this.message)

    },
    methods: {
      Logout: function (message) {
        message="Logging out, please wait"
        firebase.auth().signOut()
          .then(function(message) {
            // Sign-out successful.
            message="Successfully Logged out"
          })
          .catch(function(error) {
            // An error happened
            console.log(error)
          });
      }
    }
  }
</script>

<style scoped>

</style>
