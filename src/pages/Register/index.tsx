import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faIdCard } from '@fortawesome/free-solid-svg-icons'

const RegistrationPage = (): JSX.Element => {
  const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('pressed')
  }, [])

  return (
      <div className='w-screen flex items-center justify-center h-screen bg-cyan-600'>
          <div className='bg-white w-1/3 shadow-md mx-auto my-auto'>
              <h1 className='text-center font-bold text-[#5b6574] text-xl border-b-2 border-[#dee0e4] py-3'>Member Registration</h1>
              <form className='flex flex-col justify-center'>
                  <div className='flex justify-center w-full px-8 pt-8'>
                      <label htmlFor="username" className='bg-blue-700 flex justify-center py-3 px-3'>
                          <FontAwesomeIcon icon={faUser} className="text-white w-4"/>
                      </label>
                      <input type="text" name="username" placeholder="Username" id="username" className='border border-[#dee0e4] px-3 text-sm w-full' required />
                  </div>
                  <div className='flex justify-center w-full px-8 pt-5'>
                      <label htmlFor='password' className='bg-blue-700 flex justify-center py-3 px-3'>
                          <FontAwesomeIcon icon={faLock} className="text-white w-4"/>
                      </label>
                      <input type="password" name="password" placeholder="Password" id="password" className='border border-[#dee0e4] px-3 text-sm w-full' required />
                  </div>
                  <div className='flex justify-center w-full px-8 pt-5'>
                      <label htmlFor='uuid' className='bg-blue-700 flex justify-center py-3 px-3'>
                          <FontAwesomeIcon icon={faIdCard} className="text-white w-4"/>
                      </label>
                      <input type="text" name="uuid" placeholder="Card UUID" id="uuid" className='border border-[#dee0e4] px-3 text-sm w-full' required readOnly />
                  </div>
                  <input type="submit" value="Register" onClick={handleSubmit} className='w-full bg-blue-700 hover:bg-blue-900 text-white font-medium py-2 mt-10 cursor-pointer transition duration-200'/>
              </form>
          </div>
      </div>
  )
}

export default RegistrationPage
