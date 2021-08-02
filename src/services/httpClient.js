import axios from 'axios'

class HTTPClient {
  constructor () { 
    this.client = axios.create({
      baseURL: 'http://localhost:3000'
    })

    this.client.interceptors.request.use(this.requestInterceptor)
    this.client.interceptors.response.use(this.handleSuccess, this.handleError)
  }

  requestInterceptor (config) {
    return config
  }

  handleSuccess (response) {
    return response
  }

  handleError (error) {
    return Promise.reject(error)
  }

  get (url) {
    return this.client.get(url)
  }
}

export default new HTTPClient()