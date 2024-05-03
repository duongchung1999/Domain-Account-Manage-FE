import React, { Component } from 'react';
import './NavHeader.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
class NavHeader extends Component {
    state = {
        isDropdownOpen: false ,
        logout: false,
        // changePassword:false
    };
    

    toggleDropdown = () => {
        this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }));
    };
    toggleMenuSideVisibility = () => {
        this.props.toggleMenuSide();
    }
    loginFunction = () => {
        this.setState({
            logout:true
        });
    }
    LogoutFunction = () =>{
        localStorage.removeItem("token");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logout Success",
            showConfirmButton: false,
            timer: 1500
          });
        // const navigate = useNavigate(); 
        // this.props.history.push("/login");
        this.setState({
            logout:true
        });
    }

    render() {
        const { isDropdownOpen,logout } = this.state;
        
        return (
            
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
               {logout&&(<Navigate to="/login" replace={true}></Navigate>)}
                <a className="navbar-brand header-logo" href="#!">
                {/* <i class="fa-solid fa-tower-broadcast"></i> */}
                <span className="ml-2 header-logo-span"><img src="https://www.foxlink.com/web/en/wp-content/uploads/2017/02/wlogo_foxlink_b.png" alt="" className="img-fluid header-logo-img" /></span>
                </a>
                {/* Sidebar Toggle*/}
                <BtnLink toggleMenuSideVisibility={this.toggleMenuSideVisibility} /> {/* Truyền hàm xử lý xuống BtnLink */}
                {/* Navbar Search*/}
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search for..."
                        aria-label="Search for..."
                        aria-describedby="btnNavbarSearch"
                    />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                        <i className="fas fa-search" />
                    </button>
                    </div>
                </form>
                {/* Navbar*/}
                <ul className="navbar-nav  ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        onClick={this.toggleDropdown} // Gọi hàm toggleDropdown khi click
                        aria-expanded={isDropdownOpen ? "true" : "false"} // Đặt aria-expanded tương ứng với trạng thái của dropdown
                    >
                        <i className="fas fa-user fa-fw" />
                    </a>
                    <ul
                        className={`dropdown-menu ${isDropdownOpen ? 'dropdown-menu-end show' : ''}`} 
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                        <NavLink to="/changePassword" className="dropdown-item">Change Password</NavLink>
                        </li>
                        <li>
                        <a className="dropdown-item" onClick={this.loginFunction}>
                            Login
                        </a>
                        </li>
                        <li>
                        <hr className="dropdown-divider" />
                        </li>
                        <li>
                        <a className="dropdown-item" onClick={this.LogoutFunction}>
                            Logout 
                            
                        </a>
                        </li>
                    </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavHeader;

const BtnLink = ({ toggleMenuSideVisibility }) => {
    return (
        <button
            className="btn btn-link btn-sm order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            onClick={toggleMenuSideVisibility} // Gọi hàm toggleMenuSideVisibility khi click
        >
            <i className="fas fa-bars" />
        </button>
    );
};