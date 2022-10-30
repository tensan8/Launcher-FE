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
        <div className="seat selected"></div>
        <small>Selected</small>
      </li>

      <li>
        <div className="seat booked"></div>
        <small>Booked</small>
      </li>

      <li>
        <div className="seat occupied"></div>
        <small>Not Available</small>
      </li>
    </ul>

    <div className="container">
      <div className="tablelist"></div>
      <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      </div>
      </div>
  )
}

export default Table