const Helmet = require('react-helmet').default
const ReactDomServer = require('react-dom/server')
const ejs = require('ejs')

const serialize = require('serialize-javascript')

const SheetsRegistry = require('react-jss').SheetsRegistry
const colors = require('material-ui/colors')
const createMuiTheme = require('material-ui/styles').createMuiTheme
const create = require('jss').create
const preset = require('jss-preset-default').default
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default

const asyncBootstrap = require('react-async-bootstrapper').default


const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const user = req.session.user
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    
    const routerContext = {}
    const stores = createStoreMap()
    console.log(user)
    if (user) {
      stores.appState.user.isLogin = true
      stores.appState.user.info = user
    }
    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      }
    })
    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName

    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url)
    asyncBootstrap(app).then(() => {
      // 处理路由重定向
      if (routerContext.url) {
        console.log(routerContext)
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const content = ReactDomServer.renderToString(app)
      const html = ejs.render(template, {
        appString: content,
        initalState: serialize(getStoreState(stores)),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
        materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
