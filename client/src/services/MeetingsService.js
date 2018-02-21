import Api from '@/services/Api'

export default {
  fetchMeetings (params) {
  //  lat: 44.9169,
   //   lng: -93.4450,
   // /?miles=40&lat=0.00000&lng=0.00000
  // return Api().get('meetings/?miles=10&lat=44.9169&lng=-93.4450')
  console.log("............fetch Meetings params = " + JSON.stringify(params))
   return Api().get('meetings/?miles='+params.miles+'&lat='+params.lat+'&lng='+params.lng)
    //return Api().get('meetings')
  },

  addMeeting (params) {
    return Api().post('add_meeting', params)
  },

  updateMeeting (params) {
    return Api().put('meeting/' + params.id, params)
  },

  getMeeting (params) {
    return Api().get('meeting/' + params.id)
  },

  deleteMeeting (id) {
    return Api().delete('meeting/' + id)
  }
}
