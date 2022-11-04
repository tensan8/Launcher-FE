import * as React from 'react';
import logo from '../../images/nekonya.jpg'
import cola from '../../images/cola.png'
import pepsi from '../../images/pepsi.png'
import Sup from '../../images/7up.png'
import superring from '../../images/superring.png'
import mspotato from '../../images/mp.png'

const Snacks = (): JSX.Element => {
    return(
        <div>
            <h1>Neko Neko Nya</h1>
            <img src={logo} alt="logo" className='items-center'></img>

            <form className='block p-10 rounded-lg shadow-lg bg-white max-w-sm mx-auto my-auto'>
                <fieldset>
                    <legend>Ordering the Snack Here</legend>
                    <div className='form-group'>
                    <label className='form-label inline-block my-3'>Table: </label>
                    <select id="country" name="country">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    </div>
                    <div className='form-group '>
                        <div className='flex'>
                            <img src={cola} className='w-12'></img>
                            <div className='relative'>
                                <p className='text-lg font-bold'>Cola</p>
                                <p className='text-sm'>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity: </label>
                                <input type="number" id="cola" name='cola' min='0' max='10' value='0'/>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={pepsi} className='w-12'></img>
                            <div className='relative'>
                                <p className='text-lg font-bold'>Pepsi</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity: </label>
                                <input type="number" id="pepsi" name='pepsi'min='0' value='0'/>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={Sup} className='w-12'></img>
                            <div className='relative'>
                                <p>7up</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity: </label>
                                <input type="number" id="7up" name='7up' min='0' value='0'/>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={superring} className='w-12'></img>
                            <div className='relative'>
                                <p>Super Ring</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity: </label>
                                <input type="number" id="superring" name='superring' min='0' value='0'/>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={mspotato} className='w-12'></img>
                            <div className='relative'>
                                <p>Mister Potato</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity: </label>
                                <input type="number" id="mpotatp" name='mpotatp' min='0' value='0'/>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Order" className=""/>
                </fieldset>
            </form>
        </div>
    )
}
export default Snacks