import { handleAction } from 'redux-actions'

const setList = handleAction(
    'SET_USER_LIST',
    (state, action) => {
        return {
            ...state,
            list: action.payload
        }
    }, {list: [0, 0, 0]})

export {setList}