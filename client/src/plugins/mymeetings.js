import MeetingsService from '@/services/MeetingsService'

// let myMeetings = {}

// myMeetings.install = function (Vue, options) {
//     // 1. add global method or property
//     Vue.fetchMeetings = function () {
//         async function getMeetings(){
//             console.log("fetching meetings.......")
//             const response = await MeetingsService.fetchMeetings()
//            return response.data
//          }
//         return getMeetings()
//         }
//   }

  //export default {myMeetings}

  export default {
    install: (Vue) => {
      Vue.prototype.$helpers = {
        arrayDifference(arrayA, arrayB) {
          (arrayA.length < arrayB.length) && (arrayB = [arrayA, arrayA = arrayB][0]);
  
          return arrayA.filter((x) => {
            return arrayB.indexOf(x) < 0;
          });
        },
        async getSomeMeetings(){
            debugger

            console.log("getSomeMeetings.........................")
            console.log("fetching meetings.......")
            let m = await MeetingsService.fetchMeetings()
            // .then(result => {
            //     return result.data
            // })
                
           
            // console.log("did fetch meetings " + response.data.length)
            // m = response.data
             return await m.data
        }
      };
    }
  };