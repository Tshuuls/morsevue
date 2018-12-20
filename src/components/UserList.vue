<template>
  <div id="app1">
    <v-client-table ref="table" :columns="columns" :data="users" :options="options">
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
        columns: ['email','score'],
        options: {
          filterable: ['email','score'],
          headings: {
            email: 'Email',
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
            //this.users =
            //console.log(this.users)
            this.getScoreforUsers(response.data)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },getScoreforUsers: function (scoreusers) {
        try{scoreusers.forEach(function(user){
          //console.log("getScoreforUsers userID: "+user._id)
          MorseService.fetchScore(user._id)
            .then(response => {
              // JSON responses are automatically parsed.

              if (response.data.fullscore===undefined){
                user.score="0";
              } else{
                user.score = response.data.fullscore.toString();
              }

              //console.log(user)

            })
            .catch(error => {
              console.log(error)
            })
        }
        );
        //console.log(scoreusers)
          this.users=scoreusers
          this.onUpdate();
          //console.log(this.users)
        }
        catch(error){
          this.errors.push(error)
          console.log(error)
        }
      },
      onUpdate: function() {
        this.$refs.table.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
