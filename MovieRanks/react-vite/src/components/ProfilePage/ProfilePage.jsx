import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId } from "../../redux/rankedList";

const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session).user
    useEffect(()=>{
        dispatch(getRankedListByUserId(user)).then(()=>setIsLoaded(true))
    }, [])
    // console.log(user)
    return(<>
        {isLoaded && <div>
        hello
        </div>}
    </>)
}   
export default ProfilePage