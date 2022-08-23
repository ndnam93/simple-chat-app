import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import RegisterBackground from '../assets/register-bg.svg'
import { useAuth } from '../providers/AuthProvider'

function Login() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const { onLogin } = useAuth()

  const onSubmit = (data) => {
    console.log(data)
    axios
      .post(`${import.meta.env.VITE_API_URL}/v1/auth/login`, data)
      .then((response) => {
        console.log(response)
        onLogin(response.data)
      })
      .catch((err) => {
        setError(err?.response?.data?.message)
      })
  }

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full m-w-[1000px] overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <img src={RegisterBackground} alt="Background" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      id="email"
                      type="email"
                      className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="johnsmith@example.com"
                      {...register('email')}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label
                    htmlFor="htmlFor"
                    className="text-xs font-semibold px-1"
                  >
                    Password
                  </label>
                  <div className="flex">
                    <input
                      id="password"
                      type="password"
                      className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                      {...register('password')}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <div role="alert">
                      <div className="border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center">
                <Link
                  to="/register"
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  Go to Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
