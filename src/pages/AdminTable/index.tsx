import * as React from 'react'
import { useState } from 'react';
import logo from '../../images/nekonya.jpg'
import BackButton from '../BackButton/backbutton';
import data from './userinfo.json';

const AdminTableStatus = (): JSX.Element => {
    
    const [passdatabases] = useState(data);

    return(
        <div>
        <BackButton backPath = "/"/>
        <div className="grid place-items-center my-16">
            
            <div className='flex my-3'>
                <h1 className='font-bold text-5xl text-white my-auto'>Neko Neko Nyaa</h1>
                <img src={logo} alt="logo" className='w-16'/>
            </div>
            
            <table className="db-table">
            <thead>
            <tr>
                <th>Table</th>
                <th>UserID</th>
                <th>Date</th>
                <th>StartTime</th>
                <th>EndTime</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {passdatabases.map((passdatabase)=> (
                <tr>
                <td>{passdatabase.Table}</td>
                <td>{passdatabase.UserID}</td>
                <td>{passdatabase.Date}</td>
                <td>{passdatabase.StartTime}</td>
                <td>{passdatabase.EndTime}</td>
                <td><button>Edit</button></td>
            </tr>
            ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}


export default AdminTableStatus;