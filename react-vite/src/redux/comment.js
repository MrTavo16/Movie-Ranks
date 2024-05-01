import { csrfFetch } from "./csrf"

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
const RECIEVE_COMMENTS = 'comments/RECIEVE_COMMENTS'

const commentReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_COMMENTS:

    default:return state
    }
}
export default commentReducer