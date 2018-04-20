import Vue from 'vue'
import Router from 'vue-router'
import Auth from './utils/Auth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

Vue.use(Router);

// noinspection JSUnusedGlobalSymbols
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Dashboard/*, beforeEnter: requireAuth */},
    { path: '/login', component: Login },
    { path: '/logout', beforeEnter: logout },
    { path: '/restore-password' }
  ]
})

function logout (to, from, next) {
  Auth.logout();
  next('/')
}

function requireAuth (to, from, next) {
  if (!Auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}