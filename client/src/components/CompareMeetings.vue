<template>
  <div class="compare-meetings">
    {{ msg }}
  <div class="compare-container">
    <div class="left-meeting">
      <h3>GeoMeetings ({{meetings.length}})</h3>
      <ul class="list-group" >
       <!-- <li class="list-group-item"> -->
       <li @click="compareThis"
        v-for="(a, index) in filteredGeo" 
        class='meeting-list-item' 
        v-bind:data-key='a.slug' :key='a.slug'
        >  {{ a.name }}
        {{a.time_formatted}} {{a.day | dayname}}
          </li>
    </ul>

    </div>
    <div class="right-meeting">
      <h3>Mpls Meetings ({{mpls.length}})</h3>
      <ul>
          <li
            v-for="(a, index) in mplsMeetings" 
            class='meeting-list-item' 
            v-bind:class="{ error: a.name == 'not found' }"
            v-bind:data-key='a.name' :key='a.slug'
            >  {{ a.name }} {{a.slug}}
            {{a.time_formatted}} {{a.day | dayname}}
          </li>
    </ul>
    </div>
    <div class="error-mpls">
       <h3>Errors Mpls ({{errorsMpls.length}})</h3>
      <ul>
          <li
            v-for="(pair, index) in mydups" 
            class='meeting-list-pairs' 
            :key='index'>
            <span v-bind:class="{ error: pair[0] == 'not found - 1' }">{{pair[0]}}</span>
            <span v-bind:class="{ error: pair[1] == 'not found - 2' }">{{pair[1]}}</span>
          
          </li>
    </ul>
    </div>
  </div> 
  <!-- end container -->
  </div>
</template>

<script>
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'mplsAll04082018.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }


