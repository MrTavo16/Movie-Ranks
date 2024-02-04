import { csrfFetch } from "./csrf"

const LOAD_MOVIES = 'movies/loadMovies'

export const loadMovies = (movies)=>({
    type:LOAD_MOVIES,
    movies
})

export const getAllMovies = () => async (dispatch)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ5YWYxOTZiYjBkMzc2NzMzMTg2MTU3MzU0ZWI0MSIsInN1YiI6IjY1YmIwNzI1MTFjMDY2MDE3YmNmOThlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lIyR_-jhyowVMgoS5B7VBxns_2An9GgMs-E1sNGP0A'
        }
      };
      
      const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        // .then(response => response.json())
        // .then(response => console.log(response,))
        .catch(err => console.error(err));
    if(res.ok){
        const data = await res.json()
        dispatch(loadMovies(data))
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
            if(action.movies.results && action.movies.results != undefined){
                action.movies.results.forEach(ele=>{
                    // console.log(ele,'====')
                    newState[count] = ele
                    count++
                })
                return newState
            }
        default:return state
    }
}
export default movieReducer