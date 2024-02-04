import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { loadMovies, getAllMovies } from "../../redux/movie";

const HomePage = () =>{
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movies)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(Object.values(movies))

    useEffect(()=>{
        dispatch(getAllMovies()).then(()=>setIsLoaded(true))
    },[isLoaded])

    return(<>
        {isLoaded && <div>
            <div>
            {Object.values(movies).map(ele=>{
                return <div key={ele.id}>{ele.title}</div>
            })}
            </div>
        </div>}
    </>)
}   

export default HomePage