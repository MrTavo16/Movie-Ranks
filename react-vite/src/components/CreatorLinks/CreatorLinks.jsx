import { Navigate, useNavigate} from "react-router-dom";
import './CreatorLinks.css'

const CreatorLinks = ()=>{
    const handleNav = (string)=>{
        window.open(string,'_blank','noopener noreferrer')
    }
    return(<>
        <div onClick={()=>handleNav('https://www.linkedin.com/in/gustavo-gonzalez-660894286/')} id="creatorbox">
            <div style={{cursor:'pointer'}} className="creatorbox2">
                <div className="logo-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"/>
                </div>
                <div>Gustavo Gonzalez</div>
            </div>
            <div onClick={()=>handleNav('https://github.com/MrTavo16')} className="creatorbox2">
                <div style={{cursor:'pointer'}} className="logo-container">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png"/>
                </div>
                <div>MrTavo16</div>
            </div>
        </div>
    </>)
}
export default CreatorLinks