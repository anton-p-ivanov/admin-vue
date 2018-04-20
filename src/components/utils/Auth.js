/* globals localStorage */
import axios from 'axios';

export default {
  login (email, pass, callback) {
    if (this.getToken()) {
      if (callback) {
        callback(true);
      }

      this.onChange(true);

      return;
    }

    axios.post(`http://backend.web.host/auth/token`, {})
      .then(response => { console.log(response) })
      .catch(errors => { console.log(errors) })

    // pretendRequest(email, pass, (res) => {
      // if (res.authenticated) {
      //   localStorage.token = res.token;
      //   if (cb) cb(true);
      //   this.onChange(true)
      // } else {
      //   if (cb) cb(false);
      //   this.onChange(false)
      // }
    // })
  },

  setToken (token) {
    localStorage.token = token;
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

function pretendRequest (email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}