import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css'
import BackButton from '../BackButton/backbutton';
import {GetSnackOrderState, SnackState} from "../../type";
import {connect} from "react-redux";
import {getAllSnacks, resetSnack, updateSnack} from "../../store/actions/snacksAction";
import {GetAllOrder} from "../../store/actions/orderListAction";
import {SnackDTO} from "../../dtos/snackDTO";
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
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

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

interface SnacksProps {
    snackList?: {snackList: SnackDTO[]}
    orderList?: {orderList:OrderListDTO[]}
    getAllSnacks?: () => {}
    GetAllOrder?: () =>{}
    updateSnack?: (snackId: number, updatedData: {name?: string, currentStock?: string, price?: string}) => {}
    resetSnack?: () => {}
}

const Stock = (props:SnacksProps): JSX.Element => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [targetSnack, setTargetSnack] = React.useState<SnackDTO>()
    const snackNameRef= React.useRef<HTMLInputElement>(null)
    const priceRef = React.useRef<HTMLInputElement>(null)
    const stockRef = React.useRef<HTMLInputElement>(null)
    const itemname:String[] = []
    const itemquantity: number[] = []

    React.useEffect(()=>{
      if(props.getAllSnacks !== undefined && props.GetAllOrder !== undefined){
        if (props.orderList?.orderList.length === 0) {
          props.GetAllOrder()
        }

        if (props.snackList?.snackList.length === 0) {
          props.getAllSnacks()
        }
      }
    }, [props, props.snackList?.snackList.length])

    React.useEffect(()=>{

      if(props.orderList !== undefined){
        props.orderList.orderList.forEach((orderdata: OrderListDTO, index:number)=>{
          if(!itemname.includes(orderdata.SnackName)){
            itemname.push(
              orderdata.SnackName
            )
          }
          if(!itemquantity.includes(orderdata.totalQuantity)){
            itemquantity.push(
              orderdata.totalQuantity
            )
          }
        })
      }
    },[props.orderList?.orderList]);

    const datavisual = {
      type:'bar',
      labels: itemname,
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
        <BackButton backPath = "/"/>

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
        </div>
    );
};

const mapStateToProps=(snackState: SnackState | GetSnackOrderState):any =>({
  snackList: 'snackList' in snackState && snackState.snackList,
  orderList: 'orderList' in snackState && snackState.orderList
});


export default connect(mapStateToProps,{getAllSnacks,GetAllOrder, updateSnack, resetSnack})(Stock);