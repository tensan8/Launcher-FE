import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css'
import BackButton from '../BackButton/backbutton';
import {BookingListState, GetSnackOrderState, SnackState} from "../../type";
import {connect} from "react-redux";
import {getAllSnacks} from "../../store/actions/snacksAction";
import {GetAllOrder} from "../../store/actions/orderListAction";
import {GetAllBookingVis } from '../../store/actions/bookingAction';
import {SnackDTO} from "../../dtos/snackDTO";
import { BookingDayDTO } from '../../dtos/bookingdataDTO';
import { OrderListDTO } from '../../dtos/orderListDTO';
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

  export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top Sales',
      },
    },
  };

  export const options2 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Booking Details',
      },
    },
  };

interface SnacksProps {
    snackList?: {snackList: SnackDTO[]}
    orderList?: {orderList:OrderListDTO[]}
    bookingList?: {bookingList:BookingDayDTO[]}
    getAllSnacks?: () => {}
    GetAllOrder?: () =>{}
    GetAllBookingVis?:() => {}
}


const Stock = (props:SnacksProps): JSX.Element => {

    const itemname = React.useMemo<String[]>(()=>{
      return []
    },[])

    const itemquantity = React.useMemo<Number[]>(()=>{
      return []
    },[])

    const bookingday = React.useMemo<Number[]>(()=>{
      return[]
    },[])

    const bookingtotal = React.useMemo<Number[]>(()=>{
      return[]
    },[])

    console.log(props.orderList)

    
    React.useEffect(()=>{
      if(props.getAllSnacks !== undefined && props.GetAllOrder !== undefined && props.GetAllBookingVis !== undefined){
        props.getAllSnacks()
        props.GetAllOrder()
        props.GetAllBookingVis()
      }
    }, //eslint-disable-next-line
      [])

    React.useEffect(()=>{
      if(props.orderList !== undefined){
        itemquantity.length = 0

        props.orderList.orderList.forEach((orderdata: OrderListDTO, index:number)=>{
          
          if(itemname !== null){ 
            if(!itemname.includes(orderdata.SnackName)){
              itemname.push(
                orderdata.SnackName
              )
            }
          }
          if(itemquantity !== null){
            if(!itemquantity.includes(orderdata.totalQuantity)){
              itemquantity.push(
                orderdata.totalQuantity
              )
            }
          }
        })
      }
    },[props.orderList?.orderList, itemname, itemquantity]);

    React.useEffect(()=>{
      if(props.bookingList !== undefined){

        props.bookingList.bookingList.forEach((bookingdata: BookingDayDTO, index:number)=>{
          
          if(bookingday !== null){ 
              bookingday.push(
                bookingdata.Day
              )
          }
          if(bookingtotal !== null){ 
            bookingtotal.push(
              bookingdata.total
            )
          }
        })
      }
    },[props.orderList?.orderList, bookingday,bookingtotal]);

  

    const datavisual = {
      labels: itemname ,
      datasets: [{
      label: 'Snack Name',
      data: itemquantity,
      backgroundColor: [
        'rgb(153, 255, 255)'
      ],
      borderColor:'black',
      borderWidth: 1,
      }]
    };

    const datavisual2 = {
      labels: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] ,
      datasets: [{
      label: 'Day',
      data: bookingday,
      backgroundColor: [
        'rgb(153, 255, 255)'
      ],
      borderColor:'black',
      borderWidth: 1,
      }]
    };

  

    return (
        <div>
          <div className='my-8 mx-12'>
          <BackButton backPath = "/"/>
          </div>
        
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
        <div className='mx-auto w-[1000px] bg-stone-400 p-4 my-10'>
          <Bar
          data={datavisual}
          options={options}
          />
        </div>
        <div className='mx-auto w-[1000px] bg-stone-400 p-4 my-10'>
          <Bar
          data={datavisual2}
          options={options2}
          />
        </div>
        </div>
    );
};

const mapStateToProps=(snackState: SnackState | GetSnackOrderState | BookingListState):any =>({
  snackList: 'snackList' in snackState && snackState.snackList,
  orderList: 'orderList' in snackState && snackState.orderList,
  bookingList: 'bookingList' in snackState && snackState.bookingList
})

export default connect(mapStateToProps,{getAllSnacks,GetAllOrder, GetAllBookingVis})(Stock);

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

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//     const [data, setData] = useState({
//         labels: labels,
//         datasets: [{
//         label: 'Expenses by Month',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: [
//             'rgb(153, 102, 255)'
//         ],
//         borderColor: [
//             'rgb(153, 102, 255)'
//         ],
//         borderWidth: 1
//         }]
//     });

//     const [chartData, setChartData] = useState({
//       labels: Data.map((data) => data.year), 
//       datasets: [
//         {
//           label: "Users Gained ",
//           data: Data.map((data) => data.userGain),
//           backgroundColor: [
//             "rgba(75,192,192,1)"
//           ],
//           borderColor: "black",
//           borderWidth: 2
//         }
//       ]
//     });