<template>
  <div class="add-meeting">
    <div id="add-intro">
            <div class="left-intro">
                <h2>Adding a meeting is a multi-step process. </h2>
                <ul class="list-unstyled">
                    <li v-bind:class="state == 1 ? 'intro-active' : ''">Determine location for meetings</li>
                    <li  v-bind:class="state == 2 ? 'intro-active' : ''">Choose name and details</li>
                    <li v-bind:class="state == 3 ? 'intro-active' : ''">Add contact information for all meetings added</li>
                </ul>
               <div class="row col-md-12">  <button @click="back" v-if="state > 1" class="btn btn-success">Back</button><button @click="checkState" class="btn btn-success">Next</button></div>
            </div>
            <div class="right-intro">
                <div id="step1-intro" class="step-intro"v-if="state == 1">
                    There are many ways to add location information:
                    <ul>
                        <li>Try enter an address and click "Get Address". This will fill out as much information as we can get. An address can be just a city, state or zip code </li>
                        <li>Enter each space in the address form</li>
                        <li>Scroll the map to the desited location and click. The latitude and longitude will be filled out in the form.</li>
                        <li></li>
                    </ul> 
                </div>
                <div id="step2-intro" class="step-intro"v-if="state == 2">
                    <div v-if='state > 1' class="location-summary row ">
                         <div class="col-md-12 "> 
                             <div class="selected-locations">
                                 Location Selected: 
                                 <div class="info">
                                    {{newmeeting.location.location_name}} <br>
                                    {{newmeeting.location.street}}<br>
                                    {{newmeeting.location.city}} , {{newmeeting.location.state}}  {{newmeeting.location.zip}}
                                </div>
                                 <!-- <dl class="dl-horizontal">
                                    <dt>Location</dt><dd>{{formAddress.location}}</dd>
                                    <dt>Address</dt><dd>{{formAddress.address}}  {{formAddress.city}}  {{formAddress.state}}  {{formAddress.postal_code}}</dd>
                                    <dt>Geo Location</dt><dd>Latitude: {{formAddress.lat.toFixed(2)}} Longitude: {{formAddress.lng.toFixed(2)}}</dd> 
                                </dl> -->
                             </div>
                            <!-- <div class="panel panel-default">
                                <div class="panel-heading">You have selected this location</div>
                                <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Location</dt><dd>{{formAddress.location}}</dd>
                                    <dt>Address</dt><dd>{{formAddress.address}}  {{formAddress.city}}  {{formAddress.state}}  {{formAddress.postal_code}}</dd>
                                    <dt>Geo Location</dt><dd>Latitude: {{formAddress.lat.toFixed(2)}} Longitude: {{formAddress.lng.toFixed(2)}}</dd> 
                                </dl>
                                </div>
                            </div> -->
                         </div> 
                    </div><!-- location-summary end -->
                    Add meeting name, time, day and other options
                </div>
                <div id="step3-intro" class="step-intro"v-if="state == 3">
                    Add contact info here 
                </div>
                
            </div>
    </div>
<div class="location-details"  v-if="state == 1">
    <div class="enter-address">
            <input v-model="newmeeting.location.mapped_address" @keyup:enter="getLocation" id="address" type="text" placeholder="Enter address here" />
            <button @click="getLocation">Get Address</button> <div class="info">Enter part of an address and we will fill in what we can. Can use just zip or city, state </div>
    </div>
   
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 form-background">       
                <div class="container">
                    <add-meetingselect  v-if="state == 1" :formAddress="newmeeting.location" :snapit='snap'></add-meetingselect>
                    <!-- <mapped-select v-if="state == 1" :mappedAddress="mappedAddress"></mapped-select> -->
                </div>
                <!-- <input type="button" value="Checkmap" @click="checkMap"/> -->
                <div class="map-error" v-if="addressError">Location form is not valid</div>
            </div>
            <div class="col-md-6">
                    <google-map :locations="newlocations" @clicked="onClickMap"></google-map>
            </div>
        </div>
    </div>
</div> <!-- location-details end -->
        
<add-meetingdetails v-if="state == 2" @newMeeting="onNewMeeting" :group="newmeeting.group"></add-meetingdetails>

<contact v-if="state == 3" :info = "newmeeting.contact"></contact>
   
</div> <!-- end of template div -->

</template>

