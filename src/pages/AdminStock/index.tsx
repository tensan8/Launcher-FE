import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css'
import BackButton from '../BackButton/backbutton';
import {BookingListState, GetSnackOrderState, SnackState} from "../../type";
import {connect} from "react-redux";
import {getAllSnacks, resetSnack, updateSnack} from "../../store/actions/snacksAction";
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
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

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
    updateSnack?: (snackId: number, updatedData: {name?: string, currentStock?: string, price?: string}) => {}
    resetSnack?: () => {}
}


const Stock = (props:SnacksProps): JSX.Element => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [targetSnack, setTargetSnack] = React.useState<SnackDTO>()
    const snackNameRef= React.useRef<HTMLInputElement>(null)
    const priceRef = React.useRef<HTMLInputElement>(null)
    const stockRef = React.useRef<HTMLInputElement>(null)

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

    
    React.useEffect(()=>{
      if(props.getAllSnacks !== undefined && props.GetAllOrder !== undefined && props.GetAllBookingVis !== undefined){
          if (props.bookingList?.bookingList.length === 0) {
              props.GetAllBookingVis()
          }

          if (props.orderList?.orderList.length === 0) {
              props.GetAllOrder()
          }

          if (props.snackList?.snackList.length === 0) {
              props.getAllSnacks()
          }
      }
    },[props, props.snackList?.snackList.length])

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

    const handleEdit = React.useCallback((targetSnack: SnackDTO) => {
        setTargetSnack(targetSnack)
        setIsDialogOpen(true)
    }, [])

    const updateSnack = React.useCallback(() => {
        const updatedData = {
            name: snackNameRef.current?.value,
            currentStock: stockRef.current?.value,
            price: priceRef.current?.value
        }

        if (props.updateSnack !== undefined && targetSnack !== undefined) {
            props.updateSnack(targetSnack?.snackId, updatedData)
        }

        if (props.resetSnack !== undefined) {
            props.resetSnack()
        }

        setIsDialogOpen(false)
    }, [props, targetSnack])

    return (
        <div>
          <div className='my-8 mx-12'>
            <BackButton backPath = "/"/>
          </div>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth={true} maxWidth='sm'>
                <DialogTitle>Update Snack</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="normal"
                        placeholder={targetSnack?.name}
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={snackNameRef}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="normal"
                        placeholder={targetSnack?.price.toString()}
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={priceRef}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="normal"
                        placeholder={targetSnack?.currentStock.toString()}
                        label="Stock"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={stockRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateSnack}>Confirm</Button>
                </DialogActions>
            </Dialog>

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
                                <td><button onClick={() => handleEdit(snack)}>Edit</button></td>
                            </tr>
                            </tbody>
                        )
                    })
                }
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

export default connect(mapStateToProps,{getAllSnacks,GetAllOrder, GetAllBookingVis, updateSnack, resetSnack})(Stock);
