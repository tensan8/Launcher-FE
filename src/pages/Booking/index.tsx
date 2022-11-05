import * as React from 'react';
import logo from '../../images/nekonya.jpg'

const Booking = (props: any): JSX.Element => {

    // const [BookingValue, setBookingValue] = React.useState('');
    // const [TableValue, setTableValue] = React.useState('');
     const [NameValue, setNameValue] = React.useState('');
    // const [EmailValue, setEmailValue] = React.useState('');
    // const [PhoneValue, setPhoneValue] = React.useState('');
    // const [TimeValue, setTimeValue] = React.useState('');
    // const [MemberValue, setMemberValue] = React.useState('');

    const TableValueRef = React.useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.elements[0]);
    }


    return (
        <div className="grid place-items-center my-20">
            <div className='flex my-6'>
                <h1 className='font-bold text-5xl text-white'>Neko Neko Nyaa</h1>
                <img src={logo} alt="logo" className='w-16'/>
            </div>
            
            <form className=" p-10 rounded-lg shadow-lg bg-cyan-700 w-4/6" onSubmit={handleSubmit}>
                <div className='flex text-xl'>
                    <label className='font-bold'>TableNo:</label>
                    <p className='ml-2'>1</p>
                </div>
                <div className='flex text-xl my-2'>
                    <label htmlFor="booking_name" className='font-bold'>Name:</label>
                    <input type="text" id="booking_name" value={NameValue} onChange={e=>setNameValue(e.target.value)} className='ml-2 rounded-lg px-2 text-sm w-full'/>    
                </div>
                <div className='flex text-xl my-2'>
                    <label htmlFor='booking_email' className='font-bold'>Email:</label>
                    <input type="text" id="booking_email" className='ml-2 rounded-lg px-2 text-sm w-full'/>
                </div>
                
                <div className='flex text-xl my-2'>
                    <label htmlFor='booking_phone' className='font-bold'>Phone.No:</label>
                    <input type="text" id="booking_phone" className='ml-2 rounded-lg px-2 text-sm w-full'/>
                </div>
                
                <div className='flex text-xl my-2'>
                    <label htmlFor='booking_time' className='font-bold'>Select Time (Opening Hour 13:00 - 23:00): </label>
                    <input type="time" id="booking_time" className='ml-2 rounded-lg px-2 text-sm'/>
                </div>
                <div className='text-xl'>
                    <p className='font-bold'>Are you a member?</p>
                    <input type="radio" id="member" name="ismember" value="Member"/> Yes
                    <input type="radio" id="nonmember" name="ismember" value="Nonmember"/>No
                </div>

                <input type="submit" value="Booking" className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-8 cursor-pointer transition duration-200'/>
            </form>
        </div>
    )
}
export default Booking