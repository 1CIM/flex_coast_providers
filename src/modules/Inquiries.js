import axios from 'axios'
import store from '../state/store/configureStore'

const Inquiries = {
  async index() {
    try {
      let response = await axios.get('/inquiries')
      setInquiries(response)
    } catch (error) {}
  },
  async update(id, status, setInquiryStatus) {
    let params = { inquiry: { status_action: status } }
    try {
      await axios.put(`/inquiries/${id}`, params, { headers: getHeaders() })

      setInquiryStatus(status)
      try {
        let response = await axios.get('/inquiries')
        setInquiries(response)
      } catch (error) {}
    } catch (error) {
      store.dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: 'Something went wrong, Please try again later',
      })
    }
  },

  async createNote(id, noteInput) {
    debugger
    let params = { note: { body: noteInput } }
    try {
      let response = await axios.post(`/inquiries/${id}/notes`, params, {
        headers: getHeaders(),
      })
      try {
        let response = await axios.get('/inquiries')
        setInquiries(response)
      } catch (error) {}
    } catch (error) {
      store.dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: 'Something went wrong, Please try again later',
      })
    }
  },
}

export default Inquiries

const setInquiries = (response) => {
  store.dispatch({
    type: 'SET_INQUIRIES',
    payload: response.data.inquiries,
  })
}

const getHeaders = () => {
  return JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
}
