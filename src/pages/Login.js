import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { useState } from 'react';

import '../pages/override.css';
import axios from 'axios';
function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5248/api/Account', {
        UserName: username,
        Password: password
      });
      // Handle the response, e.g., store the token in local storage or redirect to another page
      console.log(response.data); 
      const userRole = response.data.userRole; // Assuming role is returned in the response
      if (userRole === 'User') {
        window.location.href = '/app/dashboard';
      } else if (userRole === 'Administrator') {
        window.location.href = '/app/tables';
      } else {
        // Handle unsupported role
        window.location.href = '/app/tables';
        //setErrorMessage('Unsupported role. Please contact the administrator.');
      }
      
      //window.location.href = '/app/dashboard';// Assuming the response contains an authentication token
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        // Authentication failed, show an error message to the user
        setErrorMessage('Invalid credentials. Please try again.');
        // You can set a state variable to display the error message in your component
      }
      else {
        // Other error occurred, handle as needed
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="***************" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Label>
              <br></br>

              <Button className="bg-red-500"   onClick={handleLogin}>
                Log in
              </Button>
              <br></br>
              <br></br>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <hr className="my-8" />

              
              <p className="mt-4">
                <Link className="forgot-psw" 
                 
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="forgot-psw" 
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
