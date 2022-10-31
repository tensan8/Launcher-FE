import * as React from 'react'
import logo from '../../images/nekonya.jpg'
import drinks from '../../images/drink.png'
import table from '../../images/table.jpg'
import './index.css'

const Dashboard = (): JSX.Element => {
  return (
    <div className="dashboard">
		<div className="dashboard_box">
            <div className='mytable'>
                <h1 className="para0"> Neko Neko Nya </h1>
                <img src={logo} alt="logo" className='nekonya'></img>
            </div>
			<div className="dashboard_container">	
					<a href="/">
						<div className="catbox">
							<img src={drinks} alt="drinks" />
							<span>Drinks</span>
						</div>
					</a>
							
					<a href="/Table">
						<div className="catbox">
							<img src={table} alt="table"/>
							<span>Tables</span>
						</div>
					</a>
			</div>
		</div>
	</div>
  )
}

export default Dashboard
