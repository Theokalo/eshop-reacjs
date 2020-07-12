import React from 'react'
import './Nav.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home_dir/Home'
import Cart from '../Cart_dir/Cart'
import Favourites from '../Favourite_dir/Favourite'
import EshopLogo from '../../assets/eshop_logo.png'

const Nav = () => {
    // show menu in small devices
    const Show = () => {
        document.querySelector("#nav-lists").classList.add("_Menus-show");
    }
    // hide menu in small devices
    const Hide = () => {
        document.querySelector("#nav-lists").classList.remove("_Menus-show");
    }
    return (
        <Router>
            <div className="container">
                <div className="logo">
                    <Link to='/'><img src={EshopLogo} width="110" height="35" alt="Eshop Logo"/></Link>
                </div>
                <div className="navbar">

                <div className="icon-bar" onClick={Show}>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>

                <ul id="nav-lists">
                    <li className="close"><span onClick={()=>{Hide()}}>×</span></li>
                    <li onClick={()=>{Hide()}}><Link to='/'>Home</Link></li>
                    <li onClick={()=>{Hide()}}><Link to='/favourites'>Favourites</Link></li>
                    <li style={{marginTop:"4%"}} className="logo" onClick={()=>{Hide()}}><Cart /></li>
                </ul>

                </div>
            </div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/favourites' component={Favourites} />
          </Switch>
        </Router>
    )
}

export default Nav;