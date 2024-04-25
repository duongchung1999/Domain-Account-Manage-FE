import React, { Component } from 'react';
import './NavHeader.css'
class NavHeader extends Component {
    toggleMenuSideVisibility = () => {
        // Gửi trạng thái hiện tại của MenuSide lên component cha
        this.props.toggleMenuSide();
    }

    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* Navbar Brand*/}
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
                        aria-expanded="false"
                    >
                        <i className="fas fa-user fa-fw" />
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                        <a className="dropdown-item" href="#!">
                            Settings
                        </a>
                        </li>
                        <li>
                        <a className="dropdown-item" href="#!">
                            Activity Log
                        </a>
                        </li>
                        <li>
                        <hr className="dropdown-divider" />
                        </li>
                        <li>
                        <a className="dropdown-item" href="#!">
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