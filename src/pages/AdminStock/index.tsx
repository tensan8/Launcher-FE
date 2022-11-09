import * as React from 'react'
import { Button, Table, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import data from './stockdata.json';
import './index.css'

const Stock = (): JSX.Element => {

    // const [dataSource, setdataSource] = useState([]);
    // const [editingValue, setEditValue] = useState([null]);

    // useEffect(()=>{
    //     const data = [];
    //     for (let index = 0; index < 7; index++){
    //         data.push({
    //             key: `${index}`,
    //             name: `Name ${index}`,
    //             quantity: `Quantity ${index}`,
    //         });
    //     }
    //     // setdataSource(data);
    // },[]);

    // const columns = [
    //     {
    //         title:'Name',
    //         dataIndex: 'name',
    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'quantity',

    //         render:(text:any, record:any)=>{
    //             if(editingValue === record.key){
    //                 return (
    //                     <Form.Item
    //                     name = 'name'
    //                     rules={[{
    //                         required:true,
    //                         message:"Please enter value",
    //                     },
    //                 ]}
    //                 >
    //                     <Input/>
    //                 </Form.Item>
    //                 )
    //             }else{
    //                 return <p>{text}</p>
    //             }
    //         }
    //     },
    //     {
    //         title: 'Actions',
    //         render: (_: any,record:any)=>{
    //             return (
    //                 <div>
    //                     <Button type='link' onClick={()=>{
    //                         setEditValue(record.key)
    //                     }}>Edit</Button>
    //                     <Button type='link'>Save</Button>
    //                 </div>
    //             );
    //         },
    //     },
    // ];

    // return(
    //     <div>
    //         <header>
    //             <Form>
    //                 <Table
    //                 columns={columns}
    //                 dataSource={dataSource}>

    //                 </Table>
    //             </Form>
    //         </header>
    //     </div>
    // );

    const [passdatabases] = useState(data);

    return (
        <div className="database-container">
            <table className="db-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {passdatabases.map((passdatabase)=> (
                <tr>
                <td>{passdatabase.Name}</td>
                <td>{passdatabase.Price}</td>
                <td>{passdatabase.Stock}</td>
                <td><button>Edit</button></td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>
    );
};


export default Stock;