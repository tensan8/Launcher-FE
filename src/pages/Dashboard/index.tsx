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
import {UserDTO} from "../../dtos/userDTO";

interface DashboardProps {
    sessionId: any
    sessionReset: any
    resetUser?: () => {}
    getUser?: (id: number) => {}
    user?: { user: UserDTO }
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

    React.useEffect(() => {
        if(props.getUser !== undefined && props.sessionId !== undefined && props.sessionId && props.user !== undefined) {
            props.getUser(props.sessionId)
        }
    }, [])

  return (
        <div className="dashboard">
            <div className="dashboard_box">
                <div className='mytable'>
                    <h1 className="para0"> Neko Neko Nyaa </h1>
                    <img src={logo} alt="logo" className='nekonya'></img>
                </div>
                <div className="dashboard_container">
                    {props.user !== undefined && props.user.user && props.user.user.role === 'customer'
                        ?   <div className="catbox cursor-pointer" onClick={(e) => {
                                e.preventDefault()
                                navigate("/Snack")
                            }}>
                                <img src={drinks} alt="drinks" />
                                <span>Snacks</span>
                            </div>
                        :   <div> Admin </div>
                    }

                    <div className="catbox cursor-pointer" onClick={(e) => {
                        e.preventDefault()
                        navigate("/Table")
                    }}>
                        <img src={table} alt="table"/>
                        <span>Tables</span>
                    </div>
                </div>
            </div>
            <h1 className='font-bold text-red-600 cursor-pointer' onClick={handleLogout}>Logout</h1>
        </div>
  )
}

const mapStateToProps = (userState: UserState): any => ({user: userState.user})

export default connect(mapStateToProps, {getUser, resetUser})(Dashboard)
