import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css';

import HomePage from './pages/home-page'
import TripPage from './pages/trip-page'
import store from './store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />

        <Route exact path='/trips/:id' component={TripPage} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
