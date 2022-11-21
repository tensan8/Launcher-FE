import * as React from 'react';
import logo from '../../images/nekonya.jpg'
import BackButton from '../BackButton/backbutton';
import {SnackOrderResponse, SnackOrderState, SnackState} from "../../type";
import {connect} from "react-redux";
import {getAllSnacks} from "../../store/actions/snacksAction";
import {SnackDTO} from "../../dtos/snackDTO";
import SnackOrderMapper from "../../utils/snackOrderMapper";
import {newSnackOrder} from "../../store/actions/snackOrderAction";
import {SnackOrderDTO} from "../../dtos/snackOrderDTO";
import {Dialog, DialogContent, DialogContentText, DialogTitle, snackbarContentClasses} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Item from 'antd/lib/list/Item';
import getSnackOrder from '../Webhook/snackorder';

interface SnacksProps {
    snackList?: {snackList: SnackDTO[]}
    snackOrder?: {snackOrder: SnackOrderResponse[]}
    getAllSnacks?: () => {}
    newSnackOrder?: (order: SnackOrderDTO[]) => {}
    userId: number
}

type SnackInfo = {
    name: string,
    qty: number,
    price: number
}


const Snacks = (props: SnacksProps): JSX.Element => {
    const [order, setOrder] = React.useState({})
    const [isSummary, setIsSummary] = React.useState(false)
    const navigate = useNavigate()
    const [grandTotal, setGrandTotal] = React.useState(0)
    const TableID = React.useRef<HTMLSelectElement>(null)

    const snackOrders = React.useMemo<SnackInfo[]>(() => {
        return []
    }, [])

    React.useEffect(() => {
        if(props.getAllSnacks !== undefined) {
            props.getAllSnacks()
        }
    }, //eslint-disable-next-line
        [])

    React.useEffect(() => {
        setGrandTotal(0)
        let total = 0

        if(props.snackOrder !== undefined && props.snackOrder.snackOrder !== undefined) {
            props.snackOrder.snackOrder.forEach((response: SnackOrderResponse) => {
                if(response.totalAmount !== undefined) {
                    total = total + response.totalAmount
                }
            })
        }

        setGrandTotal(total)
    }, [props.snackOrder, grandTotal])

    const handleOnChange = React.useCallback((e: React.FormEvent<HTMLInputElement>, priceProp: number) => {
        const snackId = e.currentTarget.id
        const snackQty = e.currentTarget.value
        const snackName = e.currentTarget.name

        setOrder((prevState) => ({
            ...prevState,
            [snackId]: snackQty
        }))

        let isIncluded = false

        if(snackOrders.length > 0) {
            snackOrders.forEach((snack: SnackInfo, index: number) => {
                if(snack.name === snackName) {
                    if(snack.qty !== Number(snackQty)) {
                        snackOrders[index] = {
                            name: snack.name,
                            qty: Number(snackQty),
                            price: snack.price
                        }
                    }
                    isIncluded = true
                }
            })
        }

        if(!isIncluded) {
            snackOrders.push({
                name: snackName,
                qty: Number(snackQty),
                price: priceProp
            })
        }
    }, [])

    const handleDialogClose = React.useCallback(() => {
        setIsSummary(false)

        const orderdata ={
            Table: TableID.current?.value,
            Order: snackOrders,
            Total: "RM" + grandTotal.toString()
        }

        PostToDiscord(orderdata);
        navigate('/')
    }, [navigate, snackOrders, grandTotal])

    const {Send} = getSnackOrder();

    const PostToDiscord = (orderdata: {[key:string]:any}) => {
        const order_detail = Object.entries(orderdata)
            .map((d) => {
                if(d[0] !== 'Order') {
                    return `${d[0]}: ${d[1]}`
                }

                let completeOrder = ''
                d[1].forEach((order: SnackInfo) => {
                    completeOrder = completeOrder + order.name + ' (RM ' + order.price + " x" + order.qty + "), "
                })
                return `Order: ${completeOrder}`
            })
            .join("\n");

        Send(order_detail)
    };

    const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        const orderArr = SnackOrderMapper(order, props.userId)
        if(props.newSnackOrder !== undefined) {
            props.newSnackOrder(orderArr)
        }
        setIsSummary(true)
    }, [order, props])
    

    return(
        <div>
            <BackButton backPath = "/"/>
            <div className='my-6 mx-auto'>
                    <h1 className='text-center font-bold text-5xl text-white my-2'>Neko Neko Nyaa</h1>
                    <img src={logo} alt="logo" className='mx-auto'/>
            </div>

            <Dialog open={isSummary} onClose={handleDialogClose}>
                <DialogTitle>{"Order has been placed"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please pay RM{grandTotal.toFixed(2)} to the admin</DialogContentText>
                </DialogContent>
            </Dialog>

            <form className='p-10 rounded-lg shadow-lg bg-white md:w-3/6 w-4/6 mx-auto my-6'>
                <fieldset>
                    <legend className='font-bold text-center text-2xl mb-5'>Ordering the Snack Here</legend>
                    <div className='form-group'>
                        <label className='font-bold text-lg'>Table:</label>

                        <select id="tableid" name="tableid" ref={TableID}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>

                        <div className='flow-root mb-5'>
                            {props.snackList !== undefined &&
                                props.snackList.snackList.length > 0 &&
                                props.snackList.snackList.map((snack: SnackDTO, index: number) => {
                                    return(
                                        <div key={index} className='flex justify-between mt-11'>
                                            <div className='block'>
                                                <img src={snack.imageURL} alt={snack.name} className='w-20 h-20 object-cover'/>
                                                <div>
                                                    <p className='text-lg font-bold'>{snack.name}</p>
                                                    <p className='text-lg font-bold'>RM {snack.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className='h-full my-auto'>
                                                <label htmlFor={snack.name} className='text-lg font-bold'>Quantity: </label>
                                                <input type="number" onChange={(e) => handleOnChange(e, snack.price)} id={snack.snackId.toString()} name={snack.name} placeholder="0" min='0' max='5' className="border-2 border-stone-700 p-1"/>
                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Order"
                        onClick={handleSubmit}
                        className="w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-8 cursor-pointer transition duration-200"
                    />
                </fieldset>
            </form>
        </div>
    )
}

const mapStateToProps = (snackState: SnackState | SnackOrderState): any => ({
    snackList: "snackList" in snackState && snackState.snackList,
    snackOrder: "snackOrder" in snackState && snackState.snackOrder
})

export default connect(mapStateToProps, { getAllSnacks, newSnackOrder })(Snacks)
