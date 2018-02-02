# react-webpack-ssr
## 启动生产环境项目
> git clone ...
> npm run build && npm start
## 启动开发环境

客户端 
> 访问locolhost:8888
> npm run dev:client

服务端 
> 访问localhost:3333
> npm run dev:server

### babel--webpack
1. babel-preset-es2015-loose:
	
	> Babel 有两种模式：
	>> 尽可能符合 ES6 语义的 normal 模式。
	
	>> 提供更简单 ES5 代码的 loose 模式。
	
	为了兼容更低版本的浏览器
	
2. html-webpack-plugin
	> 作用：
	+ 	为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题;
	+  可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

3. react中如何使用服务端渲染

	react-dom 是React专门为web端开发的渲染工具。我们可以在客户端使用react-dom的render方法渲染组件，而在服务端，react-dom/server 提供我们将react组件渲染成HTML的方法
	> 有两个神奇的React API都可以实现React服务器渲染：renderToString和renderToStaticMarkup。
	
	1. renderToString：将React Component转化为HTML字符串，生成的HTML的DOM会带有额外属性：各个DOM会有data-react-id属性，第一个DOM会有data-checksum属性。
	2. renderToStaticMarkup：同样是将React Component转化为HTML字符串，但是生成HTML的DOM不会有额外属性，从而节省HTML字符串的大小。
	
3.  常用配置：

	> webpack dev server
	
	> Hot module replacement	
	
### 使用nodemon对node服务端代码的修改自动重启
[github地址](https://github.com/remy/nodemon)
在根目录下面创建文件nodemon.json，配置文件

```
	{
	  "restartable": "rs",
	  "ignore": [
	    ".git",
	    "node_modules/**/node_modules",
	    ".eslintrc",
	    "client",
	    "build"
	  ],
	  "verbose": true,
	  "ext": "js",
	  "env": {
	    "NODE_ENV": "development"
	  }
	}

```	
> restartable: 重启的命令，默认是rs，这是这个时候才可以自动重启；

> verbose: true 表示输出详细启动与重启信息

> ext：监控指定后缀名的文件，用空格间隔。默认监控的后缀文件：.js, .coffee, .litcoffee, .json。但是对于没有文件后缀的文件，比如 www 文件，我暂时找不到怎么用 nodemon 去监控，就算在 watch 中包含了，nodemon 也会忽略掉。

> env：运行环境 development 是开发环境，production 是生产环境。port 是端口号。

在packjson中的script配置启动服务：
> "dev:server": "nodemon server/server.js",

	### mobX 状态管理
	1. Mobx 是flux实现的后起之秀，其以更简单的使用和更少的概念，让flux使用起来变得更加简单，相比Redux 有mutation、action/dispatch等概念，Mobx则更符合对一个store增删改的操作概念
	2. 环境配置--mobx使用的是ES7的装饰器，需要配置下 在.babelrc中加入
	 
	 ```
	 {
	  "presets": [
	    ["es2015", {"loose": true}],
	    "stage-1", // new
	    "react"
	  ],
	  "plugins": [
	  	"transform-decorators-legacy", // new-->一定要放在plugins第一项
	  	"react-hot-loader/babel"
	  	]
	}
	 ```
	 
	 > npm i babel-plugin-transform-decorators-legacy babel-preset-stage-1 -D 

	3. 创建store下的app-state.js,使用mobx的api(observable,computed,autorun,action)
		
		> 引用创建的store，在app.js中，使用连接器mobx-react中的Provider
		
		```
		import {Provider} from 'mobx-react'
		
		import appState from './store/app-state'
		<Provider appState={appState}> // 使用Provider包住，注入appState
		``` 
	4. 在应用中使用：
	
		```
		import { inject, observer } from 'mobx-react'
		@inject('appState') @observer // inject 注入需要的store
		// 之后可以直接使用this.props.appState.xxx 来访问store中数据
		```
		
	5. eslint会报错，
	
		```
		Module build failed: TypeError: Cannot read property 'type' of undefined
    at isForInRef (/Users/zhaofangyi/fangyi/react/webpack-react-muke/project/u2cmyw/node_modules/eslint/lib/rules/no-unused-vars.js:406:24)
    ```
    		
		> "no-unused-vars": "off",	加入eslint中
	6. eslint 还回报一个prop-type的错误，这里借助工具库‘prop-types’
	
		```
		import PropTypes from 'prop-types'
		TopicList.propTypes = {
  			appState: PropTypes.instanceOf(AppState),
		}
		```	
		
		eslint会有一个requiered的错误，
		
		> "react/require-default-props": [0]
		

### 使用cnode 提供接口
1. 对url请求进行转化，在express中接入session

	```
	const bodyParser = require('body-parser')
	const session = require('express-session')
	// 使用parser 对请求处理，将application请求的数据转化成req.body上面的数据
	app.use(bodyParser.json())
	// 请求url上application/x-www-form-urlencoded请求的不同类型转化为req.body上的数据
	app.use(bodyParser.urlencoded({ extended: false}))
	// 启用session
	app.use(session({
	  maxAge: 10 * 60 * 1000,
	  name: 'tid',
	  resave: false,
	  saveUninitialized: false,
	  secret: 'react cnode class'
	}))

	```		
2. 对登录请求，存入session，创建文件handle-login.js
3. 对所有请求，校验session，创建文件proxy.js
4. 在server.js中使用这两个文件

	```
	app.use('/api/user', require('./util/handle-login'))
	app.use('/api', require('./util/proxy'))

	```	
5. 启用客户端时访问接口需要做一层代理的，在webpack.config.client.js

	```
	proxy: {
      '/api' : 'http://localhost:3333'
    }
	```	
	
