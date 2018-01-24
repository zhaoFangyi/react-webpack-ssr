import React from 'react'
import { StaticRouter } from 'react-router'
import { Provider, useStaticRendering } from 'mobx-react'

import App from './views/App'
import { createStoreMap } from './store/store'

// 让mobx在服务端渲染的时候不会重复数据变换
// 比如computed中的方法,在服务端渲染的时候，使用客户端的代码会有一个bug,会在一次渲染，导致我们的computed经常去执行
// 很多次数，而且改的变量比较多的时候，会造成重复引用，这样会导致内存溢出
useStaticRendering(true)

// stores 类似k-v形式的，{appState: xxx}
export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
