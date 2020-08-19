import Vue from "vue"
export default {
  authenticationFaild: (state, payload) => {
    Vue.set(state, 'isAuthenticated', payload.isAuthenticated)
    Vue.set(state, 'authenticationFaildMessage', payload.faildMessage)
  },
  authenticationSuccess (state, payload) {
    Vue.set(state, 'token', payload.access_token)
    Vue.set(state, 'expireIn', payload.expires_in)
    Vue.set(state, 'userName', payload.userName)
    Vue.set(state, 'isAuthenticated', true)
    Vue.set(state, 'authenticationFaildMessage', null)
  },
  logout (state) {
    Vue.set(state, 'token', null)
    Vue.set(state, 'expireIn', null)
    Vue.set(state, 'userName', null)
    Vue.set(state, 'isAuthenticated', false)
    Vue.set(state, 'authenticationFaildMessage', null)
  },
  initUser (state, payload) {
    if (payload && payload.token) {
      Vue.set(state, 'token', payload.token)
      Vue.set(state, 'expireIn', payload.expireIn)
      Vue.set(state, 'userName', payload.userName)
      Vue.set(state, 'isAuthenticated', true)
      Vue.set(state, 'authenticationFaildMessage', null)
    }
  },
  users (state, payload) {
    const users = payload.users.map(x => {
      x.typeOfUser = x.isAdministrator ? 'Administrateur' : 'Candidat'
      return x
    })
    Vue.set(state, 'users', users)
    Vue.set(state, 'links', payload.links)
    Vue.set(state.pagination, 'page', payload.currentPage + 1)
    Vue.set(state.pagination, 'rowsPerPage', payload.rowsPerPage)
    Vue.set(state.pagination, 'totalItems', payload.totalCount)
    Vue.set(state, 'totalPages', payload.totalPages)
  },
  currentPage (state, payload) {
    state.pagination.page = payload
  },
  setPagination (state, payload) {
    console.log('setPagination:', payload)
    state.pagination = payload
  },
  deleteUser (state, payload) {
    state.users.splice(payload, 1)
  }
}
