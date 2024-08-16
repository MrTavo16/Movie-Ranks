import { csrfFetch } from "./csrf"

const LOAD_MOVIES = 'movies/loadMovies'
const RECIEVE_MOVIE = 'movies/recieveMovie'

export const loadMovies = (movies)=>({
    type:LOAD_MOVIES,
    movies
})

export const recieveMovie = (movie)=>({
    type:RECIEVE_MOVIE,
    movie
})

export const getAllMovies = () => async (dispatch)=>{
    const res = await fetch('api/movies/')
    if(res.ok){
        const data = await res.json()
        dispatch(loadMovies(data))
        return data
    }
    return res
}




export const getMovieById = (movieId)=>async (dispatch)=>{
    if(Number(movieId.movieId === NaN))return null

    const res = await fetch(`/api/movies/${Number(movieId.movieId)}`)
        if(res.ok){
            const data = await res.json()
            dispatch(recieveMovie(data))
            return data
        }
        return res
}

const movieReducer = (state= {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_MOVIES:
            newState = {}
            let count = 0
            if(action.movies && action.movies != undefined){
                action.movies.forEach(ele=>{
                    newState[count] = ele
                    count++
                })
                return newState
            }
        case RECIEVE_MOVIE:
            return {[action.movie.id]:action.movie}
        default:return state
    }
}
export default movieReducer