import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../../interview/pages/Loading'
import { useForm } from 'react-hook-form'

const Register = () => {
  const navigate = useNavigate()
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, handleRegister } = useAuth()

  const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm();

  const onSubmitForm = async (e) => {
   await handleRegister({ username, email, password })
    navigate('/')
  }

  if (loading) {
    return (<LoadingSpinner />)
  }

  return (
    // Pure page ka background color
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4'>
      
      {/* Main Container - Split Screen Layout */}
      <div className='bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden'>
        
        {/* Left Side: Project Description (Sirf Desktop par dikhega) */}
        <div className='hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-white'>
          <div>
            <div className='h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl'>
              🚀
            </div>
            <h2 className='text-3xl font-bold mt-6 leading-tight'>Join Us Today!</h2>
            <p className='text-indigo-100 mt-4 leading-relaxed'>
              Create your account to unlock personalized mock interviews, detailed feedback, and tools to ace your next job interview.
            </p>
          </div>
          
          <div className='text-sm text-indigo-200'>
            © 2026 AI Interview Prep. All rights reserved.
          </div>
        </div>

        {/* Right Side: Original Register Form */}
        <div className='w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-slate-900'>
          
          <div className='mb-6'>
            <h1 className='text-white text-3xl font-bold mb-2'>Create Account</h1>
            <p className='text-slate-400 text-sm'>Fill in the details below to get started.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitForm)} className='space-y-5'>
            
            {/* Username Field */}
            <div className='flex flex-col'>
              <label className='text-slate-300 text-sm font-medium mb-2' htmlFor="username">
                Username
              </label>
              <input {...register("username", { 
                  required: "Username is required",
                })}
                value={username} 
                onChange={(e) => { setUsername(e.target.value) }} 
                className='px-4 py-3 bg-slate-800 text-white outline-none border border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 placeholder-slate-500' 
                type="text" 
                id='username' 
                name='username' 
                placeholder='Enter username' 
              />
              {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username.message}</p>}
            </div>

            {/* Email Field */}
            <div className='flex flex-col'>
              <label className='text-slate-300 text-sm font-medium mb-2' htmlFor="email">
                Email Address
              </label>
              <input 
              {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })}
                value={email} 
                onChange={(e) => { setEmail(e.target.value) }} 
                className='px-4 py-3 bg-slate-800 text-white outline-none border border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 placeholder-slate-500' 
                type="email" 
                id='email' 
                name='email' 
                placeholder='name@example.com' 
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className='flex flex-col'>
              <label className='text-slate-300 text-sm font-medium mb-2' htmlFor="password">
                Password
              </label>
              <input 
              {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Min length 8 chars" }
                })}
                value={password} 
                onChange={(e) => { setPassword(e.target.value) }} 
                className='px-4 py-3 bg-slate-800 text-white outline-none border border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 placeholder-slate-500' 
                type="password" 
                id='password' 
                name='password' 
                placeholder='••••••••' 
              />
               {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <button 
                type='submit' 
                className='bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl cursor-pointer w-full hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-600/20'
              >
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className='text-slate-400 mt-6 text-center text-sm'>
            Already have an account?{' '}
            <Link className='text-indigo-400 font-medium hover:text-indigo-300 transition-colors' to={'/login'}>
              Login
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default Register