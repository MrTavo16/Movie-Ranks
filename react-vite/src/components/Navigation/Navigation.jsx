import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  return (<>
    <div className='navbar'>
      <div onClick={()=>navigate('/')}>
      <i style={{fontSize:'40px', cursor:'pointer'}}>
        Movie Ranks
        </i>
        <div style={{cursor:'pointer', color:"blue"}} onClick={(e)=>{
          e.stopPropagation()
          navigate('creator-links')
          }
          }>Creator Links</div>
      </div>

      <div style={{display:"flex", flexDirection:'column'}}>
        <ProfileButton />
      </div>
    </div>
    <span className='divider'>
    </span>
  </>);
}

export default Navigation;
