import * as React from 'react'
import logo from '../../images/nekonya.jpg'
import drinks from '../../images/drink.png'
import table from '../../images/table.jpg'
import './index.css'
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {getUser, resetUser} from "../../store/actions/userActions";
import {getAllTableStatus, resetTableList, updateTableStatus} from "../../store/actions/tableListAction";
import {TableListState, UserState} from "../../type";

interface DashboardProps {
    sessionReset: any
    resetUser?: () => {}
}

const Dashboard = (props: DashboardProps): JSX.Element => {
    const navigate = useNavigate()

    const handleLogout = React.useCallback((e: React.SyntheticEvent) => {
        props.sessionReset()

        if(props.resetUser !== undefined) {
            props.resetUser()
        }

        navigate('/')

        e.preventDefault()
    }, [navigate, props])

  return (
        <div className="dashboard">
            <div className="dashboard_box">
                <div className='mytable'>
                    <h1 className="para0"> Neko Neko Nyaa </h1>
                    <img src={logo} alt="logo" className='nekonya'></img>
                </div>
                <div className="dashboard_container">
                    <div className="catbox cursor-pointer" onClick={(e) => {
                        e.preventDefault()
                        navigate("/Snack")
                    }}>
                        <img src={drinks} alt="drinks" />
                        <span>Snacks</span>
                    </div>

                    <div className="catbox cursor-pointer" onClick={(e) => {
                        e.preventDefault()
                        navigate("/Table")
                    }}>
                        <img src={table} alt="table"/>
                        <span>Tables</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full'>
                <h1 className='font-bold text-gray-500 hover:text-blue-500 transition duration-500 w-fit mx-auto cursor-pointer text-center mt-10 text-2xl'
                    onClick={handleLogout}
                >
                    Logout
                </h1>
            </div>
        </div>
  )
}

const mapStateToProps = (userState: UserState): any => ({user: userState.user})

export default connect(mapStateToProps, {resetUser})(Dashboard)
