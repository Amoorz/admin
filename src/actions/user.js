import { createAction } from 'redux-actions'

const setUserList = createAction(
    'SET_USER_LIST',
    (data) => {
        // let list = [0, 1, 2]
        return data
    }
)

export {
    setUserList
}
