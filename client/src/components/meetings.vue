<template>
  <div class="meetings">
    <div class="aaflex-tools">
      <div class="aaflex-search meeting-tools-item">
        <button>Search</button>  <input type="text" @keyup.enter="geolocateCenter" v-model="searchInput" placeholder="enter new home location...">
      </div>
      <button @click="options = !options" class=" meeting-tools-item">Options</button>
      <div class="aaflex-tools-miles meeting-tools-item">
          <button @click="mileMax = 2" :class="{ active: mileMax == 2 }">Mile 2</button>
          <button @click="mileMax = 5" :class="{ active: mileMax == 5 }">Mile 5</button>
          <button @click="mileMax = 10" :class="{ active: mileMax == 10 }">Mile 10</button>
          <button @click="mileMax = 20" :class="{ active: mileMax == 20 }">Mile 20</button>
      </div>
      <div class="aaflex-tools-days meeting-tools-item">
         <button @click="day=0" :class="{ active: day == 0 }">Sun</button>
          <button @click="day=1" :class="{ active: day == 1 }">Mon</button>
          <button @click="day=2" :class="{ active: day == 2 }">Tue</button>
          <button @click="day=3" :class="{ active: day == 3 }">Wed</button>
          <button @click="day=4" :class="{ active: day == 4 }">Thr</button>
          <button @click="day=5" :class="{ active: day == 5 }">Fri</button>
          <button @click="day=6" :class="{ active: day == 6 }">Sat</button>
          <button @click="day=7" :class="{ active: day == 7 }">All</button>
      </div>
     <div class="aaflex-options meeting-tools-item" v-if="options">
       <input type="radio" id="all" value="" v-model="picked"><label for="all">All</label>
       <input type="radio" id="both" value="MW" v-model="picked"><label for="both">Men/Women</label>
       <input type="radio" id="one" value="M" v-model="picked"><label for="one">Men</label>
       <input type="radio" id="two" value="W" v-model="picked"><label for="two">Women</label>
        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
     </div>
     
    </div><!-- end tools -->
    <div class="meeting-list-info">
        <span>{{ filteredMeetings.length }} meetings found within {{mileMax}} of {{baselocation}} </span>
      </div> 
   <div class="aaflex-container">
    
      <div class="aaflex-list item">
        <meeting-list :meetings="filteredMeetings"></meeting-list>
        <!-- <p>Meetings found: {{ filteredMeetings.length }}</p>
        <ol>
          <li
            v-for="(a, index) in filteredMeetings" 
            class='acct-todo-item' 
            v-bind:data-key='a.name'
            > {{ a.name }}
              </li>
        </ol> -->

      </div>
      <div class="aaflex-map item">
        <google-map :locations="newlocations"></google-map>
      </div>
   </div>
    
  </div>
</template>

<script>
  // geolocate function
  function aalinksGeolocateLatLng(latlng,callback){
var geocoder = new google.maps.Geocoder();
//debugger
    var obj = {};
    geocoder.geocode({'location': latlng}, function(results, status) {
  //  geocoder.geocode({ 'address': search }, function (results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                  console.log(results[0].geometry.location.lat());
                //   Aalinks.coords = position.coords;
                obj.lat = results[0].geometry.location.lat()
                obj.lng = results[0].geometry.location.lng()
      
                obj.formatted_address = results[0].formatted_address;
                  console.log('load map at ' +  obj.formatted_address);
                  callback(obj)
                return obj;
              }
              return null;
          }); // end of geocode 

}


function aalinksGeolocate(search,callback){
var geocoder = new google.maps.Geocoder();
    var obj = {};
    geocoder.geocode({ 'address': search }, function (results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                  console.log(results[0].geometry.location.lat());
                //   Aalinks.coords = position.coords;
                obj.lat = results[0].geometry.location.lat()
                obj.lng = results[0].geometry.location.lng()
      
                obj.formatted_address = results[0].formatted_address;
                  console.log('load map at ' +  obj.formatted_address);
                  callback(obj)
                return obj;
              }
              return null;
          }); // end of geocode 

}


//var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    //    geocoder.geocode({'location': latlng}, function(results, status) {


  import GoogleMap from '@/components/googlemaps'
  import MeetingList from '@/components/meetinglist'
  import ToolsTest from '@/components/tooltest'
    import { Bus } from '../main'