export default {
  name: 'compare-meetings',
  props: ["meetings"],
  data () {
    return {
      msg: 'Welcome to Compare Meetings',
      query: "",
      meetingObj: {},
      meetingIndex: [],
      mplsMeetings: [],
      mpls:[],
      mplsIndex: {},
      errorsMpls: [],
      mydups: []
    }
  }, 
  methods: {
    getMplsIndex: function(){
      //  == mpls[mplsIndex[slug]]
    debugger
      var c = this.mpls.forEach(function(a,i){
          this.mplsIndex[a.slug] = i
        },this)
    },
    findInGeo: function(a){
      return this.meetings.find(function(m){
          return a.slug == m.slug
      })
    },
    findMplsDifferences: function(){
      debugger
      var dups = []
      this.meetings.forEach(m => dups.push(m.slug + '--1'))
      this.mpls.forEach(m => dups.push(m.slug + '--2'))
      dups.sort()
      var alldups = []
     // var alldups = 0
      for (var i=0; i<dups.length-1; i++){
      // for (var i=0; i< 200; i++){
       // console.log(`${i} len=${dups.length}`)
        var pair = []
        var slug1 = dups[i].split('--')[0]
        var sep1 = dups[i].split('--')[1]
        var slug1 = dups[i+1].split('--')[0]
        var sep2 = dups[i+1].split('--')[1]
        // if sep == '2' then 1 is missing
        if (sep1 == '2'){ // add missing item to first list
          pair[0] = "not found - 1"
          pair[1] = dups[i]
        } else {
          pair[0] = dups[i]
          //alldups.push(dubs[i++]) // add first item
          if (sep2 == '2'){
            pair[1] = dups[++i]
            //alldups.push(dubs[i])
          } else {// second item is not found
            pair[1] = "not found - 2"
            //alldups.push("not found - 2")
          }          
        }
      //  console.log("pair=" + pair)
        alldups.push(pair)
      }
      this.mydups = alldups
        // var a = this.meetings[0]
        // console.log("geomeeting 1 = " + JSON.stringify(a, null, 3))
        // var b = this.mpls[this.mplsIndex[a.slug]]
        // console.log("mpls meeting 1 = " + JSON.stringify(b, null, 3))
        //  var c = this.mpls.filter(function(a){
        //    var geo = this.findInGeo(a)
        //    if (!geo){
        //       this.errorsMpls.push(a)
        //    }
      // this.meetings.forEach(function(m){
      //   // first find mpls meeting
      //   var c = this.mpls.filter(function(a){
      //     return a.slug == m.slug
      //   })[0]
      //   if (c){ // found equal slug
      //   var clat = c.latitude * 1
      //   var mlat = m.loc.coordinates[1] * 1

      //     if (clat.toFixed(2) != mlat.toFixed(2)){
      //   console.log(`${m.location} clat ${clat} mlat ${mlat}`)
      //   console.log(`${m.location} clat ${clat.toFixed(3)} mlat ${mlat.toFixed(3)}`)
      //       this.errorsMpls.push(c)
      //     }
      //   }
      // },this)
    },
    isEqual: function(a,b){
      debugger
      return a.name == b.name &&
      a.time == b.time &&
      a.formatted_address == b.formatted_address
    },
    compareThis: function(e){
      this.findMplsDifferences()
     // debugger
      // console.log("target = " + e.target)
      // // find meeting target
      // var key = e.target.dataset.key
      // var x = this.meetings.filter(function(a){
      //   return key == a.slug
      // })
      // if (x){
      //   console.log("found slug " + key)
      //   var c = this.mpls.filter(function(a){
      //     return key == a.slug
      //   })
      //   if (c){
      //     console.log("found : " + JSON.stringify(c, null, 3))
      //     if (this.isEqual(x[0],c[0])){
      //       console.log("equal meeting")
      //       c.error = false
      //     } else {
      //       console.log("unequal meeting")
      //       c.error = true
      //     }
      //   } else {
      //     console.log("no mpls found for " + key)
      //   }

      // } else {
      //   console.log("can not find slug " + key)
      // }
    },
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
    filteredGeo: function(){
     // var sortKey = "day"//"time" //this.sortKey
    var sortKey = "slug"//"day"//"time" //this.sortKey
      var filterKey = false //this.filterKey && this.filterKey.toLowerCase()
      var order = 1//this.sortOrders[sortKey] || 1
      var data = this.meetings
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          if (a === b){
            a = a["time"]
            b = b["time"]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          } else {
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }
        })
      }
 
      this.mplsMeetings = data.map(function(m){
        // get mpls meeting
       // console.log(`geo:  ${JSON.stringify(m)}`)
        var mplsI = this.mplsIndex[m.slug]
        if (typeof mplsI === 'undefined') {
          // Your variable is undefined
        console.log(`mpls index:  ${mplsI}  geo: ${m.name}`)
        }
       // console.log(`mpls index:  ${mplsI}`)

        var a = this.mpls[mplsI]

      //   console.log(`mpls:  ${JSON.stringify(a)}`)
        // console.log(`mpls slug = ${a.slug} index = ${mplsI}`)
        if ( (typeof a !== 'undefined') && (m.slug == this.mpls[mplsI].slug )){
          return {'slug': m.slug, name: m.name, time_formatted: m.time_formatted}
        } else { // mpls slug not found
          return {'slug': "not found", name: "not found", time_formatted: "not found"}

        }
      },this)
      return data
    },
    filteredMpls: function(){
 var sortKey = "slug"//"day"//"time" //this.sortKey
      var filterKey = false //this.filterKey && this.filterKey.toLowerCase()
      var order = 1//this.sortOrders[sortKey] || 1
      var data = this.mpls
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
   //   debugger
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          if (a === b){
            a = a["time"]
            b = b["time"]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          } else {
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }
        })
      }
      return data
    },
    filteredIndex: function(){
      self = this;
      var indx = []
      this.meetings.forEach(function(m){
        if ((self.query == m.day) && (indx.length < 5)){
          indx.push(m._id)
        }
         
      })
    // debugger
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
  this.$helpers.getMpls(this)
  console.log("meetinglist created: meetings len= " + this.meetings.length)
  console.log("first meeting: " + JSON.stringify(this.meetings[0], null, 4))
       this.getMplsIndex()
    self = this;
    this.meetings.forEach(function(m){
      self.meetingObj[m._id] = m;  
      })

      // loadJSON(function(response) {
      //   // Parse JSON string into object
      //     self.mplsMeetings = JSON.parse(response);
      //   console.log("first mpls meeting: " + JSON.stringify(self.mplsMeetings[0], null, 4))
      // });

  },
    updated: function(){
   //   console.log("meetinglist updated")
   // debugger;
    self = this;
    this.meetings.forEach(function(m){
      self.meetingObj[m._id] = m;  
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.compare-container{
  display: flex;
}
.meeting-list-pairs span {
  margin-right: 5px;
  padding: 5px;
  border: 1px solid black;
  flex: 1;
}
.meeting-list-pairs {
  display: flex;
      justify-content: space-evenly;
  padding: 5px; 
  border: 1px solid grey; 
  margin: 5px;
  background: #fff; 
  text-align: left;
  list-style: none;
  font-size: 0.6em;
} 
.meeting-list-item { 
  padding: 5px; 
  border: 1px solid grey; 
  margin: 5px;
  background: #fff; 
  text-align: left;
  list-style: none;
  font-size: 0.6em;
  }
  .error  {background: pink;}
</style>
