import React, { Component } from 'react';
import './MenuSide.css';
import { NavLink } from 'react-router-dom';


class MenuSide extends Component {
    render() {
        const { isMenuSideVisible } = this.props;
        var userName = localStorage.getItem("name");
        const item = JSON.parse(userName)
        // console.log(userName);
        return (
            <div className={isMenuSideVisible ? 'layoutContainer d-none d-md-inline-block' : 'layoutContainer d-none d-md-inline-block'}>
            {/* <div className={isMenuSideVisible ? 'layoutContainer d-none d-md-inline-block' : 'layoutContainer d-none d-md-inline-block'}> */}
                <div className='menuSide sb-sidenav'>
                    <div className='menuSide-item'>
                        <ul className="menuSide-nav">
                            <NavItem path="/home" itemName="User Information" icon = {<i className="nav-icon fa-solid fa-users"></i>}/>
                            <NavItem path="/computer" itemName="Computer Information" icon = {<i className="nav-icon fa-solid fa-network-wired"></i>}/>
                            <NavItem path="/printer" itemName="Printer IP Address" icon = {<i className="nav-icon fa-solid fa-print"></i>}/>
                            <NavItem path="/phone" itemName="Phone Numbers" icon = {<i className="nav-icon fa-solid fa-phone"></i>}/>
                            <NavItem path="/document" itemName="Documents" icon = {<i className="nav-icon fa-regular fa-folder-open"></i>}/>
                            <NavItem path="/history" itemName="History" icon = {<i className="nav-icon fa-solid fa-clock-rotate-left"></i>}/>
                            
                        </ul>
                        
                    </div>

                    <div className='menuSide-footer'>
                        <div className="small">Logged in as</div>
                        <i className="fa-solid fa-diagram-project"></i>
                        <span className="ml-2">{userName?item.value:"Guest"}</span>
                    </div>

                    
                </div>
            </div>
            
        );
    }
}

function NavItem(props){
    return(
        <li>
            <NavLink to={props.path}  className ="nav-link">{props.icon}  {props.itemName}</NavLink>
        </li>
    )
}
export default MenuSide;