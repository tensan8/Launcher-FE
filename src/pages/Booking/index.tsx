import * as React from 'react';
import logo from '../../images/nekonya.jpg'

const Booking = (): JSX.Element => {
    return (
        <div className="flex ">
            <h1>Neko Neko Nya</h1>
            <img src={logo} alt="logo" className='nekonya'></img>
            <form className="p-10 rounded-lg shadow-lg bg-white w-3/6 mx-auto my-auto">
                <label>TableNo: </label>
                <p>1</p>

                <label>Enter your Name:</label>
                <input type="text" id="booking_name"/><br/>

                <label>Enter your Email:</label>
                <input type="text" id="booking_email"/><br/>

                <label>Enter your Phone Number:</label>
                <input type="text" id="booking_phone"/><br/>

                <label>Select Time (Opening Hour 13:00 - 23:00): </label>
                <input type="time" id="booking_time"/><br/>

                <p>Are you a member?</p>
                <input type="radio" id="member" value="Member"/>
                <label>Yes</label>
                <input type="radio" id="nonmember" value="Nonmember"/>
                <label>No</label><br/>

                <input type="submit" value="Booking"/>
            </form>
        </div>
    )
}
export default Booking