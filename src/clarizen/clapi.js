import axios from 'axios'

export default axios.create({
  baseURL: 'https://apie1.clarizen.com/v2.0/services/',
  timeout: 5000,
  async: true,
  crossdomain: true,
  headers: {
    'Authorization': 'Session 6c9f27e3-53ff-4cc4-b15d-35f02b4f07c3_25446405'
  }
})
