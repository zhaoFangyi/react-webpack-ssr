import {
  observable,
  computed,
  autorun,
  action,
} from 'mobx'

export class AppState {
  @observable count = 0
  @observable name = 'ZhaoFangYi'
  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }
  @action add() {
    this.count += 1
  }
}

const appState = new AppState()

// autorun(() => {
//   console.log(appState.msg)
// })
setInterval(() => {
  appState.add()
}, 1000)

export default appState
