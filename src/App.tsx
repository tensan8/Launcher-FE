import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './App.css';
import { UserState } from './type';
import { getUser } from './store/actionCreators';
import { connect } from 'react-redux';

const App = (props: any): JSX.Element => {

  React.useEffect(() => {
    console.log(props.getUser(9))
    console.log(props.user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user])

  return (  
    <div className='w-screen h-screen pt-36'>
      <div className='bg-white w-1/3 h-4/6 shadow-md mx-auto'>
        <h1 className='text-center font-bold text-[#5b6574] text-xl border-b-2 border-[#dee0e4] py-3'>Login</h1>
        <form action="/auth" method='post' className='flex flex-col justify-center py-14'>
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
          <input type="submit" value="Login" className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-16 cursor-pointer transition duration-200'/>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: UserState) => ({user: state.user})

export default connect(mapStateToProps, {getUser})(App);
