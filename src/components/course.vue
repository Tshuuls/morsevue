<template>
  <div id="app1">

      <form @submit.prevent="submit" v-show="overviewacitve">
        <input type="radio" id="morse" value="morse" v-model="picked">
        <label for="morse">Morse</label>
        <br>
        <input type="radio" id="letter" value="letter" v-model="picked">
        <label for="letter">Letter</label>
        <br>
        <span>Picked: {{ picked }}</span>
        <br />
        <div class="error" v-if="!$v.picked.required">CourseType is Required</div>

        <div class="form-group" :class="{ 'form-group--error': $v.courselength.$error }">
          <label class="form__label">enter Courselength here</label>
          <input class="form__input" id="courselength" placeholder="0" v-model.trim="$v.courselength.$model"/>
        </div>
        <div class="error" v-if="!$v.courselength.required">Courselength is Required</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Start new course </button>
    </p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Course is generating.</p>
    </form>
    <v-client-table v-show="overviewacitve" ref="table" :columns="columns" :data="courses" :options="options">
      <a slot="redo" slot-scope="prop" class="fa fa-repeat fa-2x" @click="redo(prop.row._id)"></a>
      <a slot="delete" slot-scope="prop" class="fa fa-times fa-2x" @click="deletecourse(prop.row._id)"></a>
    </v-client-table>

    <div v-show="courseactive">
      <form @submit.prevent="evaluate">

        <div class="form-group" v-for="(item,index) in courselist">
          <label class="form__label">{{item.given}}</label>
          <input class="form__input"  :id="index" placeholder="" v-model="item.answer"/>
          <div class="error" v-if="!$v.courselength.required">Field is Required</div>
        </div>


        <p>
          <button class="btn btn-primary btn1" type="evaluate" :disabled="submitStatus === 'PENDING'">Submit</button>
        </p>
      </form>
    </div>
    <div v-show="showresults">
      <h3>Score: {{coursescore}}</h3>
      <table class="table">
        <tr>
          <th>Morse</th>
          <th>Letter</th>
          <th>Answer</th>
        </tr>
        <tr v-for="(item) in results" style="font-weight: bold">
          <td>{{item.morse}}</td>
          <td>{{item.letter}}</td>
          <td v-if="item.answer ===item.letter ||item.answer ===item.morse" style=" color:green">{{item.answer}}</td>
          <td v-else style="color:red">{{item.answer}}</td>
        </tr>
      </table>
      <button class="btn btn-primary btn1" type="finishCourse" v-on:click="finishCourse"> Finish course</button>
    </div >
  </div>
