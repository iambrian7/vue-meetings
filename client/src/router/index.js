import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import Posts from '@/components/Posts'
// import addpost from '@/components/AddPost'
// import editpost from '@/components/EditPost'
import Meetings from '@/components/meetings'
import CompareMeetings from '@/components/CompareMeetings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/meetings',
      name: 'Meetings',
      component: Meetings
    },
    {
      path: '/compare-meetings',
      name: 'compare-meetings',
      component: CompareMeetings
    },
    // {
    //   path: '/posts/add',
    //   component: addpost,
    //   name: 'addpost'
    // },
    // {
    //   path: '/posts/:id/edit',
    //   component: editpost,
    //   name: 'editpost'
    // }
  ]
})
