<template>
  <div class="hero">
    <h1 class="vue-title">Morse Trainer Registration</h1>

    <form @submit.prevent="submit">
      <div class="form-group" :class="{ 'form-group--error': $v.useremail.$error }">
        <label class="form__label">Email</label>
        <input class="form__input" placeholder="enter Email here" v-model.trim="$v.useremail.$model"/>
      </div>
      <div class="error" v-if="!$v.useremail.required">Email is Required</div>
      <div class="error" v-if="!$v.useremail.email">Must be an Email-address.</div>
      <div class="form-group" :class="{ 'form-group--error': $v.userpassword.$error }">
        <label class="form__label">Password</label>
        <input type="password" class="form__input" placeholder="enter Password here" v-model.trim="$v.userpassword.$model"/>
      </div>
      <div class="error" v-if="!$v.userpassword.required">Password is Required</div>
      <div class="error" v-if="!$v.userpassword.minLength">Password must be at least {{$v.userpassword.$params.minLength.min}} long.</div>
      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Register</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Registration Succsessful</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Registering...</p>
    </form>

  </div>
</template>
<script>
  import Vue from 'vue'
  import VueForm from 'vueform'
  import Vuelidate from 'vuelidate'
  import firebase from "firebase"
  import MorseService from '@/service/morseservice'
  import { required, minLength } from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)

  export default {
    name: 'FormData',
    data () {
      return {
        messagetitle: ' MorseTrainer ',
        useremail: "",
        userpassword: "",
        submitStatus: null
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
            firebase.auth().createUserWithEmailAndPassword(this.useremail, this.userpassword)
            .then(function(user){
                var user = firebase.auth().currentUser;
                console.log("before sending user to mongo: "+user.email+ user.uid)
                MorseService.AddUser(user.email, user.uid).then(response => {
                  // JSON responses are automatically parsed.
                  console.log(response.data)
                })
                  .catch(error => {
                    console.log(error)
                  })
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode,errorMessage)
              });
          }, 500)
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
