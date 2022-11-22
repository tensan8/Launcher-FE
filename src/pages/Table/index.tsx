import * as React from 'react'
import './index.css'
import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from '@mui/material'
import {SnackOrderState, SnackState, TableListState, tableListStatus, UserState} from '../../type'
import { connect } from 'react-redux'
import { getAllTableStatus, resetTableList, updateTableStatus } from '../../store/actions/tableListAction'
import { TableListDTO } from '../../dtos/tableListDTO'
import {getUser} from "../../store/actions/userActions";
import {UserDTO} from "../../dtos/userDTO";
import {useNavigate} from "react-router-dom";
import BackButton from "../BackButton/backbutton";
import {Client, Message} from "paho-mqtt";

interface tableProps {
  userId: number
  tableList?: { tableList: TableListDTO[] }
  getAllTableStatus?: () => {}
  resetTableList?: () => {}
  updateTableStatus?: (table: TableListDTO) => {}
  getUser?: (id: number) => {}
  user?: { user: UserDTO }
}

const tableStatusList: string[] = ['Available', 'Booked', 'Occupied', 'Warning']

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
    client.subscribe('table1/status')
  },
  onFailure: () => {
    console.log('Could not connect to MQTT Broker', 'is-error')
  }
})

const Table = (props: tableProps): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [currentTableId, setCurrentTableId] = React.useState(0)
  const navigate = useNavigate()

  client.onMessageArrived = (message: any) => {
    const payload = JSON.parse(message.payloadString)

    const updatedTableData = { tableId: payload.data.tableNumber, status: payload.data.status.toLowerCase() as tableListStatus }

    if (props.updateTableStatus !== undefined) {
      props.updateTableStatus(updatedTableData)
    }

    if (props.resetTableList !== undefined) {
      props.resetTableList()
    }

    window.location.reload();
  }

  React.useEffect(() => {
    if(props.getUser !== undefined && props.userId !== undefined && props.user !== undefined) {
      props.getUser(props.userId)
    }
  }, [])

  React.useEffect(() => {
    if (props.getAllTableStatus !== undefined && props.tableList?.tableList === undefined) {
      props.getAllTableStatus()
    }
  }, [props, props.tableList])

  const handleTableClick = React.useCallback((tableId: number) => {
    if(props.user?.user.role === 'admin') {
      setCurrentTableId(tableId)
      setIsDialogOpen(true)
    } else {
      navigate("/booking", {state: {
        userId: props.user?.user.userId,
        tableId: tableId
      }});
    }
  }, [props.user?.user])

  const handleTableStatus = React.useCallback((newStatus: string) => {
    const updatedTableData = { tableId: currentTableId, status: newStatus.toLowerCase() as tableListStatus }

    if (props.updateTableStatus !== undefined) {
      props.updateTableStatus(updatedTableData)
    }

    setIsDialogOpen(false)

    if (props.resetTableList !== undefined) {
      props.resetTableList()
    }

    if (client.isConnected()) {
      const newStatus = {
        data: {
          tableNumber: updatedTableData.tableId,
          status: updatedTableData.status
        }
      }
      const message = new Message(JSON.stringify(newStatus));
      message.destinationName = 'table1/status';
      message.qos = 0;
      client.send(message);
      console.log("Sent");
    }

    window.location.reload();
  }, [currentTableId, props.tableList])

  return (
    <div className='booking_seat'>
        <BackButton backPath = {-1}/>
        <ul className="showcase">
          {tableStatusList.map((status: string, index: number) => {
            return (
                <li key={index}>
                  <div className={status}></div>
                  <small>{status}</small>
                </li>
            )
          })}
        </ul>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Choose Table Status</DialogTitle>
          <List sx={{ pt: 0 }}>
            {tableStatusList.map((status: string, index: number) => {
              return (
                <ListItemButton onClick={() => handleTableStatus(status)} key={index}>
                  <ListItemText primary={status}/>
                </ListItemButton>
              )
            })}
          </List>
        </Dialog>

        <div className="grid grid-cols-4 gap-20">
             {props.tableList?.tableList?.map((table: TableListDTO, index: number) => {
               return (
                <div
                    onClick={() => handleTableClick(table.tableId)}
                    className={`tablestatus ${table.status === 'available'
                        ? 'bg-white'
                        : `${table.status === 'booked'
                            ? 'bg-[#6feaf6]'
                            : `${table.status === 'occupied'
                                ? 'bg-[rgb(255,0,0)]'
                                : 'bg-[#FFFF00]'}` 
                        }`
                    } text-black`}
                    key={index}
                >
                    {table.tableId}
                </div>
               )
             })}
        </div>
    </div>
  )
}

const mapStateToProps = (tableState: TableListState | UserState): any => ({
  tableList: "tableList" in tableState && tableState.tableList,
  user: "user" in tableState && tableState.user
})

export default connect(mapStateToProps, {
  getAllTableStatus,
  resetTableList,
  updateTableStatus,
  getUser
})(Table)