<script>
function parseGeoCoderResult(result,location){
    console.log("outsideFunction: " + JSON.stringify(result, null, 4))
   
   // var formattedAddress = {}
    location.lat = result.geometry.location.lat();
    location.lng = result.geometry.location.lng();
     if (result.formatted_address){
        location.mapped_address = result.formatted_address
        console.log("parseGeoCoderResult: formatted address found: " + result.formatted_address)
        console.log("parseGeoCoderResult: formatted address found: " + location.formatted_address)
       // return formattedAddress
    }
    var a = result.address_components;
    var keys = {street_number:'street',route: 'street_name', locality:'city',administrative_area_level_1:'state',postal_code:'zip'}
    var parts = {}
//  debugger;
    a.forEach((x) => {
       // console.log("x=" + JSON.stringify(x, null, 3))
        var key = x.types[0]
        if (key == 'route'){
            location.street += " " + x.short_name
        }else{
            parts[key] = x.short_name
            var xxk = keys[key]
            console.log(`key found: ${key} --- found: ${xxk}`)
            if (xxk){
                location[xxk] = x.short_name
            }
           
        }
    
        })
        console.log("parseGeoCoderResult:  ended::::::::::formatted address found: " + JSON.stringify(location, null, 4))
    return
}
 import GoogleMap from '@/components/googlemaps'
 import Contact from "./contact.vue"
 import AddMeetingDetails from "./addmeetingdetails.vue"
 import AddMeetingSelect from "./addmeetingselect.vue"
 import AddMapped from "./addMappedLocation.vue"
export default {
  name: 'add-meeting',
  components: {
    // <my-component> will only be available in parent's template
    'contact': Contact, "google-map": GoogleMap, "add-meetingdetails": AddMeetingDetails, "add-meetingselect": AddMeetingSelect, "mapped-select": AddMapped
  },
  data () {
    return {
      msg: 'Add a meeting',
    //  mappedAddress: {formatted_address: null},
      address: '',
      addressError: false,
    //   formAddress: {
    //       location: "",
    //      address: "",
    //       city: "",
    //        state: "",
    //         zip: "",
    //         lat: "",
    //         lng: "",
    //         comments: ""
    //   },
      result: null,
      lat: '',
      lng: '',
      newmeeting: {
          location: {
            location_name: "",
            mapped_address: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            lat: "",
            lng: "",
            location_comments: "",
            },
        group: {
            group_name: "new group",
            day: '1',
            time:'7:00 PM',
            type: 'Open',
            gender: 'Men/Women',
            format: 'Big Book',
            },
        contact: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: ""
        }
      },
      newlocations: {},
      state: 1,
      selectedMeetings: []
    }
  },
  methods: {
    onNewMeeting(value){
        console.log(`onNewMeeting: ${JSON.stringify(value, null, 4)}`)
    },
    onClickMap (value) {
      console.log("from addmeeting.vue: map clicked at: " + value.lat() + " : " + value.lng()) // someValue
    var latlng = {lat: parseFloat( value.lat()), lng: parseFloat( value.lng())};
    this.googleGeocoder({'location': latlng})
    },
      snap(text){
        console.log("snap in parent.......")
      },
      checkMap: function(){
        //  debugger;
          this.addressError = false;
          //var a = this.formAddress;
          var a = this.newmeeting.location;
          this.address = a.street + ", " + a.city + ", " + a.state + ", "+ a.zip;
        this.getLocation();
      },
      back: function(){
        if (this.state > 1){
            this.state = this.state-1;
            return;
        }
        //if (this.state )
      },
      checkState: function(){
        // debugger;
          var self = this;
        if (this.state == 1){
            // this.$validator.validateAll();
             this.$children[0].$validator.validateAll().then(function(success) {
             if (!success) return;
            self.state = 2;      
       // alert("All good")
      })
        } else {
            if (this.state == 2){
                this.state = 3;
            }
        }
      },
      googleGeocoder: function(location){
        {
            var self = this
            console.dir("googleGeocoder: location = " + JSON.stringify(location, null, 4))
            var geocoder = new google.maps.Geocoder();
            if (geocoder) {
                geocoder.geocode(location, function (results, status) {
                    //debugger
                    if (status == google.maps.GeocoderStatus.OK) {
                        self.showResult(results[0])
                    } else {
                        console.log("GeocodeStatus is not ok ......." + status)
                        self.showResult(null)
                    }
                    });
                }
        }
      },
      getLocation: function(){ // get address from form input 
          console.log("address = " + this.address)
          if (!this.address){
              // no address entered so we will use the form
              var createdAddress = `${this.newmeeting.location.city} , ${this.newmeeting.location.state} ${this.newmeeting.location.zip}`
              console.log("createdAddress = " + createdAddress)
              this.address = createdAddress
          }
          this.googleGeocoder({address: this.address})
      },
      showResult: function(result){
         // debugger
          if (!result){
            this.addressError = true  
            this.newlocations = null
            return;
          } 
         // debugger
        //  this.mappedAddress = parseGeoCoderResult(result)
        parseGeoCoderResult(result, this.newmeeting.location)
        console.dir("googleGeocoder: this.newmeeting.location.mapped_address = " + JSON.stringify(this.newmeeting.location.mapped_address, null, 4))
        this.address = this.newmeeting.location.mapped_address
        this.$children[0].$validator.errors.clear()
        //   Object.keys(this.newmeeting.location).forEach((k) => {
        //       this.newmeeting.location[k] = '';
        //   })
    //     this.lat = result.geometry.location.lat();
    //     this.lng = result.geometry.location.lng();
    //      var a = result.address_components;
    //      var keys = {street_number:'street',locality:'city',administrative_area_level_1:'state',postal_code:'zip'}
    //      var parts = {}
    //    //  debugger;
    //      a.forEach((x) => {
    //          console.log("x=" + JSON.stringify(x, null, 3))
    //          var key = x.types[0]
    //          if (key == 'route'){
    //             this.newmeeting.location.street += " " + x.short_name
    //          }else{
    //             parts[key] = x.short_name
    //             var xxk = keys[key]
    //             this.newmeeting.location[xxk] = x.short_name
    //          }
            
    //          })
    //          this.newmeeting.location.lat = this.lat
    //           this.newmeeting.location.lng = this.lng
           
          // this.$set(this.formAddress, 'location', "Enter place name....")
             // this.formAddress.location = 'hello after result'
       //  console.log("parts=" + JSON.stringify(parts, null, 3))
         console.log("newmeeting.location =" + JSON.stringify(this.newmeeting.location, null, 3))

         //this.formAddress.street = a.filter( x=> x.types.contains(""))
        //  this.formAddress = {
        //              street: a[0].short_name + a[1].short_name,
        //              city: a[2].short_name,
        //              state: a[4].short_name,
        //              zip: a[6].short_name,
        //              lat:  this.lat,
        //              lng:  this.lng
        //          }

        ///////////  add a location to result   /////////////////////
           // debugger;
        //  var loc = {};
        // loc[0] = {
        //     location: 'hello location',
        //     address: this.formAddress.street,
        //     city: this.formAddress.city,
        //     state: this.formAddress.state,
        //     postal_code: this.formAddress.zip,
        //     loc : {
        //         "type": "Point",
        //         "coordinates": [
        //            this.formAddress.lng,
        //            this.formAddress.lat
        //         ]
        //     },
        //     meetings: []
        // } // add this location data 
        // this.newlocations = loc
        // console.log("formAddress = " + JSON.stringify(this.formAddress, null, 3))
        this.$nextTick(function () {
                console.log("next tick validating") // => 'updated'
                 this.$validator.validateAll();
          })
       
     //   this.address = '';
      },
        getLatitudeLongitude: (callback, address)  => {
            var self = this;
            debugger
        // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
        var address = address || '12913 Pioneer Rd., Minnetonka, MN';
        console.log("check map address........ = " + address)
        // Initialize the Geocoder
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                 //   debugger;
                
                 console.log("results[0] = " + JSON.stringify(results[0], null, 3))
                
                   // self.result = results[0];
                    callback(results[0]);
                } else {
                    debugger;
                    console.log("GeocodeStatus is not ok ......." + status)
                    callback(null);
                   // self.result = null;
                   // self.addressError = true;
                }
             });
            }
        }// end of getLatitudeLongitude
  }// end of methods
}
</script>
// function showResult(result) {
//     document.getElementById('latitude').value = result.geometry.location.lat();
//     document.getElementById('longitude').value = result.geometry.location.lng();
// }

