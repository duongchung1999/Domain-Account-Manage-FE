import React, { Component, useEffect } from 'react';
import './Login.css';
import DisplayThemeButtons from './LoginScript';
import { Navigate  } from 'react-router-dom';
import Modal from '../../publicComponent/modal/Modal';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;
class Login extends Component {
    state = { 
        user: null, 
        error: null, 
        showPassword: false
    };
    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };
    componentDidMount() {
        let token = localStorage.getItem("token");
        if (token) {
            this.setState({ user: true });
        }
    }
    
    handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const requestBody = {
            email: username,
            password: password,
        };

        try {
            const response = await fetch(apiUrl+'/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const responseData = await response.json(); // Giải mã JSON từ phản hồi
                // console.log(responseData.errors.Email[0]);
                // console.log(responseData.token);
                let user = responseData.flag;
                
                
                if (response.ok) {
                    // console.log(123);
                    let user = responseData.flag;
                    if (user) {
                        localStorage.setItem('token', responseData.token);
                        localStorage.setItem('name', responseData.name);
                        localStorage.setItem('role', responseData.role);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login Success",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        this.setState({ user });
                        // this.setState({ jsonData: responseData.data });

                    } else {
                        let error = {
                            message: responseData.message || 'Login failed due to unknown error'
                        };
                        // console.log(responseData.errors);
                        Swal.fire({
                            position: "center",
                            icon: "info",
                            title: error.message,
                            showConfirmButton: false,
                            timer: 1500
                          });
                        this.setState({ error });
                    }
                } else {
                    let error = {
                        message: responseData.errors && responseData.errors.Email ? responseData.errors.Email : responseData.errors.Password ?responseData.errors.Password :  'Login failed due to unknown error'
                    };
                    Swal.fire({
                        position: "center",
                        icon: "info",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 1500
                      });
                    this.setState({ error });
                }
            } catch (error) {
                // console.error('Error logging in:', error);
                let errorMessage = {
                    message: 'Error logging in: ' + error.message
                };
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
                this.setState({ error: errorMessage });
            }
    };

    render() {
        let { user, error,showPassword } = this.state;
        return (
            <section className="container-show">
            <div className="login-container">
            {error && <p>{error.message}</p>}
            {user && (
          <Navigate to="/home" replace={true} />
        )}
            <img src="https://www.foxlink.com/web/en/wp-content/uploads/2017/02/wlogo_foxlink_b.png" alt="" className="img-fluid header-logo-img" />
                <div className="circle circle-one" />
                <div className="form-container">
                    <img
                        src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                        alt="illustration"
                        className="illustration"
                    />
                    <h1 className="opacity">LOGIN</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" name="username" placeholder="USER ID" />
                        </div>
                        <div className='input-password'>
                            <input 
                            type={showPassword ? "text" : "password"}
                            name="password" 
                            placeholder="PASSWORD" 
                            /> 
                        
                            <div className={showPassword ? "hide" : "positsionPassword"}
                            onClick={this.togglePasswordVisibility}>
                                <i className="fa-solid fa-eye"/>
                            </div>
                            <div className={showPassword ? "positsionPassword" : "hide"}
                            onClick={this.togglePasswordVisibility}>
                                <i className="fa-regular fa-eye-slash"/>
                            </div>
                        </div>
                        
                        
                        <button type="submit" className="opacity">SUBMIT</button>
                    </form>
                    <div className="register-forget opacity">
                        {/* <a href="">REGISTER</a> */}
                        <NavLink to="/register">REGISTER</NavLink>
                        <a href="">FORGOT PASSWORD</a>
                    </div>
                </div>
                <div className="circle circle-two" />
            </div>
            <div className="theme-btn-container" />
            <DisplayThemeButtons />
            
        </section>
        );
    }
}

export default Login;