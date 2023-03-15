import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    const navigateToHomePage=()=>{
        navigate("/")
    }
    return(
        <div onClick={navigateToHomePage} className="error-page">
            <img src="/images/undraw_page_not_found_re_e9o6.svg" alt="" />
        </div>
    )
}

export default NotFound;