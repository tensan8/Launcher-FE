import * as React from 'react'
import './index.css'
import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from '@mui/material'
import { TableListState, tableListStatus } from '../../type'
import { connect } from 'react-redux'
import { getAllTableStatus, resetTableList, updateTableStatus } from '../../store/actions/tableListAction'
import { TableListDTO } from '../../dtos/tableListDTO'
import { Client } from 'paho-mqtt'

interface tableProps {
  tableList?: { tableList: TableListDTO[] }
  getAllTableStatus?: () => {}
  resetTableList?: () => {}
  updateTableStatus?: (table: TableListDTO) => {}
}

const tableStatusList: string[] = ['Available', 'Booked', 'Unavailable']

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
  },
  onFailure: () => {
    console.log('Could not connect to MQTT Broker', 'is-error')
  }
})

const Table = (props: tableProps): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [currentTableId, setCurrentTableId] = React.useState(0)

  React.useEffect(() => {
    if (props.getAllTableStatus !== undefined && props.tableList?.tableList === undefined) {
      props.getAllTableStatus()
    }
  }, [props.tableList])

  const handleTableClick = React.useCallback((tableId: number) => {
    setCurrentTableId(tableId)
    setIsDialogOpen(true)
  }, [])

  const handleTableStatus = React.useCallback((newStatus: string) => {
    const updatedTableData = { tableId: currentTableId, status: newStatus.toLowerCase() as tableListStatus }

    if (props.updateTableStatus !== undefined) {
      props.updateTableStatus(updatedTableData)
    }

    setIsDialogOpen(false)

    if (props.resetTableList !== undefined) {
      props.resetTableList()
    }

    client.publish('table1/status', JSON.stringify(updatedTableData))
  }, [currentTableId])

  return (
    <div className='booking_seat'>
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
                            : 'bg-[rgb(255,0,0)]'
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

const mapStateToProps = (tableListState: TableListState): any => ({ tableList: tableListState.tableList })

export default connect(mapStateToProps, { getAllTableStatus, resetTableList, updateTableStatus })(Table)
