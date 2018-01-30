import AppState from './app-state'
import TopicStore from './topic-store'

export { AppState, TopicStore }

export default {
  AppState,
  TopicStore,
}

// 此函数就是给服务端渲染使用的
export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicStore: new TopicStore(),
  }
}
