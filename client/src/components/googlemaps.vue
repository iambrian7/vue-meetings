<template>
<div id="googlemaps">
     <!--<button @click="addMarker">Add Marker</button> <span>locations from prop len = {{Object.keys(locations).length}}</span>-->
     <div class="hide">{{Object.keys(locations).length}}</div>
    <div style="height:100%; width:100%;">
        <div id="my-map">

        </div>
       
    </div>
</div>
</template>
<script>
     import { Bus } from '../main'
export default {
    props: ['locations'],
	data() {
		return {
            map : null,
            markers: [],
            lastInfoWindow: null
    }
  },
  methods: {
        initMap: function(){
            this.map = new google.maps.Map(document.getElementById('my-map'), {
            center: {lat: 44.9169913, lng: -93.4435269},
            zoom: 13
            });
            var self = this;

            google.maps.event.addListener(self.map, 'click', function(event) {
               // console.log("map clicked................... at : lnglat " + event.latlng)
                var mapZoom = self.map.getZoom();
                
                var startLocation = event.latLng;
               // console.log("zoom is " + mapZoom + " at " + startLocation)
            //   debugger
            //    var loc = {};

            // loc[0] = {
            //     location: 'hello location',
            //     address: '',
            //     city: '',
            //     state: '',
            //     postal_code: '',
            //     loc : {
            //         "type": "Point",
            //         "coordinates": [
            //         startLocation.lng(),
            //         startLocation.lat()
            //             ]
            //         }
            // }
         //   self.locations = loc
            self.$emit('clicked', startLocation)
               // setTimeout(placeMarker, 600);
            });

            function placeMarker() {
                if(mapZoom == self.map.getZoom()){
                    new google.maps.Marker({position: location, map: self.map});
                }
            }


        },
        newMarkerContent:function(meetings){
            var content = "";
            var days = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
            var day, dl;
            var meetingCount = 0;
        // add each meeting to the marker content
           for (var i=0; i<meetings.length; i++){
                var m = meetings[i]
                // add content for this meeting to this unique marker
                    if (m.day != day){
                        content = content.replace("%%cnt%%",meetingCount.toString())
                        meetingCount = 0;
                        if (day) content += "</dl>"
                        content += "<h5>" + days[m.day] + "  %%cnt%%" + " meetings </h5>";
                        content +="<dl>";// + "</dl>");
                        day = m.day;
                    }
                    content+="<dt>"+ m.time_formatted +"</dt>";
                    content+="<dd data-id=" + m.slug + ">"+ m.name +"</dd>";
                    meetingCount++;

            }
            content = content.replace("%%cnt%%",meetingCount.toString())
            if (day) content+="</dl>" // finish up last dl tag
        return content
        },
        makeNewMarkers:function(locations){
             // delete markers
            // debugger;
            // always delete all markers
            console.log("makeNewMarkers = " + locations)
            this.markers.forEach(function (m) {
                m.setMap(null);
            })
            this.markers = [];
            if (!locations) return; // no locations so remove all markers
            if (Object.keys(locations).length == 0) {
                console.log("no locations to mark")
                return;
            }
            console.log("locations for markers len = " + Object.keys(locations).length)
            this.markers.forEach(function (m) {
                m.setMap(null);
            })
            this.markers = [];
            for(var key in locations){
                var m = locations[key]
                var lat = m.loc.coordinates[1]
                var lng = m.loc.coordinates[0]
                var  myLatLng = { lat: lat * 1, lng: lng * 1}
                var latlng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    id: m.location_id,
                    animation: google.maps.Animation.DROP,
                    title: m.location
                });
                marker.content = '<h3>' + m.location + '</h3>' + "<div class='infoWin'>" +  m.address +
                '<br /> ' + m.city + ', MN ' + m.postal_code + '</div>';
                marker.content = marker.content + this.newMarkerContent(m.meetings);
                marker.content = "<div class='top-info-window'>" + marker.content + "</div>";
                google.maps.event.addListener(marker, 'click', (function (mark) {
                return function () {
                    if (this.lastInfoWindow)
                        this.lastInfoWindow.close();
                    else
                        this.lastInfoWindow = new google.maps.InfoWindow();
                    var infowindow = new google.maps.InfoWindow();
                    infowindow.setContent(mark.content);
                    infowindow.open(this.map, mark);
                    this.lastInfoWindow = infowindow;
                    }
                    })(marker));
        //    bounds.extend(latlng);
            this.markers.push(marker)
        }// end of locations
       
         var self = this;
         if (self.markers.length == 1){
            self.map.setCenter(this.markers[0].getPosition());
         } else {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < self.markers.length; i++) {
            bounds.extend(self.markers[i].getPosition());
            }
            self.map.fitBounds(bounds);
         }
          
         // must async this because the always goes into a loop if we don't
     //   setTimeout(function(){
            // var bounds = new google.maps.LatLngBounds();
            // for (var i = 0; i < self.markers.length; i++) {
            // bounds.extend(self.markers[i].getPosition());
            // }
            // self.map.fitBounds(bounds);
      //  },100)
        },
   },
   watch: {
   },
  computed: {
  },
  mounted: function(){
      var self = this;
      this.initMap();
      this.makeNewMarkers(this.locations);
  },
  updated:function(){
      this.makeNewMarkers(this.locations);
  }
}

</script>
<style>
    #googlemaps {width: 100%; height: 600px;}    
    #my-map {
        height: 100%; width: 100%;
        }
    .hide { display: none;}
        /* Optional: Makes the sample page fill the window. */
    dt {
        float: left;
        clear: left;
        margin-right: 5px;
        font-weight: bold;
        }
    dd {
        margin-left: 0px;
        }
    h5 { font-size: 1.2em; text-align: left;}
    .top-info-window {
        padding: 5px;
        background: #eee;
    }
    .gm-style-iw {padding: 0; margin: 0; border: 1px solid grey; background: #eee;}
    .infowin { background: yellow;}
</style>