import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('meetings')
  },

  addPost (params) {
    return Api().post('add_meeting', params)
  },

  updatePost (params) {
    return Api().put('meeting/' + params.id, params)
  },

  getPost (params) {
    return Api().get('meeting/' + params.id)
  },

  deletePost (id) {
    return Api().delete('meeting/' + id)
  }
}
