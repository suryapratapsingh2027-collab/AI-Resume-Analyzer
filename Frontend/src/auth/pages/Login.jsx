import React from 'react' // useState ki ab zaroorat nahi
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../../interview/pages/Loading'

const Login = () => {
  
  const {
    register,
    handleSubmit, 
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  
  const onFormSubmit = async (data) => {
    
    const result = await handleLogin(data);
    if(result?.error){
      setError('password',{ type: 'manual', message: 'Invalid email or password'})
    } else{
      navigate('/');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4'>
      <div className='bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden'>
        
       
        <div className='hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-white'>
          <div>
            <div className='h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl'>🚀</div>
            <h2 className='text-3xl font-bold mt-6 leading-tight'>Welcome Back!</h2>
            <p className='text-indigo-100 mt-4'>Prepare for your next big opportunity.</p>
          </div>
          <div className='text-sm text-indigo-200'>© 2026 AI Interview Prep.</div>
        </div>

        
        <div className='w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-slate-900'>
          <div className='mb-8'>
            <h1 className='text-white text-3xl font-bold mb-2'>Log In</h1>
          </div>

          
          <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
            
            <div className='flex flex-col'>
              <label className='text-slate-300 text-sm font-medium mb-2'>Email Address</label>
              <input 
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })}
                className='px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl focus:border-indigo-500 outline-none' 
                placeholder='name@example.com' 
              />
              
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>

            <div className='flex flex-col'>
              <label className='text-slate-300 text-sm font-medium mb-2'>Password</label>
              <input 
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Min length 8 chars" }
                })}
                className='px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl focus:border-indigo-500 outline-none' 
                placeholder='••••••••' 
              />
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
            </div>

            <button type='submit' className='bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl w-full hover:bg-indigo-700 transition-all'>
              Log In
            </button>
          </form>

          <p className='text-slate-400 mt-8 text-center text-sm'>
            Don't have an account? <Link className='text-indigo-400 font-medium' to='/register'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;