import { csrfFetch } from "./csrf"

const LOAD_USERS_PROFILE = 'profiles/LOAD_USERS_PROFILE'


export const loadUsersProfile = (user) => ({
    type: LOAD_USERS_PROFILE,
    user
})

export const getUserProfile = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/profile`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadUsersProfile(data))
        return data
    }
    return res
}

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USERS_PROFILE:
            const newState = { ...state}
            newState[0] = action.user
            return newState
        default: return state
    }
}

export default profileReducer