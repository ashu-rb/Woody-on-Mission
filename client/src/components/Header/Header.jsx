import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from "react-router-dom";
import "./Header.css";
import "../ParentBounty/ParentBounty";

class Header extends Component {
    render() {
        return (
            <div>
                <div>
                    <Navbar expand="lg" variant="light" bg="fade">
                        <h1 id="navbarLogo" ><NavLink id="headBtn" to="/"  activeClassName="selected">Woody On Mission</NavLink></h1>
                        <div className="ml-3 headBtn"><NavLink id="headBtn" to="/ParentBounty" activeClassName="selected" text >Mission Board</NavLink></div> 
                        <NavLink id="headBtn" to="/"><div className="ml-3 headBtn"><a href="http://localhost:3002/mint?imgURL=https://i.redd.it/6aqpf0sz91u91.jpg&caption=You%20have%20unlocked%20your%20level-3%20Cowboy%20NFT.%20Congratulations%20on%20completing%20your%20tasks%20well!">Redeem Rewards</a></div> </NavLink>
                    </Navbar>
                </div>
            </div>
        )
}
}

export default Header;