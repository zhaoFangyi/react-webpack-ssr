import {
  observable,
  computed,
  action,
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'ZhaoFangYi' }) {
    this.count = count
    this.name = name
  }
  @observable count
  @observable name
  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }
  @action add() {
    this.count += 1
  }
  @action changeName(value) {
    this.name = value
  }
  // 服务端渲染之后的数据使用json格式拿到
  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}
