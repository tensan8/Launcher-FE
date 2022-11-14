import * as React from 'react';
import logo from '../../images/nekonya.jpg'
import BackButton from '../BackButton/backbutton';
import { connect } from 'react-redux'
import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import {bookingTable} from '../../store/actions/tableAction'
import { TableState } from '../../type';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Webhook from '../Webhook/webhook'

const Booking = (props: any): JSX.Element => {

    // const [BookingValue, setBookingValue] = React.useState('');
    // const [TableValue, setTableValue] = React.useState('');
    // const NameValue = React.useState("");
    // const TableID = React.useState("");
    // const [DateValue, setDateValue]= React.useState('');
    // const [StartTimeValue, setStartTimeValue] = React.useState('');
    // const [EndTimeValue, setEndTimeValue] = React.useState('');

    const NameValue = React.useState("");
    const TableID = React.useState("");
    const DateValue = React.useRef<HTMLInputElement>(null)
    const StartTimeValue = React.useRef<HTMLInputElement>(null)
    const EndTimeValue = React.useRef<HTMLInputElement>(null)
    const [isDialogOpen, setDialogOpen] = React.useState(false)
    const navigate = useNavigate()


    const handleSubmit = React.useCallback((e: React.SyntheticEvent) =>{
        const tabledata = {
            NameValue: '1',
            TableID: "1",
            Date: DateValue.current?.value,
            StartTime: StartTimeValue.current?.value,
            EndTime: EndTimeValue.current?.value
        }
        //props.bookingTable(tabledata)
        e.preventDefault()
        // PostToDiscord();
        console.log(tabledata);
    },[])

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

    const [formData, setFormData] = useState({
        data:{
            UserID: '123',
            TableNo: '1',
            booking_date: '',
            booking_starttime: '',
            booking_endtime: '',
        },
        error: {},
    });

    
    const setDynamicFormData = (name: string, value: string) =>{
        setFormData({
            data: {
                ...formData.data,
                [name]: value,
            },
            error: {},
        });
    };

    const {Send}=Webhook();

    const PostToDiscord = ()=>{
        const booking_detail = Object.entries(formData.data)
        .map((d) => `${d[0]}: ${d[1]}`)
        .join("\n");
        Send(booking_detail);
    };

    return (
        <div>
        <BackButton backPath = "/"/>
        <div className="grid place-items-center my-16">
            
            <div className='flex my-3'>
                <h1 className='font-bold text-5xl text-white my-auto'>Neko Neko Nyaa</h1>
                <img src={logo} alt="logo" className='w-16'/>
            </div>
            
            <form 
            className=" p-7 rounded-lg shadow-lg bg-cyan-700 w-[32rem]"
            onSubmit={(e)=>{
                e.preventDefault();
                PostToDiscord();
            }}
            >
                <div className='mb-10 flow-root'>
                    <div className='flex text-xl font-bold float-left'>
                        <p>UserID: </p>
                        <p className='ml-1'>123</p>
                    </div>
                    <div className='flex text-xl font-bold float-right'>
                        <p>TableNo:</p>
                        <p className='ml-1'>1</p>
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
                    onChange={(e)=>{
                        const {name, value} = e.target;
                        console.log(name, value)
                        setDynamicFormData(name, value);
                    }}
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
                        onChange={(e)=>{
                            const {name, value} = e.target;
                            console.log(name, value)
                            setDynamicFormData(name, value);
                        }}
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
                        onChange={(e)=>{
                            const {name, value} = e.target;
                            console.log(name, value)
                            setDynamicFormData(name, value);
                        }}
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

const mapStateToProps = (userState:TableState):any =>({user: userState.user})

export default connect(mapStateToProps, {bookingTable})(Booking)