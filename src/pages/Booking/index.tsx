import * as React from 'react'
import logo from '../../images/nekonya.jpg'
import BackButton from '../BackButton/backbutton'

const Booking = (props: any): JSX.Element => {
  // const [BookingValue, setBookingValue] = React.useState('');
  // const [TableValue, setTableValue] = React.useState('');
  // const NameValue = React.useState(null)
  // const [TableID] = React.useState(null)
  const [DateValue, setDateValue] = React.useState('')
  const [StartTimeValue, setStartTimeValue] = React.useState('')
  const [EndTimeValue, setEndTimeValue] = React.useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(event.currentTarget.elements)
  }

  return (
        <div>
        <BackButton backPath = "/"/>
        <div className="grid place-items-center my-16">

            <div className='flex my-3'>
                <h1 className='font-bold text-5xl text-white my-auto'>Neko Neko Nyaa</h1>
                <img src={logo} alt="logo" className='w-16'/>
            </div>

            <form className=" p-7 rounded-lg shadow-lg bg-cyan-700 w-[32rem]" onSubmit={handleSubmit}>
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
                    <input type="date" id="booking_name" placeholder='Name' required className='rounded-lg px-3 py-2 text-lg w-full' value={DateValue} onChange={e => setDateValue(e.target.value)}/>
                </div>
                <p className='font-bold text-2xl mt-10'>Time (Opening Hour 1:00PM - 11:00PM)</p>
                <div className='my-2 mt-5'>
                        <div className='flex'>
                            <label htmlFor='booking_time' className='font-bold text-xl w-52'>Start Time: </label>
                            <input type="time" id="booking_time" required className='rounded-lg text-lg px-2 w-full' value={StartTimeValue} onChange={e => setStartTimeValue(e.target.value)}/>
                        </div>
                        <div className='flex my-2'>
                            <label htmlFor='booking_time' className='font-bold text-xl w-52'>Finish Time: </label>
                            <input type="time" id="booking_time" required className='rounded-lg text-lg px-2 w-full' value={EndTimeValue} onChange={e => setEndTimeValue(e.target.value)}/>
                        </div>
                </div>
                <input type="submit" value="Booking" className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-8 cursor-pointer transition duration-200'/>
            </form>
        </div>
        </div>
  )
}
export default Booking
