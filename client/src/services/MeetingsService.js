import Api from '@/services/Api'

export default {
  fetchMeetings () {
    return Api().get('meetings')
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
