import React, { Component } from 'react';
import '../login/Login.css';
import DisplayThemeButtons from '../login/LoginScript';
import { Navigate  } from 'react-router-dom';
import Modal from '../../publicComponent/modal/Modal';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;
class ChangePassword extends Component {
    state = { 
        user: null, 
        error: null, 
        showOldPassword: false,
        showPassword: false,
        showConfirmPassword:false,
        loginPage: null,
    };
    toggleOldPasswordVisibility = () => {
        this.setState(prevState => ({
            showOldPassword: !prevState.showOldPassword
        }));
    };
    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };
    toggleConfirmPasswordVisibility = () => {
        this.setState(prevState => ({
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    };
    // componentDidMount() {
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         this.setState({ user: true });
    //     }
    // }
    
    componentWillMount() {
        let token = localStorage.getItem("token");
        if (token) {
            this.setState({ user: false });
        }
    }
    componentWillMount(){
        let token = localStorage.getItem("token");
        if (!token) {
            this.setState({ user: true });
        }
    }
    
    
    handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');
        const requestBody = {
            email: username,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        try {
            const response = await fetch(apiUrl+'/api/Account/changepassword', {
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
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Change Password Success, Please login again",
                            showConfirmButton: false,
                            timer: 2000
                          });
                        localStorage.removeItem("token");
                        this.setState({ user });
                        // this.setState({ jsonData: responseData.data });

                    } else {
                        let error = {
                            message: responseData.message || 'Change Password failed due to unknown error'
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
                    console.log(responseData.errors)
                    let error = {
                        message: responseData.errors && responseData.errors.Email ? responseData.errors.Email : 
                        responseData.errors.OldPassword ?responseData.errors.OldPassword : 
                        responseData.errors.NewPassword ?responseData.errors.NewPassword :
                        responseData.errors.ConfirmPassword ?responseData.errors.ConfirmPassword :
                         'Modify failed due to unknown error'
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
                    message: 'Error Change Password: ' + error.message
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
        let { user, error,showPassword,showOldPassword,showConfirmPassword } = this.state;
        return (
            <section className="container-show">
            <div className="login-container">
            {error && <p>{error.message}</p>}
            {user && (
          <Navigate to="/login" replace={true} />
        )}
            <img src="https://www.foxlink.com/web/en/wp-content/uploads/2017/02/wlogo_foxlink_b.png" alt="" className="img-fluid header-logo-img" />
                <div className="circle circle-one" />
                <div className="form-container">
                    <img
                        src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                        alt="illustration"
                        className="illustration"
                    />
                    <h1 className="opacity">Modify Password</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" name="username" placeholder="USER ID" />
                        </div>
                       
                        <div className='input-password'>
                            <input 
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword" 
                            placeholder="OLD PASSWORD" 
                            /> 
                        
                            <div className={showOldPassword ? "hide" : "positsionPassword"}
                            onClick={this.toggleOldPasswordVisibility}>
                                <i className="fa-solid fa-eye"/>
                            </div>
                            <div className={showOldPassword ? "positsionPassword" : "hide"}
                            onClick={this.toggleOldPasswordVisibility}>
                                <i className="fa-regular fa-eye-slash"/>
                            </div>
                        </div>
                        <div className='input-password'>
                            <input 
                            type={showPassword ? "text" : "password"}
                            name="newPassword" 
                            placeholder="NEW PASSWORD" 
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
                        <div className='input-password'>
                            <input 
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword" 
                            placeholder="CONFIRM PASSWORD" 
                            /> 
                        
                            <div className={showConfirmPassword ? "hide" : "positsionPassword"}
                            onClick={this.toggleConfirmPasswordVisibility}>
                                <i className="fa-solid fa-eye"/>
                            </div>
                            <div className={showConfirmPassword ? "positsionPassword" : "hide"}
                            onClick={this.toggleConfirmPasswordVisibility}>
                                <i className="fa-regular fa-eye-slash"/>
                            </div>
                        </div>
                        
                        
                        <button type="submit" className="opacity">MODIFY</button>
                    </form>
                    <div className="register-forget opacity">
                       {/*  */}
                        <NavLink to="/home">HOME</NavLink>
                        <NavLink to="#">ABOUT</NavLink>
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

export default ChangePassword;