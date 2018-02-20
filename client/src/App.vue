<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
     <aalinks-nav></aalinks-nav>
     <keep-alive include="addmeeting">
      <router-view v-bind:meetings='meetings' v-bind:lat='lat' v-bind:lng='lng'></router-view>
   </keep-alive>
  </div>
</template>

<script>
import MeetingsService from '@/services/MeetingsService'
import Navigate from '@/components/navigation'

export default {
  name: 'App',
  components: {
    "aalinks-nav": Navigate
  },
  data() {
    return {
      lat: 44.9169,
      lng: -93.4450,
      meetings: [],
      meeting_list: {},
      meeting_list_index: [],
      locationFound: false
    }
  },
  methods: {
     async getMeetings () {
      console.log("fetching meetings.......")
      const response = await MeetingsService.fetchMeetings()
      this.meetings = response.data
    },
  },
  created() {
    console.log("App.vue created .............")
    this.getMeetings()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
