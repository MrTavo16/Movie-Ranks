import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import MovieDetails from "../MovieDetails/MovieDetails";
import { loadMovies, getAllMovies } from "../../redux/movie";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './HomePage'


const HomePage = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movies)
    const [isLoaded, setIsLoaded] = useState(false)
    const imgUrl = 'https://image.tmdb.org/t/p/original/'
    // console.log(Object.values(movies))

    useEffect(()=>{
        dispatch(getAllMovies()).then(()=>setIsLoaded(true))
    },[isLoaded])

    return(<>
        {isLoaded && <div>
            <div>
            {Object.values(movies).map(ele=>{
                return <div id="home" key={ele.id} movie={ele} onClick={()=>navigate(`/movies/${ele.id}`)}>
                    <div>
                        <img src={imgUrl + ele.poster_path}/>
                    </div>
                    <div>{ele.title}</div>
                </div>
            })}
            </div>
        </div>}
    </>)
}   

export default HomePage