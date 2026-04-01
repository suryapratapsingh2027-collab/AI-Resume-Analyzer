import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../../interview/pages/Loading'

const Login = () => {
  const navigate = useNavigate()
  const { loading, handleLogin } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }

  if (loading) {
    return (<LoadingSpinner />)
  }

  return (
    // Background color ko thoda rich dark tone diya hai
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4'>
      
      {/* Main Container - Mobile me single column, laptop me split screen */}
      <div className='bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden'>
        
        {/* Left Side: Project Description (Sirf badi screens par dikhega) */}
        <div className='hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-white'>
          <div>
            {/* Aap yahan apne project ka real logo laga sakte ho */}
            <div className='h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl'>
              🚀
            </div>
            <h2 className='text-3xl font-bold mt-6 leading-tight'>Welcome Back to Our Platform!</h2>
            <p className='text-indigo-100 mt-4 leading-relaxed'>
              Prepare for your next big opportunity. Access your mock interviews, track your progress, and sharpen your skills all in one place.
            </p>
          </div>
          
          <div className='text-sm text-indigo-200'>
            © 2026 AI Interview Prep. All rights reserved.
          </div>
        </div>

        {/* Right Side: Original Login Form */}
        <div className='w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-slate-900'>
          
          <div className='mb-8'>
            <h1 className='text-white text-3xl font-bold mb-2'>Log In</h1>
            <p className='text-slate-400 text-sm'>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Email Field */}
            <div className='flex flex-col'>
              <label className='text-slate-300 text-sm font-medium mb-2' htmlFor="email">
                Email Address
              </label>
              <input 
                value={email} 
                onChange={(e) => { setEmail(e.target.value) }} 
                className='px-4 py-3 bg-slate-800 text-white outline-none border border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 placeholder-slate-500' 
                type="email" 
                id='email' 
                name='email' 
                placeholder='name@example.com' 
                required
              />
            </div>

            {/* Password Field */}
            <div className='flex flex-col'>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-slate-300 text-sm font-medium' htmlFor="password">
                  Password
                </label>
                <a href="#" className='text-xs text-indigo-400 hover:text-indigo-300'>Forgot password?</a>
              </div>
              <input 
                value={password} 
                onChange={(e) => { setPassword(e.target.value) }} 
                className='px-4 py-3 bg-slate-800 text-white outline-none border border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 placeholder-slate-500' 
                type="password" 
                id='password' 
                name='password' 
                placeholder='••••••••' 
                required
              />
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <button 
                type='submit' 
                className='bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl cursor-pointer w-full hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-600/20'
              >
                Log In
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className='text-slate-400 mt-8 text-center text-sm'>
            Don't have an account?{' '}
            <Link className='text-indigo-400 font-medium hover:text-indigo-300 transition-colors' to={'/register'}>
              Sign up for free
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default Login