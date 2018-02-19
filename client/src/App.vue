<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
     <aalinks-nav></aalinks-nav>
     <button @click="getMeetings()">GetMeetings</button>
     <p>Meetings found: {{meetings.length}}</p>
    <router-view/>
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
      meetings: []
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
  margin-top: 60px;
}
</style>
