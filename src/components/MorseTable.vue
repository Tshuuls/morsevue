<template>
  <div id="app1">
    <v-client-table :columns="columns" :data="morsetable" :options="options">
    </v-client-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})


    export default {
        name: "MorseTable",
      data () {
        return {
          morsetable: [{id: 1, morse: '.-', letter:'A'},
            {id: 2, morse: '-...', letter:'B'},
            {id: 3, morse: '-.-.', letter:'C'},
            {id: 4, morse: '-..', letter:'D'},
            {id: 5, morse: '.', letter:'E'},
            {id: 6, morse: '..-.', letter:'F'},
            {id: 7, morse: '--.', letter:'G'},
            {id: 8, morse: '....', letter:'H'},
            {id: 9, morse: '..', letter:'I'},
            {id: 10, morse: '.---', letter:'J'},
            {id: 11, morse: '-.-', letter:'K'},
            {id: 12, morse: '.-..', letter:'L'},
            {id: 13, morse: '--', letter:'M'},
            {id: 14, morse: '-.', letter:'N'},
            {id: 15, morse: '---', letter:'O'},
            {id: 16, morse: '.--.', letter:'P'},
            {id: 17, morse: '--.-', letter:'Q'},
            {id: 18, morse: '.-.', letter:'R'},
            {id: 19, morse: '...', letter:'S'},
            {id: 20, morse: '-', letter:'T'},
            {id: 21, morse: '..-', letter:'U'},
            {id: 22, morse: '...-', letter:'V'},
            {id: 23, morse: '.--', letter:'W'},
            {id: 24, morse: '-..-', letter:'X'},
            {id: 25, morse: '-.--', letter:'Y'},
            {id: 26, morse: '--..', letter:'Z'}],
          errors: [],
          columns: ['id','morse', 'letter'],
          options: {
            filterable: ['morse', 'letter'],
            perPage: 26,
            headings: {
              id: 'ID',
              morse: 'Code',
              letter: 'Letter'
            }
          }
        }
      }
    }

</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
</style>
