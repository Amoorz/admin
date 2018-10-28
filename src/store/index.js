import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

const enhancer = compose(
    applyMiddleware(thunk, promiseMiddleware)
)     

export default function configureStore (initialState) {
    //注意：仅仅只有redux>=3.1.0支持第三个参数
    const store = createStore(rootReducer, initialState, enhancer)
    return store
}
