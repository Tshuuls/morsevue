import Api from '@/service/api'

export default {
  fetchUsers () {
    return Api().get('/users')
  },
  fetchScore (userID) {
    return Api().get('/users/score/'+userID)
  }
}
