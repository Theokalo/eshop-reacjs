import React from 'react'
import './Footer.css'
import eshop_logo from '../../assets/eshop_logo.png'

const Footer = () => {
    return (
        <div className="footer_mini">
            <div className="footer_mini_company">
                <img className="footer_mini_company_logo" src={eshop_logo} width="140" height="35" alt="eshop logo"/>
                <p className="footer__mini__company__link--nondecored">2020 © Eshop Europe, by Theodore Kalogeropoulos</p>
            </div>
        </div>
    )
}

export default Footer;