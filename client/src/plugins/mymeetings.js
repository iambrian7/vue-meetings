import MeetingsService from '@/services/MeetingsService'
 import mplsMeetings from '@/services/mplsMeetings'
//import MPLS from '@/data/mplsAll04082018.json'
//import * as MPLS from '/modules/my-module.js';
  export default {
    install: (Vue) => {
      Vue.prototype.$helpers = {
        arrayDifference(arrayA, arrayB) {
          (arrayA.length < arrayB.length) && (arrayB = [arrayA, arrayA = arrayB][0]);
  
          return arrayA.filter((x) => {
            return arrayB.indexOf(x) < 0;
          });
        },
       async getSomeMeetings(self){
            const response = await MeetingsService.fetchMeetings(
                {
                    miles: self.miles,
                    lat: self.lat,
                    lng: self.lng
                }
            )
            self.meetings = response.data
        },
        getMpls(self){
         // debugger
         // console.log("MPLS = " + JSON.stringify(mplsMeetings, null, 3))
          self.mpls = mplsMeetings //[{name: "hello mpls"}]
        }
      };
    }
  };