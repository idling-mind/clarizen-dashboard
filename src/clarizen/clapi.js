import axios from 'axios'

export default axios.create({
  baseURL: 'https://apie1.clarizen.com/v2.0/services/',
  timeout: 5000,
  async: true,
  crossdomain: true,
  headers: {
    'Authorization': 'Session 3c4ed5c3-f2d0-4a63-aa34-31be0507749c_25446405'
  }
})
