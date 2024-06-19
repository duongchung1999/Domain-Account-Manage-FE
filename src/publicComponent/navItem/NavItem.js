import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

function NavItem(props){
    return(
        <li>
            <NavLink to={props.path}  className ="nav-link">{props.icon}  {props.itemName}</NavLink>
        </li>
    )
}
export default NavItem