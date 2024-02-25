import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  return (<>
    <div className='navbar'>
      <div onClick={()=>navigate('/')}>
      <i style={{fontSize:'40px'}}>
        Movie Ranks
        </i>
      </div>

      <div>
        <ProfileButton />
      </div>
    </div>
    <span className='divider'>
    </span>
  </>);
}

export default Navigation;
