import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { UserState } from '../../type'
import { getUser } from '../../store/actions/userActions'

const LoginPage = (props: any): JSX.Element => {
  React.useEffect(() => {
    // console.log(props.user.user[0])
  }, [props.user])

  const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    props.getUser(1)
  }, [])

  return (
        <div className='w-screen h-screen pt-44'>
            <div className='bg-white w-1/3 h-1/2 shadow-md mx-auto'>
                <h1 className='text-center font-bold text-[#5b6574] text-xl border-b-2 border-[#dee0e4] py-3'>Login</h1>
                <form className='flex flex-col justify-center py-14'>
                    <div className='flex justify-center w-full px-8'>
                        <label htmlFor="username" className='bg-[#3274d6] flex justify-center py-3 px-3'>
                            <FontAwesomeIcon icon={faUser} className="text-white"/>
                        </label>
                        <input type="text" name="username" placeholder="Username" id="username" className='border border-[#dee0e4] px-3 text-sm w-full' required />
                    </div>
                    <div className='flex justify-center w-full px-8 pt-3'>
                        <label htmlFor='password' className='bg-[#3274d6] flex justify-center py-3 px-3'>
                            <FontAwesomeIcon icon={faLock} className="text-white"/>
                        </label>
                        <input type="password" name="password" placeholder="Password" id="password" className='border border-[#dee0e4] px-3 text-sm w-full' required />
                    </div>
                    <input type="submit" value="Login" onClick={handleSubmit} className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-16 cursor-pointer transition duration-200'/>
                </form>
            </div>
        </div>
  )
}

const mapStateToProps = (userState: UserState): any => ({ user: userState.user })

export default connect(mapStateToProps, { getUser })(LoginPage)
