import * as React from 'react';
import './index.css'

const Table = (): JSX.Element => {
  return (
    <div className='booking_seat'>
    <ul className="showcase">
      <li>
        <div className="seat"></div>
        <small>Available</small>
      </li>

      <li>
        <div className="booked"></div>
        <small>Booked</small>
      </li>

      <li>
        <div className="occupied"></div>
        <small>Not Available</small>
      </li>
    </ul>

    {/* <div className="container">
        <div className="row">
          <div className="tablestatus"></div>
          <div className="tablestatus"></div>
          <div className="tablestatus"></div>
          <div className="tablestatus"></div>
        </div>
    </div> */}
    
    <div className="grid grid-cols-4 gap-20">
      <div className="tablestatus">1</div>
      <div className="tablestatus">2</div>
      <div className="tablestatus">3</div>
      <div className="tablestatus">4</div>
      <div className="tablestatus">5</div>
      <div className="tablestatus">6</div>
      <div className="tablestatus">7</div>
      <div className="tablestatus">8</div>
    </div>

    </div>

    
  )
}

export default Table