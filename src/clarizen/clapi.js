import axios from 'axios'

export default axios.create({
  baseURL: 'https://apie1.clarizen.com/v2.0/services/',
  timeout: 5000,
  async: true,
  crossdomain: true,
  headers: {
    'Authorization': 'Session ee9b086e-6aba-4938-9b8a-34a36434f08a_25446405'
  }
})
