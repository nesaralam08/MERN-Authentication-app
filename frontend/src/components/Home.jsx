import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import axios from "axios"
export default function Home(){
    const [loggeduser,setloggeduser] = useState('')
    const [products,setproducts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        setloggeduser(localStorage.getItem('loggeduser'))
    },[])
    const handlelogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('loggeduser')
        handleSuccess("Logout successfully !")
        setTimeout(() => {
            navigate('/login')
        },1000);
    }
    const fetchproduct = ()=>{
        const headers = {
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        }
        axios.get('/products',headers)
        .then((d)=>setproducts(d['data']))
        .catch((e)=>handleError(e))
    }
    useEffect(()=>{
        fetchproduct();
    },[])
    return(
        <>
            <section className="h-screen w-full bg-slate-950 flex items-center justify-center flex-col gap-3">
                <h1>Hello, {loggeduser}</h1>
                <button onClick={handlelogout} className="bg-orange-400 p-2 rounded-md">Logout</button>
                <br /><br />
                <h1>------------Products from API------------</h1>
                <ol>
                    {
                        products.map((item)=><li key={item.name}>{item.name} : {item.price}</li>)
                    }
                </ol>
            </section>
        </>
    )
}