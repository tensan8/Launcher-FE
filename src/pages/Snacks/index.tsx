import * as React from 'react';
import logo from '../../images/nekonya.jpg'
import cola from '../../images/cola.png'
import mdew from '../../images/mdew.png'
import Sup from '../../images/7up.png'
import superring from '../../images/superring.png'
import mspotato from '../../images/mp.png'

const Snacks = (): JSX.Element => {
    return(
        <div>
            <h1 className="text-center">Neko Neko Nya</h1>
            <img src={logo} alt="logo"></img>

            <form className='p-10 rounded-lg shadow-lg bg-white w-3/6 mx-auto my-auto'>
                <fieldset>
                    <legend>Ordering the Snack Here</legend>
                    <div className='form-group'>
                    <label className='form-label inline-block my-3'>Table:
                    <select id="country" name="country">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    </label>
                    </div>
                    <div className='form-group '>
                        <div className='flex'>
                            <img src={cola} alt='cola' className='w-12'/>
                            <div className='relative'>
                                <p className='text-lg font-bold'>Cola</p>
                                <p className='text-sm'>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label className='ml-10'>Quantity:
                                <input type="number" id="cola" name='cola' min='0' max='5'/>
                                </label>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={mdew} alt='mountaindew' className='w-12'/>
                            <div className='relative'>
                                <p className='text-lg font-bold'>Mountain Dew</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label className='ml-10'>Quantity:
                                <input type="number" id="mdew" name='mdew'min='0' max='5'/>
                                </label>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={Sup} alt='7up' className='w-12'/>
                            <div className='relative'>
                                <p className='text-lg font-bold'>7up</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity:
                                <input type="number" id="7up" name='7up' min='0' max='5'/>
                                </label>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={superring} alt='superring' className='w-12'/>
                            <div className='relative'>
                                <p className='text-lg font-bold'>Super Ring</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity:
                                <input type="number" id="superring" name='superring' min='0' max='5'/>
                                </label>
                            </div>
                        </div>
                        <div className='flex'>
                            <img src={mspotato} alt='misterpotato' className='w-12'></img>
                            <div className='relative'>
                                <p className='text-lg font-bold'>Mister Potato</p>
                                <p>RM 2.00</p>
                            </div>
                            <div className='relative'>
                                <label>Quantity:
                                <input type="number" id="mpotatp" name='mpotatp' min='0' max='5'/>
                                </label>
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