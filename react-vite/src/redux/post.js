import { csrfFetch } from "./csrf"

const LOAD_POSTS = 'posts/LOAD_POSTS'
const RECIEVE_POSTS = 'posts/RECIEVE_POSTS'

const postReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_POSTS:

    default:return state
    }
}
export default postReducer