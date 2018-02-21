import MeetingsService from '@/services/MeetingsService'

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
        }
      };
    }
  };