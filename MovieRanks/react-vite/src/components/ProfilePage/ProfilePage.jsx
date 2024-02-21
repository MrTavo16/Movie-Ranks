import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId } from "../../redux/rankedList";

const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const userId = Number(useParams().profileId)
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session).user
    const rankedList = useSelector(state => state.ranked_lists)
    console.log(rankedList['1'])
    useEffect(()=>{
        dispatch(getRankedListByUserId(userId)).then(()=>setIsLoaded(true))
    }, [])
    // console.log(user)
    if(user.id === userId){
        return(<>
            {isLoaded && <div>
            <h1>{user.username}</h1>
            </div>}
        </>)
    }
    return(<>
        {isLoaded && <div>
        <h1>{rankedList['1'].username}</h1>
        </div>}
    </>)
}   
export default ProfilePage