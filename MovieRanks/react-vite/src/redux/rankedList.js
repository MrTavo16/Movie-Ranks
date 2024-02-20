import { csrfFetch } from "./csrf"

const LOAD_RANKED_LIST = 'ranked_lists/LOAD_RANKED_LIST'
const RECIEVE_RANKED_LIST = 'ranked_lists/RECIEVE_RANKED_LIST'
const DELETE_RANKED_LIST = 'ranked_lists/DELETE_RANKED_LIST'

export const LoadRankedList = (rankedLists) => ({
    type: LOAD_RANKED_LIST,
    rankedLists
})

export const recieveRankedList = (rankedList) => ({
    type: recieveRankedList,
    rankedList
})

export const deleteRankedList = (rankedList) => ({
    type: rankedList,
    rankedList
})

export const getRankedListByUserId = (user) => async (dispatch) => {
    const res = await fetch(`/api/ranked_lists/${user.id}`)

    if (res.ok) {
        const data = await res.json()
        // console.log(data,'--------------')
        dispatch(LoadRankedList(data))
        return data
    }
    return res
}

const rankedListReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_RANKED_LIST:
            const newState = { ...state }
            // console.log(action.rankedLists.rankedList[0], '=========')
            let count = 0
            for (let i = 0; i < action.rankedLists.rankedList.length; i++) {
                // console.log(action.rankedLists.rankedList[i], '=========')
                newState[action.rankedLists.rankedList[i].id] = action.rankedLists.rankedList[i]
            }
            return newState
        default: return state
    }
}
export default rankedListReducer