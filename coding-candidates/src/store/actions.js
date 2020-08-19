import { login, saveToLocalStorage, cleanLocalStorage, loadLocalStorage, users } from "../commons/authentication/auth-request";
import router from "../router"
export default {
  signin: ({ commit }, payload) => {
    login(payload.userName, payload.password)
      .then(response => {
        //save data of current user in localstorage
        const { data } = response
        console.log('response from action:', data);
        saveToLocalStorage(data)
        commit('authenticationSuccess', data)
        //redirection to home page
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.log('Faild to authenticate:', err.response.data.error_description);
        commit('authenticationFaild', {
          isAuthenticated: false,
          faildMessage: err.response.data.error_description
        })
      })
  },
  signout: ({ commit }) => {
    commit('logout')
    cleanLocalStorage()
    router.push({ name: 'signin' })
  },
  initState: ({ commit }) => {
    const authData = loadLocalStorage()
    commit('initUser', authData)
    // il faut gerer l'expiration de token !!!
  },
  //test
  register: ({ commit, dispatch }, payload) => {
    const usersObject = users();
    usersObject.createUser(payload)
      .then(resp => {
        dispatch('getUsers')
      })
      .catch(err => {
        console.log('failed to create user', err);
      })
  },
  getUsers: ({ commit }) => {
    const usersObject = users();
    usersObject.ListUsers()
      .then(resp => {
        commit('users', resp)
      })
      .catch(err => {
        console.log('Faild to get users list:', err);
      })
  },
  updateCurrentPage: ({ commit }, payload) => {
    commit('currentPage', payload)
  },
  browsePage: ({ commit }, payload) => {
    const usersObject = users();
    usersObject.ListUsers(payload)
      .then(resp => {
        commit('users', resp)
      })
      .catch(err => {
        console.log('Faild to get users list:', err);
      })
  },
  deleteUser: ({ commit, dispatch }, payload) => {
    const usersObject = users();
    usersObject.deleteUser(payload)
      .then(resp => {
        commit('deleteUser', payload)
        dispatch('getUsers')
      })
      .catch(err => {
        console.log('Faild to delete users list:', err);
      })
  }
}