// function getLatitudeLongitude(callback, address) {
//     // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
//     address = address || 'Ferrol, Galicia, Spain';
//     // Initialize the Geocoder
//     geocoder = new google.maps.Geocoder();
//     if (geocoder) {
//         geocoder.geocode({
//             'address': address
//         }, function (results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 callback(results[0]);
//             }
//         });
//     }
// }

// var button = document.getElementById('btn');

// button.addEventListener("click", function () {
//     var address = document.getElementById('address').value;
//     getLatitudeLongitude(showResult, address)
// });

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .location-summary { margin: 20px auto; font-size: 1.2em; background: #ccc;}
    .location-summary .panel {margin: 10px;}
.form-background { background: #ccc;}
#add-intro {border: 1px solid black; background: #ccc; padding: 10px; margin: 10px; height: 300px; display: flex; }
#add-intro row, #add-intro col-md-8 {height: 100%}
    .left-intro li {border: 1px solid #aaa; background: #ccc;}
    .intro-active {border: 2px solid green !important;}
    .enter-address {margin: 10px; padding: 10px; border: 1px solid grey; border-radius: 5px; background: #ccc;}
    .enter-address input {min-width: 400px;}
.step-intro {background: #fff; padding: 10px 20px 10px 10px; height: 100%;}
.left-intro {flex: 1; min-width: 400px;}
.right-intro {flex: 3; overflow-y:  scroll;}
.info {margin: 10px; padding: 10px; background: #999; font-size: 1.2vw;}
.map-error {height: 50px; background: red; font-size: 1.2em; border: 1px solid black; border-radius: 5px; padding: 10px;}
</style>
