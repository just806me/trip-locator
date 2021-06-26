import { Action, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

type AppAction = Action<undefined>

export interface AppState {
}

const initialState: AppState = {
}

const reducer = (state = initialState, action: AppAction) : AppState => {
  switch (action.type) {
    default:
      return state
  }
}

export default createStore(reducer, devToolsEnhancer({}))
