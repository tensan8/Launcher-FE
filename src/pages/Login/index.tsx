import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { LoginProps, UserState } from '../../type'
import { loginUser } from '../../store/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { UserDTO } from '../../dtos/userDTO'

interface loginProps {
  sessionSetter: (sessionId: number) => {}
  user?: { user: UserDTO }
  loginUser?: (userInfo: LoginProps) => {}
}

const LoginPage = (props: loginProps): JSX.Element => {
  const navigate = useNavigate()
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const [isUserValid, setIsUserValid] = React.useState(true)

  React.useEffect(() => {
    if (props.user?.user.userId !== 0 && props.user !== undefined) {
      props.sessionSetter(props.user.user.userId)
    } else if (Object.keys(props.user?.user ?? '').length === 0) {
      setIsUserValid(false)
    }
  }, //eslint-disable-next-line
      [props.user])

  const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
    if (props.loginUser !== undefined) {
      props.loginUser({ username: usernameRef.current?.value ?? '', password: passwordRef.current?.value ?? '' })
    }
    navigate('/')
    e.preventDefault()
  }, //eslint-disable-next-line
      [])

  return (
    <div className='w-screen flex items-center justify-center h-screen'>
        <div className='bg-white w-1/3 shadow-md mx-auto my-auto'>
            <h1 className='text-center font-bold text-[#5b6574] text-xl border-b-2 border-[#dee0e4] py-3'>Login</h1>
            <form className='flex flex-col justify-center pt-14'>
                <div className='flex justify-center w-full px-8'>
                    <label htmlFor="username" className='bg-[#3274d6] flex justify-center py-3 px-3'>
                        <FontAwesomeIcon icon={faUser} className="text-white"/>
                    </label>
                    <input type="text" name="username" placeholder="Username" id="username" ref={usernameRef} className='border border-[#dee0e4] px-3 text-sm w-full' required />
                </div>
                <div className='flex justify-center w-full px-8 pt-3'>
                    <label htmlFor='password' className='bg-[#3274d6] flex justify-center py-3 px-3'>
                        <FontAwesomeIcon icon={faLock} className="text-white"/>
                    </label>
                    <input type="password" name="password" placeholder="Password" id="password" ref={passwordRef} className='border border-[#dee0e4] px-3 text-sm w-full' required />
                </div>
                <div className='flex justify-center w-full px-8 pt-3 h-4'>
                    <p className='text-sm font-bold text-red-600'>{isUserValid ? '' : 'User not found'}</p>
                </div>
                <input type="submit" value="Login" onClick={handleSubmit} className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-16 cursor-pointer transition duration-200'/>
            </form>
        </div>
    </div>
  )
}

const mapStateToProps = (userState: UserState): any => ({ user: userState.user })

export default connect(mapStateToProps, { loginUser })(LoginPage)
