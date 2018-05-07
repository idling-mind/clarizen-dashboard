import axios from 'axios'

export default axios.create({
  baseURL: 'https://apie1.clarizen.com/v2.0/services/',
  timeout: 5000,
  async: true,
  crossdomain: true,
  headers: {
    'Authorization': 'Session e542abcb-db3b-4409-828d-6a1fa1622ac8_25446405'
  }
})
