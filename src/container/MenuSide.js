import React, { Component } from 'react';
import './MenuSide.css';
import { NavLink } from 'react-router-dom';


class MenuSide extends Component {
    render() {
        return (
            <div className='layoutContainer d-none  d-md-inline-block'>
                <div className='menuSide sb-sidenav'>
                    <div className='menuSide-item'>
                        <ul className="menuSide-nav">
                            <NavItem path="/home" itemName="User Information" icon = {<i className="nav-icon fa-solid fa-users"></i>}/>
                            <NavItem path="#!" itemName="Computer Information" icon = {<i className="nav-icon fa-solid fa-network-wired"></i>}/>
                            <NavItem path="#!" itemName="Printer IP Address" icon = {<i className="nav-icon fa-solid fa-print"></i>}/>
                            <NavItem path="#!" itemName="Documents" icon = {<i className="nav-icon fa-regular fa-folder-open"></i>}/>
                            
                        </ul>
                        
                    </div>

                    <div className='menuSide-footer'>
                        <div className="small">Logged in as</div>
                        <i class="fa-solid fa-diagram-project"></i>
                        <span className="ml-2">Foxlink IT</span>
                    </div>

                    
                </div>
            </div>
            
        );
    }
}

function NavItem(props){
    return(
        <li>
            <NavLink to={props.path}  className="nav-link">{props.icon}  {props.itemName}</NavLink>
        </li>
    )
}
export default MenuSide;