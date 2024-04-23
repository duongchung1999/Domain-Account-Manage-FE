import React, { Component } from 'react';
import './Login.css';
import DisplayThemeButtons from './LoginScript';
import { Navigate  } from 'react-router-dom';
class Login extends Component {
    state = { user: null, error: null };
    handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        console.log(username);
        const requestBody = {
            email: username,
            password: password
        };

        try {
            const response = await fetch('/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const responseData = await response.json(); // Giải mã JSON từ phản hồi
                // console.log(responseData.message);
                // console.log(responseData.token);
                let user = responseData.flag;
                
                
                if (response.ok) {
                    let user = responseData.flag;
                    if (user) {
                        this.setState({ user });
                    } else {
                        let error = {
                            message: responseData.message || 'Login failed due to unknown error'
                        };
                        this.setState({ error });
                    }
                } else {
                    let error = {
                        message: responseData.errors && responseData.errors.Email ? responseData.errors.Email : 'Login failed due to unknown error'
                    };
                    this.setState({ error });
                }
            } catch (error) {
                console.error('Error logging in:', error);
                let errorMessage = {
                    message: 'Error logging in: ' + error.message
                };
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
                        <input type="text" name="username" placeholder="USERNAME" />
                        <input type="password" name="password" placeholder="PASSWORD" />
                        <button type="submit" className="opacity">SUBMIT</button>
                    </form>
                    <div className="register-forget opacity">
                        <a href="">REGISTER</a>
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