import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

// 此函数就是给服务端渲染使用的
export const createStoreMap = () => {
  return {
    appState: new AppState(),
  }
}
