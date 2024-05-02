import React, { Component } from 'react';
import '../login/Login.css';
import DisplayThemeButtons from '../login/LoginScript';
import { Navigate  } from 'react-router-dom';
import Modal from '../../publicComponent/modal/Modal';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;
class Register extends Component {
    state = { user: null, error: null };
    handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        console.log(username);
        const requestBody = {
            name: name,
            email: username,
            password: password,
            confirmPassword: confirmPassword,
        };
      

        try {
            const response = await fetch(apiUrl+'/api/Account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const responseData = await response.json(); // Giải mã JSON từ phản hồi
                // console.log(responseData.message);
                console.log(responseData.token);
                let user = responseData.flag;
                
                
                if (response.ok) {
                    let user = responseData.flag;
                    if (user) {
                        // localStorage.setItem('token', responseData.token);
                        Swal.fire("Created!", "", "success");
                        this.setState({ user });
                        // this.setState({ jsonData: responseData.data });

                    } else {
                        let error = {
                            message: responseData.message || 'Login failed due to unknown error'
                        };
                        Swal.fire(error.message, "", "info");
                        this.setState({ error });
                    }
                } else {
                    let error = {
                        message: responseData.errors && responseData.errors.Email ? responseData.errors.Email : 'Login failed due to unknown error'
                    };
                    console.log(error.message[0]);
                    Swal.fire(error.message[0], "", "info");
                    this.setState({ error });
                }
            } catch (error) {
                console.error('Error logging in:', error);
                let errorMessage = {
                    message: 'Error logging in: ' + error.message
                };
                Swal.fire(error.message, "", "info");
                this.setState({ error: errorMessage });
            }
    };

    render() {
        let { user, error } = this.state;
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
                    <h1 className="opacity">REGISTER</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="name" placeholder="NAME" />
                        <input type="text" name="username" placeholder="USER ID" />
                        <input type="password" name="password" placeholder="PASSWORD" />
                        <input type="password" name="confirmPassword" placeholder="CONFIRM PASSWORD" />
                        <button type="submit" className="opacity">REGISTER</button>
                    </form>
                    <div className="register-forget opacity">
                        <NavLink to="/login">LOGIN</NavLink>
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

export default Register;