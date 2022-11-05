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
            
            <form className="flex flex-col justify-center py-14" onSubmit={handleSubmit}>
                <div className='flex'>
                    <label className='font-bold'>TableNo:</label>
                    <p className='ml-2'>1</p>
                </div>
                <div className='flex text-xl'>
                    <label htmlFor="booking_name" className='font-bold'>Your Name:</label>
                    <input type="text" id="booking_name" size={50} value={NameValue} onChange={e=>setNameValue(e.target.value)} className='ml-2 outline outline-offset-2 outline-blue-500 bg-transparent'/>    
                </div>
                <div className='flex'>
                    <label htmlFor='booking_email'>Your Email:</label>
                    <input type="text" id="booking_email"/>
                </div>
                
                <div className='flex'>
                    <label htmlFor='booking_phone'>Enter your Phone Number:</label>
                    <input type="text" id="booking_phone"/>
                </div>
                
                <div className='flex'>
                    <label htmlFor='booking_time'>Select Time (Opening Hour 13:00 - 23:00): </label>
                    <input type="time" id="booking_time"/>
                </div>
                <div className='flex'>
                    <p>Are you a member?</p>
                    <input type="radio" id="member" value="Member"/>
                    <label htmlFor='member'>Yes</label>
                    <input type="radio" id="nonmember" value="Nonmember"/>
                    <label htmlFor='nonmember'>No</label>
                </div>

                <input type="submit" value="Booking" className='w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-16 cursor-pointer transition duration-200'/>
            </form>
        </div>
    )
}
export default Booking