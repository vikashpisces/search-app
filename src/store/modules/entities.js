export default {
  namespaced: true,
  state: {
    users: [],
    tickets: [],
    organizations: [],
  },
  mutations: {
    SAVE_USERS (state, users) {
      state.users = users
    },
    SAVE_TICKETS (state, tickets) {
      state.tickets = tickets
    },
    SAVE_ORG (state, organizations) {
      state.organizations = organizations
    },
  },
  actions: {
    saveUsers ({ commit }, users) {
      commit('SAVE_USERS', users)
    },
    saveTickets ({ commit }, tickets) {
      commit('SAVE_TICKETS', tickets)
    },
    saveOrganizations ({ commit }, organizations) {
      commit('SAVE_ORG', organizations)
    },
  }
}
