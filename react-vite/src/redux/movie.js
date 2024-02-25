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






// export const getAllMovies = () => async (dispatch)=>{
//     const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ5YWYxOTZiYjBkMzc2NzMzMTg2MTU3MzU0ZWI0MSIsInN1YiI6IjY1YmIwNzI1MTFjMDY2MDE3YmNmOThlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lIyR_-jhyowVMgoS5B7VBxns_2An9GgMs-E1sNGP0A'
//         }
//       };
      
//       const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
//         // .then(response => response.json())
//         // .then(response => console.log(response,))
//         .catch(err => console.error(err));
//     if(res.ok){
//         const data = await res.json()
//         const backendRes = await fetch('/api/movies/', {
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify(data)
//         })
//         const backendData = await backendRes.json()
//         // console.log(backendData, 'backend data')
//         dispatch(loadMovies(data))
//         return data
//     }
//     return res
// }



export const getMovieById = (movieId)=>async (dispatch)=>{
    // console.log(Number(movieId.movieId), '------------------')
    if(Number(movieId.movieId === NaN))return null
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWQ5YWYxOTZiYjBkMzc2NzMzMTg2MTU3MzU0ZWI0MSIsInN1YiI6IjY1YmIwNzI1MTFjMDY2MDE3YmNmOThlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lIyR_-jhyowVMgoS5B7VBxns_2An9GgMs-E1sNGP0A'
    //     }
    //   };
    //   const res = await fetch(`https://api.themoviedb.org/3/movie/${Number(movieId.movieId)}?language=en-US`, options)

    //     .catch(err => console.error(err));
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
                    // console.log(ele,'====')
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