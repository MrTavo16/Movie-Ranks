import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import MovieDetails from "../MovieDetails/MovieDetails";
import { loadMovies, getAllMovies } from "../../redux/movie";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './HomePage.css'


const HomePage = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movies)
    const [isLoaded, setIsLoaded] = useState(false)
    const imgUrl = 'https://image.tmdb.org/t/p/original/'

    useEffect(()=>{
        dispatch(getAllMovies()).then(()=>setIsLoaded(true))
    },[isLoaded])

    return(<>
        {isLoaded && <div>
            <div id="home">
            {Object.values(movies).map(ele=>{
                return <div key={ele.id} movie={ele} onClick={()=>navigate(`/movies/${ele.movie_id}`)}>
                    <div className='img-container'>
                        <img src={imgUrl + ele.poster_path}/>
                    </div>
                    <h1>{ele.title}</h1>
                </div>
            })}
            </div>
        </div>}
    </>)
}   

export default HomePage