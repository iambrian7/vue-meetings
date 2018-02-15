import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addPost (params) {
<<<<<<< HEAD
=======
    console.log("server: addPost" + params)
>>>>>>> 573250f1b5048d92c848a02f3b24dc105c5a3ab3
    return Api().post('add_post', params)
  },

  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('post/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  }
}
