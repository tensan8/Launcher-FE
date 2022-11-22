import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faIdCard } from '@fortawesome/free-solid-svg-icons'
import { Client } from 'paho-mqtt'
import { registerUser } from '../../store/actions/userActions'
import { connect } from 'react-redux'
import { UserState } from '../../type'
import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const RegistrationPage = (props: any): JSX.Element => {
  const [uuid, setUuid] = React.useState('')
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const uuidRef = React.useRef<HTMLInputElement>(null)
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const navigate = useNavigate()

    const clientId = `website-${Math.random() * 100}`

    const client = new Client(
        '81c6a3b298404ce4bf472251fbd6c76a.s1.eu.hivemq.cloud',
        +('8884'),
        clientId
    )

    client.connect({
        userName: 'dashboard',
        password: 'Tabletracking1',
        cleanSession: true,
        useSSL: true,
        onSuccess: () => {
            console.log('Connected')
            client.subscribe('table1/rfid_log')
        },
        onFailure: () => {
            console.log('Could not connect to MQTT Broker', 'is-error')
        }
    })

  client.onMessageArrived = (message: any) => {
    const payload = JSON.parse(message.payloadString)
    setUuid(payload.data.cardUUID)
  }

  const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
    const userData = {
      cardUUID: uuidRef.current?.value,
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      role: 'customer'
    }

    props.registerUser(userData)

    e.preventDefault()
  }, [])

  React.useEffect(() => {
    if (props.user.user === 201) {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
    }
  }, [props.user.user])

  const handleDialogClose = React.useCallback(() => {
    setDialogOpen(false)
    navigate('/')
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
                      <input
                          type="text"
                          ref = {usernameRef}
                          name="username"
                          placeholder="Username"
                          id="username"
                          className='border border-[#dee0e4] px-3 text-sm w-full'
                          required
                      />
                  </div>
                  <div className='flex justify-center w-full px-8 pt-5'>
                      <label htmlFor='password' className='bg-blue-700 flex justify-center py-3 px-3'>
                          <FontAwesomeIcon icon={faLock} className="text-white w-4"/>
                      </label>
                      <input type="password" ref={passwordRef} name="password" placeholder="Password" id="password" className='border border-[#dee0e4] px-3 text-sm w-full' required />
                  </div>
                  <div className='flex justify-center w-full px-8 pt-5'>
                      <label htmlFor='uuid' className='bg-blue-700 flex justify-center py-3 px-3'>
                          <FontAwesomeIcon icon={faIdCard} className="text-white w-4"/>
                      </label>
                      <input type="text" value={uuid} ref={uuidRef} name="uuid" placeholder="Card UUID" id="uuid" className='border border-[#dee0e4] px-3 text-sm w-full' required readOnly />
                  </div>
                  <input type="submit" value="Register" onClick={handleSubmit} className='w-full bg-blue-700 hover:bg-blue-900 text-white font-medium py-2 mt-10 cursor-pointer transition duration-200'/>
              </form>
              <Dialog open={isDialogOpen} onClose={ handleDialogClose } >
                  <DialogContent>
                      <DialogContentText>
                          Registration Success!
                      </DialogContentText>
                  </DialogContent>
              </Dialog>
          </div>
      </div>
  )
}

const mapStateToProps = (userState: UserState): any => ({ user: userState.user })

export default connect(mapStateToProps, { registerUser })(RegistrationPage)
