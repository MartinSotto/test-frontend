import { observable, computed } from 'mobx'

export default class AppState {
  @observable logged = false
  @computed get isLogged () {
    return this.logged
  }
  authenticate = (email = '', password = '') => {
    this.logged = (email === 'mail@mail.com' && password === '123123')
  }
}
