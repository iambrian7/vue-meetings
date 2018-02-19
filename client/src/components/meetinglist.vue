<template>
  <div class="meetinglist">

  <!-- <div class="container"> -->
    <ul>
      <li
        v-for="(a, index) in meetings" 
        class='meeting-list-item' 
        v-bind:data-key='a.name'
        > {{ a.name }}
          </li>
    </ul>
  <!-- </div> end container -->
  </div>
</template>

<script>
export default {
  name: 'MeetingList',
  props: ["meetings"],
  data () {
    return {
      msg: 'Welcome to Meeting List',
      query: "",
      meetingObj: {},
      meetingIndex: []
    }
  }, 
  methods: {
    fixIndex: function(){
     // debugger;
      self = this;
      var indx = []
      this.meetings.forEach(function(m){
        if ((self.query == m.day) && (indx.length < 5)){
          indx.push(m._id)
        }
         
      })
      this.meetingIndex = indx;

    }
  },
  computed: {
    filteredIndex: function(){
      self = this;
      var indx = []
      this.meetings.forEach(function(m){
        if ((self.query == m.day) && (indx.length < 5)){
          indx.push(m._id)
        }
         
      })
     debugger
      this.meetingIndex = indx;
      return this.meetingIndex;
    }
    // filteredObj: function(){
    //   var index = this.meetingIndex[0]
    //   return this.meetingObj[index]
    // }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    dayname: function(value){
      var daysIndex = ['Sun','Mon', 'Tue','Wed','Thu', 'Fri', 'Sat'];
      return daysIndex[+value]
    }
  },
  created: function(){
   // debugger;
   console.log("meetinglist created: meetings len= " + this.meetings.length)
    self = this;
    this.meetings.forEach(function(m){
      self.meetingObj[m._id] = m;  
      })
  },
    updated: function(){
      console.log("meetinglist updated")
   // debugger;
    self = this;
    this.meetings.forEach(function(m){
      self.meetingObj[m._id] = m;  
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.class {
   
    background-color: #cccccc;
    width: 100wh;
    height: 100vh;
}
.meeting-header {background: #ccc;}
p {background: #ccc;}
.meetinglist ul {padding: 0;}
.meeting-list-item { padding: 5px; border: 1px solid grey; margin: 5px;
 background: #fff; text-align: left;  list-style: none;}
</style>
