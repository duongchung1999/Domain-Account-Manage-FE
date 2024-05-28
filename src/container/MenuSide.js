import React, { Component } from 'react';
import './MenuSide.css';
import { NavLink } from 'react-router-dom';


class MenuSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          viewMenuSide2nd: localStorage.getItem("viewItAsset")?localStorage.getItem("viewItAsset"):false,
        };
    }
    componentDidUpdate(prevState){
        if(prevState.viewMenuSide2nd != this.state.viewMenuSide2nd){
            this.renderItemAsset();
            localStorage.setItem('viewItAsset',this.state.viewMenuSide2nd)
        }
    }
    viewItem = () =>{
        this.setState(prevState =>({
            viewMenuSide2nd: !prevState.viewMenuSide2nd
            
        }));
    }
    renderItemAsset = () =>{
        if(this.state.viewMenuSide2nd){
            return(
                <div className='menuSide-2nd'>
                    <NavItem path="/cabinet" itemName="Cabinet" icon = {<i class="nav-icon fa-solid fa-boxes-stacked"></i>}/>
                    <NavItem path="/itAsset" itemName="Asset" icon = {<i class="nav-icon fa-solid fa-dolly"></i>}/>
                    <NavItem path="/cabinetAsset" itemName="Cabinet Asset" icon = {<i class="nav-icon fa-solid fa-boxes-packing"></i>}/>
                </div>
            )
        }
        return null;
        
    }
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
                            
                            <li className='menuSide-it-asset' onClick={this.viewItem}>
                                <a className='nav-link'>
                                    <i class="nav-icon fa-solid fa-toolbox"></i>
                                    IT Asset
                                    {this.renderItemAsset()}
                                    
                                    
                                </a>
                            </li>
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

function NavItem2nd(props){
    return(
        <li>
            <NavLink to={props.path}  className ="nav-link-2nd">{props.icon}  {props.itemName}</NavLink>
        </li>
    )
}
export default MenuSide;