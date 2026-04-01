import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom'
import {useAuth}  from '../hooks/useAuth'
import LoadingSpinner from '../../interview/pages/Loading'

const Login = () => {

  const navigate = useNavigate()

  const {loading, handleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await handleLogin({email, password})
        navigate('/')
        
    }

    if(loading){
      return (<LoadingSpinner />)
    }
  return (
    <div className=' justify-center flex flex-col items-center h-screen'>
      <h1 className='text-white text-2xl mb-5'>Login</h1>
      <form onSubmit={handleSubmit} className='border border-amber-50 rounded-lg p-5 bg-white'>
       <div className='flex flex-col p-5'>
            <label className='mb-5' htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='px-7 py-2 outline-none border border-gray-400 rounded-lg' type="email" id='email' name='email' placeholder='Enter your email' />
       </div>
       <div className='flex flex-col p-5'>
            <label className='mb-5' htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='px-7 py-2 outline-none border border-gray-400 rounded-lg' type="password" id='password' name='password' placeholder='Enter password' />
       </div>
       <div className='flex items-center justify-center mt-5'>
        <button type='submit' className='bg-indigo-600 text-white font-medium px-8 rounded-lg cursor-pointer py-2 w-full hover:scale-95 transition-all duration-200'>Login</button>
       </div>
      </form>
      <p className='text-white mt-3'>Don't have an account ? <Link className='text-indigo-600' to={'/register'}>Register</Link> </p>
    </div>
  )
}

export default Login
