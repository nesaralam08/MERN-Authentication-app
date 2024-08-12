import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import axios from "axios"
export default function Login(){
    const navigate = useNavigate()
    const handleform = (e)=>{
        e.preventDefault();
        const fordata = new FormData(e.target);
        const obj = Object.fromEntries(fordata.entries())
        const {email,password} = obj
        if(!email || !password){
            return handleError("Email, Password is empty !!")
        }
        try {
            axios.post('auth/login',obj)
            .then((d)=>{
                const {success,token,name,message} = d['data']
                if(success){
                    handleSuccess(message)
                    localStorage.setItem('token',token)
                    localStorage.setItem('loggeduser',name)
                    setTimeout(()=>{
                        navigate('/home')
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
                <div className="h-auto w-96 bg-slate-900 p-5 rounded-lg">
                    <center><h1 className='mb-5 text-2xl font-semibold'>Login</h1></center>
                    <form className="flex flex-col gap-2" onSubmit={handleform}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder='Enter Email'  className='outline-none p-1 rounded-sm bg-slate-200 text-black placeholder:text-gray-700'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder='Enter Password'  className='outline-none p-1 rounded-sm bg-slate-200 text-black placeholder:text-gray-700'/>
                        </div>
                        <button type="submit" className='bg-green-700 p-2 rounded-sm mt-5'>Login</button>
                        <span>Don't have an account? <Link to={'/signup'} className='text-1xl text-blue-500'>Sign up</Link></span>
                    </form>
                </div>
            </section>
            </>
    )
}