export default {
  name: 'meetings',
  props: ["meetings","lat","lng"],
  components: {
    "google-map": GoogleMap,
    "tools-test": ToolsTest,
    "meeting-list": MeetingList
  },
  data () {
    return {
      msg: 'Welcome to meetings',
      baselocation: "",
      meetingOptions: {
        picked: "", // default to all meetings
        mileMax: 2,
        day: 0,
        selected: '',
      },
      options: false,
      picked: "", // default to all meetings
      mileMax: 2,
      day: new Date().getDay(),
      selected: '',
   //    lat: 44.9169,
    //  lng: -93.4450,
      home: {lat:44.9270729,lng:-93.4479148},
      isActive: true,
      allMeetings: false,
      searchInput: '',
      newlocations: {}
    }
  },
  methods: {
    mileLimit: function(m){
      return (this.mileMax > this.distance(this.lat,this.lng,m.loc.coordinates[1],m.loc.coordinates[0])) 
    },
    daycut: function(m){
      if (this.day == 7) return true; // just return all days
      return (this.day == m.day) 
    },
    distance: function(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var radlon1 = Math.PI * lon1 / 180;
      var radlon2 = Math.PI * lon2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') { dist = dist * 1.609344 };
      if (unit === 'N') { dist = dist * 0.8684 };
      return dist;
    },
    geolocateCenter(){
               //  var el = document.querySelector(".search-input-error")
               console.log("searching.........." + this.searchInput);
             //  return;


                if (Number.isInteger(this.searchInput)*1) {
                    console.log("address is not valid...........")
                   
                   // el.classList.remove("hide")
                    return;
                }
              //  el.classList.add("hide")
                var self = this;
                var aalocated = aalinksGeolocate(self.searchInput,function(data){
                    console.log("uitil located at: " + JSON.stringify(data))
                   self.lat = data.lat;
                   self.lng = data.lng;
                    // console.log("entered: " + self.searchInput.value)
                    // console.log('get my location called');
                    self.searchInput = "";
                  //  self.searchInput.placeholder = "enter new home location..."
                    self.baselocation = data.formatted_address;
                   // document.querySelector("holy-header span").innerHTML = data.formatted_address;
                   // self.getMongoMeetings();// this will dispatch the new meetings (this.displaynewmeetings)
                })
            },
            getAddressFromLatLng: function(){
              var self = this
               // geocoder.geocode({'location': latlng}, function(results, status) {
              var latlng = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};
                 
              aalinksGeolocateLatLng(latlng,function(data){
                    console.log("latlng located at: " + JSON.stringify(data.formatted_address))
                    self.baselocation = data.formatted_address;
              });
            }
  },
  computed: {
    filteredMeetings: function(){
    var self = this;

       var newMeetings = this.meetings.filter(function(m){
           return ((self.mileLimit(m)) &&
                    (self.day == 7 || self.day == m.day) &&
                   (!self.picked || m.types.includes(self.picked))
                    )
        })
      newMeetings.sort(function (a, b) {
        // ******************** first sort days
        var nameA = a.day;
        var nameB = b.day;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // *********************now sort times 
        nameA = a.time
        nameB = b.time
         if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

        var loc = {};
        newMeetings.forEach(function(m){
                if (!loc[m.location_id]){
                    loc[m.location_id] = {
                      location: m.location,
                      address: m.address,
                      city: m.city,
                      state: m.state,
                      postal_code: m.postal_code,
                      loc : m.loc,
                      meetings: []
                    } // add this location data 
                 }
                var meeting = {
                  name: m.name,
                  slug: m.slug,
                  day : m.day,
                  time : m.time,
                  time_formatted: m.time_formatted,
                  types: m.types,
                  id: m.id
                }
                loc[m.location_id].meetings.push(meeting) 
        })// end of newMeetings forEach
  
        this.newlocations = loc; // should pass the locations to the googlemap component
        
     return newMeetings;
    },
  },
  created(){
      console.log("created meetings..........")
     // debugger
      this.getAddressFromLatLng();
    //  this.mileMax = 40;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meetings { width: 100wh; height: 100vh; background: #ccc;
padding: 0; margin: 0;}
.aaflex-container {display: flex; align-content: flex-start; width: 100%}
.aaflex-options { width: 100%; padding: 5px; background:  #388abd;}
.aaflex-tools {display: flex; justify-content: space-around;padding: 10px;
    background: #388abd;}
    .aaflex-search {}
.aaflex-tools-miles {flex: 2}
.aaflex-tools-days {flex: 2}
.aaflex-list { flex: 0 0 300px; background: yellow; overflow: scroll;}
.aaflex-map { flex:1 0 auto; background: #6cffbc;}
.item {height: 90vh;}
.active {background: #6cffbc;}
/* .meeting-tools-item { min-width: 800px;} */
.meeting-list-info {display: flex; justify-content: space-around; border: 1px solid black; margin: 10px; 
    background: #6cffbc; border-radius: 5px; font-size: 16px;}
.meeting-list-info span {}
 #accts-todo-container { display: flex; justify-content: space-around;}
        .accts-list { padding: 10px; border: 1px solid grey; flex: 1; background: #666;}
        .accts-list h3 {border-bottom: 1px solid red; margin: 5px; background: #aaa; text-align: center;}
        .acct-todo-item { padding: 5px; border: 1px solid grey; margin: 5px; background: #fff; text-align: left;}
        .accts-todo-header {padding: 5px; font-size: 2.0em; background: #ddd; display: flex;}
        #accts-todo-date {padding: 5px; font-size: 0.6em; flex: 0 0 200px; color: red;}
        .due {background:#fd9d9d;}
</style>
