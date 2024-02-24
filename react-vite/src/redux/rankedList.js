import { csrfFetch } from "./csrf"

const LOAD_RANKED_LIST = 'ranked_lists/LOAD_RANKED_LIST'
const RECIEVE_RANKED_LIST = 'ranked_lists/RECIEVE_RANKED_LIST'
const REMOVE_RANKED_LIST = 'ranked_lists/REMOVE_RANKED_LIST'

export const LoadRankedList = (rankedLists) => ({
    type: LOAD_RANKED_LIST,
    rankedLists
})

export const recieveRankedList = (rankedList) => ({
    type: recieveRankedList,
    rankedList
})

export const removeRankedList = (rankedList) => ({
    type: rankedList,
    rankedList
})

export const getRankedListByUserId = (userId) => async (dispatch) => {
    const res = await fetch(`/api/ranked_lists/${userId}`)

    if (res.ok) {
        const data = await res.json()
        // console.log(data, '--------------')
        dispatch(LoadRankedList(data))
        return data
    }
    return res
}

export const createRankedList = (movie) => async (dispatch) => {
    console.log(movie)
    const res = await csrfFetch(`/api/ranked_lists/`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(recieveRankedList(data))
        return data
    }
    return res
}

export const editRankedList = (list)=>async (dispatch)=>{
    const res = await csrfFetch(`/api/ranked_lists/${list.ranked_list_id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
    })

    if(res.ok){
        const data = await res.json()
        dispatch(recieveRankedList(data))
        return data
    }
    return res
}

const rankedListReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_RANKED_LIST:
            const newState = { ...state }
            
            if (action.rankedLists.rankedList) {
                // console.log(action.rankedLists.rankedList, '-=-=-=-=-')
                const key = Object.keys(action.rankedLists.rankedList)[0]
                newState[`${key}`] = action.rankedLists.rankedList[`${key}`]
            }

            return newState

        case RECIEVE_RANKED_LIST:
            console.log(action.rankedList)
            return { ...state, [action.rankedList.ranked_list_id]: action.rankedList }
        case REMOVE_RANKED_LIST:
            const newState1 = { ...state }
            delete newState1[action.rankedList.id]
            return newState1

        default: return state
    }
}
export default rankedListReducer