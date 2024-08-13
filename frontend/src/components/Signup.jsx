import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
// import axios from "axios"
import axiosInstance from './axiosInstance';
export default function Signup(){
    const navigate = useNavigate()
    const handleform = (e)=>{
        e.preventDefault();
        const fordata = new FormData(e.target);
        const obj = Object.fromEntries(fordata.entries())
        const {name,email,password} = obj
        if(!name || !email || !password){
            return handleError("Name, Email, Password is empty !!")
        }
        try {
            axiosInstance.post('/auth/signup',obj)
            .then((d)=>{
                const {success,message} = d['data']
                if(success){
                    handleSuccess(message)
                    setTimeout(()=>{
                        navigate("/login")
                    },1000)
                }
            })
            .catch((e)=>{
                console.log(e);
                const {message} = e.response.data
                handleError(message)
            })
        } catch (error) {
            return handleError(error)
        }
    }
    return(
        <>
            <section className="h-screen w-full bg-slate-950 flex justify-center items-center">
                <div className="h-auto w-80 bg-slate-900 p-5 rounded-lg md:w-96 m-3 md:m-0">
                    <center><h1 className='mb-5 text-2xl font-semibold'>Sign up</h1></center>
                    <form className="flex flex-col gap-2" onSubmit={handleform}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" placeholder='ex: Nesar Alam' className='outline-none p-1 rounded-sm bg-slate-200 text-black placeholder:text-gray-700'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder='ex: sample@gmail.com'  className='outline-none p-1 rounded-sm bg-slate-200 text-black placeholder:text-gray-700'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder='ex: 123@abc'  className='outline-none p-1 rounded-sm bg-slate-200 text-black placeholder:text-gray-700'/>
                        </div>
                        <button type="submit" className='bg-green-700 p-2 rounded-sm mt-5'>Sign up</button>
                        <span>Already have an account? <Link to={'/login'} className='text-1xl text-blue-500'>Login</Link></span>
                    </form>
                </div>
            </section>
        </>
    )
}