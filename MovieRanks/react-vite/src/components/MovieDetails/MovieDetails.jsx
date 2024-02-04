import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";

const MovieDetails = ({movie})=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        if(movie){
            setIsLoaded(true)
        }
    },[isLoaded])

    return(<>
    {isLoaded && <div>
        
        </div>}
    </>)
}
export default MovieDetails