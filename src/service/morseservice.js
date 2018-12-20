import Api from '@/service/api'

export default {
  fetchUsers () {
    return Api().get('/users')
  },
  fetchScore (userID) {
    return Api().get('/users/score/'+userID)
  },
  AddUser(useremail,firebaseID){
    return Api().post('/users',{
      email: useremail,
      id: firebaseID
    })
  },
  fetchCourses (userID) {
    return Api().get('users/courselist/'+userID)
  },
  newCourse(userID,length,type) {
    return Api().post('/courses',{
      coursetype:type,
      userId:userID,
      length:length
    })
  },
  UpdateScore(userID,score) {
    return Api().put('/courses/'+userID,{
      score:score
    })
  }
}
