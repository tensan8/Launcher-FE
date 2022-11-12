import * as React from 'react';
import logo from '../../images/nekonya.jpg'
import BackButton from '../BackButton/backbutton';
import {SnackState} from "../../type";
import {connect} from "react-redux";
import {getAllSnacks} from "../../store/actions/snacksAction";
import {SnackDTO} from "../../dtos/snackDTO";

interface SnacksProps {
    snackList?: {snackList: SnackDTO[]}
    getAllSnacks?: () => {}
}

const Snacks = (props: SnacksProps): JSX.Element => {
    React.useEffect(() => {
        if(props.getAllSnacks !== undefined) {
            props.getAllSnacks()
        }
    }, //eslint-disable-next-line
        [])

    return(
        <div>
            <BackButton backPath = "/"/>
            <div className='my-6 mx-auto'>
                    <h1 className='text-center font-bold text-5xl text-white my-2'>Neko Neko Nyaa</h1>
                    <img src={logo} alt="logo" className='mx-auto'/>
            </div>

            <form className='p-10 rounded-lg shadow-lg bg-white md:w-3/6 w-4/6 mx-auto my-6'>
                <fieldset>
                    <legend className='font-bold text-center text-2xl mb-5'>Ordering the Snack Here</legend>
                    <div className='form-group'>
                        <label className='font-bold text-lg'>Table:</label>
                        
                        <select id="country" name="country">
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
                                                <input type="number" id={snack.name} name={snack.name} min='0' max='5' className="border-2 border-stone-700 p-1"/>
                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                    <input type="submit" value="Order" className="w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-8 cursor-pointer transition duration-200"/>
                </fieldset>
            </form>
        </div>
    )
}

const mapStateToProps = (snackState: SnackState): any => ({ snackList: snackState.snackList })

export default connect(mapStateToProps, { getAllSnacks })(Snacks)
