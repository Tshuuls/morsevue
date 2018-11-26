import Api from '@/service/api'

export default {
  fetchUsers () {
    return Api().get('/users')
  }
}
