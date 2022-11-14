import * as React from 'react'
import logo from '../../images/nekonya.jpg'
import cola from '../../images/cola.png'
import mdew from '../../images/mdew.png'
import Sup from '../../images/7up.png'
import superring from '../../images/superring.png'
import mspotato from '../../images/mp.png'
import BackButton from '../BackButton/backbutton'

const Snacks = (): JSX.Element => {
  return (
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
                            <img src={cola} alt='cola' className='w-12'/>
                            <div className='float-left '>
                                <p className='text-lg font-bold'>Cola</p>
                                <p className='text-lg font-bold'>RM 2.00</p>
                            </div>
                            <div className='float-right '>
                                <label htmlFor='cola' className='text-lg font-bold'>Quantity: </label>
                                <input type="number" id="cola" name='cola' min='0' max='5' className="border-2 border-stone-700 p-1"/>
                            </div>
                        </div>
                        <div className='flow-root mb-5'>
                            <img src={mdew} alt='mountaindew' className='w-12'/>
                            <div className='float-left'>
                                <p className='text-lg font-bold'>Mountain Dew</p>
                                <p className='text-lg font-bold'>RM 2.00</p>
                            </div>
                            <div className='float-right'>
                                <label htmlFor='mdew' className='text-lg font-bold'>Quantity: </label>
                                <input type="number" id="mdew" name='mdew'min='0' max='5' className="border-2 border-stone-700 p-1"/>
                            </div>
                        </div>
                        <div className='flow-root mb-5'>
                            <img src={Sup} alt='7up' className='w-12'/>
                            <div className='float-left'>
                                <p className='text-lg font-bold'>7up</p>
                                <p className='text-lg font-bold'>RM 2.00</p>
                            </div>
                            <div className='float-right'>
                                <label htmlFor='7up' className='text-lg font-bold'>Quantity: </label>
                                <input type="number" id="7up" name='7up' min='0' max='5' className="border-2 border-stone-700 p-1"/>                            
                            </div>
                        </div>
                        <div className='flow-root mb-5'>
                            <img src={superring} alt='superring' className='w-12'/>
                            <div className='float-left'>
                                <p className='text-lg font-bold'>Super Ring</p>
                                <p className='text-lg font-bold'>RM 2.00</p>
                            </div>
                            <div className='float-right'>
                                <label htmlFor='superring' className='text-lg font-bold'>Quantity: </label>
                                <input type="number" id="superring" name='superring' min='0' max='5' className="border-2 border-stone-700 p-1"/>
                            </div>
                        </div>
                        <div className='flow-root mb-5'>
                            <img src={mspotato} alt='misterpotato' className='w-12'></img>
                            <div className='float-left'>
                                <p className='text-lg font-bold'>Mister Potato</p>
                                <p className='text-lg font-bold'>RM 2.00</p>
                            </div>
                            <div className='float-right'>
                                <label htmlFor='mpotato' className='text-lg font-bold'>Quantity: </label>
                                <input type="number" id="mpotato" name='mpotato' min='0' max='5' className="border-2 border-stone-700 p-1"/>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Order" className="w-full bg-[#3274d6] hover:bg-[#2868c7] text-white font-medium py-2 mt-8 cursor-pointer transition duration-200"/>
                </fieldset>
            </form>
        </div>
  )
}
export default Snacks
