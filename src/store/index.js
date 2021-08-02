import { createStore } from 'vuex'
import entities from './modules/entities'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    entities
  },
  strict: debug
})
  