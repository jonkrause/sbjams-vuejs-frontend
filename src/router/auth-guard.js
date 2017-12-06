import { store } from '../store'
export default (to, from, next) => {
  if (store.getters.thisUser !== null) {
    next()
  } else {
    next('/signin')
  }
}