import { createStore } from 'vuex'
import userSearch from './modules/userSearch'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    userSearch
  },
  strict: debug
})

export default store