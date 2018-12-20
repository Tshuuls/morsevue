<template>
  <div class="hero">
    <h1 class="vue-title">Morse Trainer</h1>

    <form @submit.prevent="submit" v-show="!usersignedin.status">
      <div class="form-group" :class="{ 'form-group--error': $v.useremail.$error }">
        <label class="form__label">Email</label>
        <input class="form__input" id="inputemail" placeholder="enter Email here" v-model.trim="$v.useremail.$model"/>
      </div>
      <div class="error" v-if="!$v.useremail.required">Email is Required</div>
      <div class="error" v-if="!$v.useremail.email">Must be an Email-address.</div>
      <div class="form-group" :class="{ 'form-group--error': $v.userpassword.$error }">
        <label class="form__label">Password</label>
        <input type="password" id="inputpassword" class="form__input" placeholder="enter Password here" v-model.trim="$v.userpassword.$model"/>
      </div>
      <div class="error" v-if="!$v.userpassword.required">Password is Required</div>
      <div class="error" v-if="!$v.userpassword.minLength">Password must be at least {{$v.userpassword.$params.minLength.min}} long.</div>
      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Sign in </button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Logged in</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Loggin in...</p>
    </form>
    <p v-show="usersignedin.status" class="lead">
      Welcome {{vueuser.email}}
    </p>
    <p v-show="!usersignedin.status">
      <router-link to="/register" tag="button">Register</router-link></p>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueForm from 'vueform'
  import Vuelidate from 'vuelidate'
  import firebase from "firebase"
  import { required, minLength, between } from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)

  export default {
    name: 'Login',
    data () {
      return {
        messagetitle: ' MorseTrainer ',
        useremail: "",
        userpassword: "",
        submitStatus: null,
        vueuser:{
          firstname:"",
          lastname:"",
          email:""
        },
        usersignedin:{status:false}
      }
    },
    validations: {
      useremail: {
        required,
        email:true
      },
      userpassword: {
        required,
        minLength: minLength(6)
      }
    },created () {
      this.checkUser(this.vueuser,this.usersignedin)

    },
    methods: {
      submit () {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
            firebase.auth().signInWithEmailAndPassword(this.useremail, this.userpassword).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode,errorMessage)
              // ...
            });
          }, 500)
        }
      },checkUser: function (vueuser,usersignedin) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            console.log(user.email)
            vueuser.email=user.email
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
