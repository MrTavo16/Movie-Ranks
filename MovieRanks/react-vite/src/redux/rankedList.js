import { csrfFetch } from "./csrf"

const LOAD_RANKED_LIST = 'ranked_lists/LOAD_RANKED_LIST'
const RECIEVE_RANKED_LIST = 'ranked_lists/RECIEVE_RANKED_LIST'
const DELETE_RANKED_LIST = 'ranked_lists/DELETE_RANKED_LIST'

export const LoadRankedList = (rankedLists) => ({
    type:LOAD_RANKED_LIST,
    rankedLists
})

export const recieveRankedList = (rankedList) => ({
    type:recieveRankedList,
    rankedList
})

export const deleteRankedList = (rankedList) => ({
    type:rankedList,
    rankedList
})

export const getRankedListByUserId = (user) => async (dispatch)=>{
    const res = await fetch(`/api/movies/${Number(movieId.movieId)}/reviews`)

    if(res.ok){
        const data = await res.json()
        // console.log(data,'--------------')
        dispatch(loadReviewsByMovieId(data))
        return data
    }
    return res
}

const rankedListReducer = (state = {}, action)=>{
    switch(action.type){
        case LOAD_RANKED_LIST:
            const newState = {...state}
            return newState
        default: return state
    }
}
export default rankedListReducer