</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase"
  import MorseService from '@/service/morseservice'
  import VueTables from 'vue-tables-2'
  import VueForm from 'vueform'
  import Vuelidate from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'


  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)


    export default {
        name: "course",
      props: {
        UserEmail: {
          type: String,
          required: false
        },UserID: {
          type: String,
          required: false
        },SigninStatus: {
          type: Object,
          required: true
        },

      },
    data () {
      return {
        prop:['_id'],
        vueuser:{
          id:this.UserID,
          email:this.UserEmail
        },
        usersignedin:this.SigninStatus,
        courses:[],
        picked:"",
        submitStatus:"",
        newcourse:{},
        courselist:[],
        results:[],
        coursescore:0,
        showresults:false,
        courseactive:false,
        overviewacitve:true,
        courselength:0,
        columns: ['score','coursetype','count','redo','delete'],
        options: {
          filterable: ['score','coursetype','count'],
          headings: {
            coursetype: 'Coursetype',
            score:'Score',
            count:'Count',
            redo:'Redo',
            delete:"Delete"
          }
        }
      }
    },
      validations: {
        courselength: {
          required,
          number:true
        },
        picked:{
          required
        }
      },created () {
      //this.checkUser(this.vueuser,this.usersignedin)
      this.getCourses(this.vueuser)



    },
    methods: {
      deletecourse: function (id) {
        MorseService.DeleteCourse(id)
          .then(response => {
            console.log(response.data)
            this.getCourses(this.vueuser)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      redo: function (id) {
        console.log(id)
        var templist=[];
        var course={}
        this.courses.forEach(function(item){
          if(item._id==id){
            course=item
          }
        })
        this.newcourse={}
        this.newcourse=course
        if (this.newcourse.coursetype=="morse"){

          this.newcourse.coursecontent.forEach(function(item){
            var tempitem={};
            tempitem.given=item.morse;
            tempitem.answer="";
            templist.push(tempitem);
          })
        } else{
          this.newcourse.coursecontent.forEach(function(item){
            var tempitem={};
            tempitem.given=item.letter;
            tempitem.answer="";
            templist.push(tempitem);
          })
        }
        this.courselist={}
        this.courselist=templist;


        this.showresults=false;
        this.courseactive=true;
        this.overviewacitve=false;
      },
      finishCourse(){
        this.newcourse={};
        this.courselist=[];
        this.results=[];
        this.showresults=false;
        this.courseactive=false;
        this.overviewacitve=true;
      }
       ,evaluate(){
        var tempindex=0;
        var score=0;
         var coursecontent=this.newcourse.coursecontent
         var templist=[];
         var tempcourselist=this.courselist;
         var tempresults=this.results;
         var tempobject={};
         console.log(coursecontent)
         if (this.newcourse.coursetype=="morse"){

           coursecontent.forEach(function(item){
             if(item.letter==tempcourselist[tempindex].answer.toUpperCase())
             {
               score++;
             }
             tempobject={};
             tempobject.letter=item.letter;
             tempobject.morse=item.morse;
             tempobject.answer=tempcourselist[tempindex].answer.toUpperCase()
             tempresults.push(tempobject);
             tempindex++;
           })
         } else{
           coursecontent.forEach(function(item){
             if(item.morse==tempcourselist[tempindex].answer)
             {
               score++;
             }
             tempobject={};
             tempobject.letter=item.letter;
             tempobject.morse=item.morse;
             tempobject.answer=tempcourselist[tempindex].answer.toUpperCase()
             tempresults.push(tempobject);
             tempindex++;
           })
         }
         console.log(score);
         this.coursescore=score;
         MorseService.UpdateScore(this.newcourse._id,score).then(response => {
           console.log(response.data)
           this.getCourses(this.vueuser)
         })
           .catch(error => {
             //this.errors.push(error)
             console.log(error)
           })
         this.results= tempresults;
         this.courseactive=false;
         this.showresults=true
       }
      ,submit () {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
            MorseService.newCourse(this.vueuser.id,this.courselength,this.picked).then(response=>{

              this.newcourse=response.data.course;
              this.courseactive=true;
              this.overviewacitve=false;

              var coursecontent=this.newcourse.coursecontent
              var templist=[];
              console.log(coursecontent)
              if (this.newcourse.coursetype=="morse"){

                coursecontent.forEach(function(item){
                  var tempitem={};
                  tempitem.given=item.morse;
                  tempitem.answer="";
                  templist.push(tempitem);
                })
              } else{
                coursecontent.forEach(function(item){
                  var tempitem={};
                  tempitem.given=item.letter;
                  tempitem.answer="";
                  templist.push(tempitem);
                })
              }
              this.courselist=templist;

            }).catch(error => {
              this.errors.push(error)
              console.log(error)
            })

          }, 500)
        }
      }
      ,getCourses: function(vueuser){
        console.log("userID:"+vueuser.id)
        MorseService.fetchCourses(vueuser.id)
          .then(response => {
            console.log(response.data)
            this.courses=response.data
            var tempcount=0;
            response.data.forEach(function (item) {
              item.count=item.coursecontent.length-tempcount;
              tempcount=item.coursecontent.length
            })
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
      ,checkUser: function (vueuser,usersignedin) {
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

      }
    }
    }
</script>

<style scoped>

</style>
