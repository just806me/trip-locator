import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'fomantic-ui-css/semantic.min.css'

import HomePage from './components/home-page'
import store from './store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Route exact path='/' component={HomePage} />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
