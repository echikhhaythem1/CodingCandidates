import axios from 'axios';
import qs from 'querystring';
import authHeader from './auth-header'
const apiUrl = 'http://localhost:55146/'
//let users = JSON.parse(localStorage.getItem('users')) || [];
const instance = axios.create({
  baseURL: apiUrl
});
instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
const login = (username, password) => {
  const requestData = qs.stringify({
    grant_type: 'password',
    username,
    password
  });
  return instance.post('/token', requestData)
    .then(response => {
      return response;
    })
}
const saveToLocalStorage = ({ access_token: token, expires_in: expireIn, userName }) => {
  localStorage.setItem('auth-user', JSON.stringify({
    token,
    expireIn,
    userName
  }))
}
const cleanLocalStorage = () => {
  localStorage.removeItem('auth-user')
}
const loadLocalStorage = () => {
  const authData = localStorage.getItem('auth-user')
  if (authData) {
    return JSON.parse(authData)
  }
  return null
}
const users = () => {
  return {
    Bearer: null,
    get Bearer () {
      return authHeader()
    },
    ListUsers (page = 0) {
      const authorizationHeader = this.Bearer
      return axios.get(`${apiUrl}api/accounts/users?page=${page}`, { headers: authorizationHeader })
        .then(response => {
          console.log('list of users:', response.data)
          return response.data
        })
    },
    deleteUser (userId) {
      const authorizationHeader = this.Bearer
      return axios.delete(`${apiUrl}api/accounts/user/${userId}`, { headers: authorizationHeader })
    },
    createUser (payload) {
      const authorizationHeader = this.Bearer
      return axios.post(`${apiUrl}api/accounts/${payload.action}`, payload, { headers: authorizationHeader })
        .then(response => {
          console.log('response:', response);
          return response;
        })
    }
  }
}
export {
  login, saveToLocalStorage, cleanLocalStorage, loadLocalStorage, candidat, users
}

