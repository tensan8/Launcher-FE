import * as React from 'react'
import logo from '../../images/nekonya.jpg'
import BackButton from '../BackButton/backbutton';
import { connect } from 'react-redux'
import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import {bookingTable} from '../../store/actions/tableAction'
import {useLocation, useNavigate} from 'react-router-dom'
import TableBooking from '../Webhook/tablebooking'
import {BookingDTO} from "../../dtos/bookingDTO";
import {BookingState, tableListStatus} from "../../type";
import {Client} from "paho-mqtt";
import {TableListDTO} from "../../dtos/tableListDTO";
import {resetTableList, updateTableStatus} from "../../store/actions/tableListAction";

interface BookingProps {
    booking?: BookingDTO
    bookingTable?: (bookingData: BookingDTO) => {}
    resetTableList?: () => {}
    updateTableStatus?: (table: TableListDTO) => {}
}

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

const Booking = (props: BookingProps): JSX.Element => {
    const DateValue = React.useRef<HTMLInputElement>(null)
    const StartTimeValue = React.useRef<HTMLInputElement>(null)
    const EndTimeValue = React.useRef<HTMLInputElement>(null)
    const [isDialogOpen, setDialogOpen] = React.useState(false)
    const navigate = useNavigate()
    const { state } = useLocation()
    const {userId, tableId} = state

    const handleSubmit = React.useCallback((e: React.SyntheticEvent) =>{
        const bookingData: BookingDTO = {
            tableId: tableId,
            userId: userId,
            bookingDate: DateValue.current?.value!,
            bookingStartTime: StartTimeValue.current?.value!,
            bookingEndTime: EndTimeValue.current?.value!
        }
        if(props.bookingTable !== undefined) {
            props.bookingTable(bookingData)
        }
        e.preventDefault()

        const updatedTableData = { tableId: bookingData.tableId, status: 'booked' as tableListStatus }

        console.log(updatedTableData)

        if (props.updateTableStatus !== undefined) {
            props.updateTableStatus(updatedTableData)
        }

        if (props.resetTableList !== undefined) {
            props.resetTableList()
        }

        PostToDiscord(bookingData);
        setDialogOpen(true);
    },[props, tableId, userId])

    const handleDialogClose = React.useCallback(() => {
        setDialogOpen(false)
        navigate('/')
    }, [navigate])

    const {Send}=TableBooking();

    const PostToDiscord = (bookingData: {[key: string]: any}) => {
        const booking_detail = Object.entries(bookingData)
            .map((d) => `${d[0]}: ${d[1]}`)
            .join("\n");
        // Send(booking_detail);
    };

    return (
        <div>
            <BackButton backPath = {-1}/>
            <div className="grid place-items-center my-16">
                <div className='flex my-3'>
                    <h1 className='font-bold text-5xl text-white my-auto'>Neko Neko Nyaa</h1>
                    <img src={logo} alt="logo" className='w-16'/>
                </div>

                <form
                    className=" p-7 rounded-lg shadow-lg bg-cyan-700 w-[32rem]"
                    onSubmit={handleSubmit}
                >
                    <div className='mb-10 flow-root'>
                        <div className='flex text-xl font-bold float-left'>
                            <p>UserID: </p>
                            <p className='ml-1'>{userId}</p>
                        </div>
                        <div className='flex text-xl font-bold float-right'>
                            <p>TableNo:</p>
                            <p className='ml-1'>{tableId}</p>
                        </div>
                    </div>
                    <div className='flex my-2'>
                        <label className='my-auto w-52 text-xl font-bold'>Select a date: </label>
                        <input
                            type="date"
                            id="booking_date"
                            name = "booking_date"
                            placeholder='Name'
                            required
                            className='rounded-lg px-3 py-2 text-lg w-full'
                            ref={DateValue}/>
                    </div>
                    <p className='font-bold text-2xl mt-10'>Time (Opening Hour 1:00PM - 11:00PM)</p>
                    <div className='my-2 mt-5'>
                        <div className='flex'>
                            <label htmlFor='booking_starttime' className='font-bold text-xl w-52'>Start Time: </label>
                            <input
                                type="time"
                                id="booking_starttime"
                                name="booking_starttime"
                                required
                                className='rounded-lg text-lg px-2 w-full'
                                ref={StartTimeValue}/>
                        </div>
                        <div className='flex my-2'>
                            <label htmlFor='booking_endtime' className='font-bold text-xl w-52'>Finish Time: </label>
                            <input
                                type="time"
                                id="booking_endtime"
                                name="booking_endtime"
                                required
                                className='rounded-lg text-lg px-2 w-full'
                                ref={EndTimeValue}/>
                        </div>
                    </div>
                    <input type="submit" className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-8 cursor-pointer transition duration-200'/>
                </form>
                <Dialog open={isDialogOpen} onClose={ handleDialogClose } >
                    <DialogContent>
                        <DialogContentText>
                            Booking Success!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

const mapStateToProps = (bookingState: BookingState):any =>({booking: bookingState.booking})

export default connect(mapStateToProps, {bookingTable, updateTableStatus, resetTableList})(Booking)