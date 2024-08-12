import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const RefreshHandler = ({setisauth}) =>{
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setisauth(true);
            if(location.pathname==="/" ||
                location.pathname == "/login" ||
                location.pathname ==='/signup'
            ){
                navigate('/home',{replace:false})
            }
        }
    },[location,navigate,setisauth])
    return(
        null
    )
}
export default RefreshHandler