import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ProfilePage = ()=>{
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session).user
    console.log(user)
    return(<>
        {isLoaded && <div>
        
        </div>}
    </>)
}   
export default ProfilePage