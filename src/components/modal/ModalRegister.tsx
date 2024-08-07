import React, { MouseEventHandler, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image'
import clsx from 'clsx'
import GoogleSvg from '/public/svg/google.svg'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, registerDto } from '@/redux/slice/authSlice'
import { loginRule, registerRule } from '@/rules/rules'
import { FieldValues, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
function ModalRegister() {
  const [tabActive, setTabActive] = useState(1)
  const dispatch = useDispatch()

  const handleRegister = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    console.log("register", data);
    dispatch(authActions.handleActionRegister(data as registerDto))
  }

  const handleLogin = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    console.log(data, event);
  }

  const {
    register, handleSubmit: handleResgisterSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerRule)
  });

  const {
    register: registerLogin, handleSubmit: handleLoginSubmit,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginRule)
  });

  return (
    <div className='flex'>
      <motion.div
        initial={{ opacity: 0, translateX: 100 }}
        animate={{ opacity: 1, translateX: 0 }}
        className='px-4 bg-base-200 py-4 transition-all w-1/2'>
        <h2 className='text-2xl text-left mb-3'>FaceIO</h2>
        <p className='pb-6'>Đăng nhập bằng tài khoản của bạn</p>
        <div role="tablist" className="tabs tabs-lifted tabs-md font-bold" >
          <a role="tab" className={`tab text-primary ${clsx({
            "tab-active text-primary": tabActive === 1
          })}`} onClick={() => setTabActive(1)}>Đăng kí</a>
          <a role="tab" className={`tab text-primary ${clsx({
            "tab-active": tabActive === 2
          })}`} onClick={() => setTabActive(2)}>Đăng nhập</a>
        </div>
        {/* error register */}
        <div className='bg-base-100 space-y-3 px-4 py-3 border border-base-300 border-t-0 rounded-md rounded-t-none w-full'>
          <div className={`text-error font-medium text-sm ${clsx({
            'hidden': tabActive != 1
          })}`}>
            {errors.email && <p className=''>*{errors.email.message}</p>}
            {errors.displayName && <p className=''>*{errors.displayName?.message}</p>}
            {errors.username && <p className=''>*{errors.username?.message}</p>}
            {errors.password && <p className=''>*{errors.password?.message}</p>}
            {errors.rePassword && <p className=''>*{errors.rePassword?.message}</p>}
          </div>

          {/* error login */}
          <div hidden={tabActive == 1} className={`text-error font-medium text-sm${clsx({
          })}`}>
            {errorsLogin.username && <p>*{errorsLogin.username?.message}</p>}
            {errorsLogin.password && <p>*{errorsLogin.password?.message}</p>}
          </div>
          <div className="flex justify-start gap-2">
            <button className="btn btn-outline border-base-300 bg-base-100">
              <GoogleSvg className='size-8' />
              <span className="px-2">Google</span>
            </button>
          </div>
          <div className='border-t border-base-300 pb-3' />
          <div className='gap-2 grid grid-cols-2'>
            <label className={`input input-bordered flex flex-1 items-center gap-2 ${clsx({
              'hidden': tabActive != 1
            })}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow w-full" placeholder="Email"  {...register('email')} />
            </label>


            <label className={`input flex-1 input-bordered flex items-center gap-2 ${clsx({
              'hidden': tabActive != 1
            })}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow w-full" placeholder="Họ và tên" {...register('displayName')} />
            </label>
          </div>
          <label className={`input input-bordered flex items-center gap-2 ${clsx({
            "hidden": tabActive != 1
          })}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" {...register('username')} />

          </label>

          <label className={`input input-bordered flex items-center gap-2 ${clsx({
            "hidden": tabActive == 1
          })}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" {...registerLogin('username')} />
          </label>

          <label className={`input flex-1 input-bordered flex items-center gap-2 ${clsx({
            'hidden': tabActive != 1
          })}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" placeholder="Mật khẩu" {...register('password')} />
          </label>

          <label className={`input flex-1 input-bordered flex items-center gap-2 ${clsx({
            'hidden ': tabActive == 1
          }, {
            'col-span-2 ': tabActive != 1
          })}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" placeholder="Mật khẩu" {...registerLogin('password')} />
          </label>


          <label className={`input flex-1 input-bordered flex items-center gap-2 ${clsx({
            'hidden': tabActive != 1
          })}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className={`grow `} placeholder="Nhập lại mật khẩu"  {...register('rePassword')} />
          </label>

          <div className="flex justify-between items-center mt-4">
            {/* <button className="btn btn-primary mr-2">Login</button> */}
            <a href="#" className={`underline text-primary ${clsx({
              'hidden': tabActive == 1
            })}`}>Quên mật khẩu?</a>
          </div>
          <div className="flex justify-center mt-4">
            <button hidden={tabActive == 1} onClick={handleLoginSubmit((data, event) => handleLogin(data, event))} className="gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-primary to-secondary
                    hover:from-secondary hover:to-primary
                    px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all ease-out hover:text-white md:font-semibold"
            >
              <span>Đăng nhập</span>
            </button>

            <button hidden={tabActive != 1} onClick={handleResgisterSubmit((data, event) => handleRegister(data, event))} className="gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-primary to-secondary
                    hover:from-secondary hover:to-primary
                    px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all ease-out hover:text-white md:font-semibold"
            >
              <span>Đăng kí</span>
            </button>
          </div>
        </div>

      </motion.div>
      <div className='flex-1'>
        <Image alt='auth' src={'/bg_auth.jpg'} className='flex-1 w-full object-cover h-full' sizes='100%' objectFit='cover' width={1} height={1}></Image>
      </div>
    </div>

  )
}

export default ModalRegister
