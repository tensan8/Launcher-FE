import * as React from 'react'
import { Button, Table, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import data1 from './stockdata.json';
import './index.css'
import BackButton from '../BackButton/backbutton';
import {Data} from '../../utils/Data'
import {GetSnackOrderState, SnackState} from "../../type";
import {connect} from "react-redux";
import {getAllSnacks} from "../../store/actions/snacksAction";
import {GetAllOrder} from "../../store/actions/orderListAction";
import {SnackDTO} from "../../dtos/snackDTO";
import { OrderListDTO } from '../../dtos/orderListDTO';
import Barchart from '../DemoChart'
import {Bar} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

interface SnacksProps {
    snackList?: {snackList: SnackDTO[]}
    orderList?: {orderList:OrderListDTO[]}
    getAllSnacks?: () => {}
    GetAllOrder?: () =>{}
}

const Stock = (props:SnacksProps): JSX.Element => {

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

    const [passdatabases] = useState(data1);
    const [datavalue,setdatavalue] = React.useState ({})

    
    
    React.useEffect(()=>{
      if(props.getAllSnacks !== undefined && props.GetAllOrder !== undefined){
        props.getAllSnacks()
        props.GetAllOrder()
      }
    }, [])

    console.log(datavalue);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const [data, setData] = useState({
        labels: labels,
        datasets: [{
        label: 'Expenses by Month',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
            'rgb(153, 102, 255)'
        ],
        borderColor: [
            'rgb(153, 102, 255)'
        ],
        borderWidth: 1
        }]
    });

    const [chartData, setChartData] = useState({
      labels: Data.map((data) => data.year), 
      datasets: [
        {
          label: "Users Gained ",
          data: Data.map((data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)"
          ],
          borderColor: "black",
          borderWidth: 2
        }
      ]
    });
    

    React.useEffect(()=>{
      if(props.orderList !== undefined){
        props.orderList.orderList.map((orderdata: OrderListDTO, index:number)=>{
          console.log(orderdata.quantity)
        })
      }
    },[]);

    const [datavisual, setdatavisual] = useState({
      labels: datavalue
    });

    return (
        <div>
        <BackButton backPath = "/"/>
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
            {props.snackList !== undefined &&
            props.snackList.snackList.length > 0 &&
            props.snackList.snackList.map((snack: SnackDTO, index: number) => {
            return(
            <tbody>
              <tr key={index}>
                <td className='text-left'>{snack.name}</td>
                <td>{snack.price}</td>
                <td>{snack.currentStock}</td>
                <td><button>Edit</button></td>
              </tr>
            </tbody>
            )
          })}
            </table>
        </div>
        <Bar
        data={data}
        height={300}
        width={1000}
        />
        </div>
    );
};

const mapStateToProps=(snackState: SnackState | GetSnackOrderState):any =>({
  snackList: 'snackList' in snackState && snackState.snackList,
  orderList: 'orderList' in snackState && snackState.orderList
})

export default connect(mapStateToProps,{getAllSnacks,GetAllOrder})(Stock);