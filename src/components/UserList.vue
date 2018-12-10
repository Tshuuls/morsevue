<template>
  <div id="app1">
    <v-client-table :columns="columns" :data="users" :options="options">
    </v-client-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'
  import MorseService from '@/service/morseservice'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})


  export default {
    name: "UserList",
    data () {
      return {
        users: [],
        errors: [],
        columns: ['_id','firstname', 'lastname','score'],
        options: {
          filterable: ['firstname', 'lastname'],
          headings: {
            _id: 'ID',
            firstname: 'Firstname',
            lastname: 'Lastname',
            score:'Score'
          }
        }
      }
    },
    created () {
      this.loadUsers()

    },
    methods: {
      loadUsers: function () {
        MorseService.fetchUsers()
          .then(response => {
            // JSON responses are automatically parsed.
            this.users = response.data
            console.log(this.users)
            this.getScoreforUsers()
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },getScoreforUsers: function () {
        try{this.users.forEach(function(user){
          console.log(user._id)
          MorseService.fetchScore(user._id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.user.score = response.data.fullscore
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        })}
        catch(error){
          this.errors.push(error)
          console.log(error)
        }
      }
    }
  }
</script>

<style scoped>

</style>
