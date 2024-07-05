import React, { useState, useEffect } from "react";
import logo from '../assets/main_mym.jpeg';
import '../styles/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate();
  const { base_url } = require('../config');
  const [token, updateToken] = useState("");
  const [loggedIn, changeLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard'); // Replace with your actual route
    }
  }, [loggedIn, navigate]);

  const handleLogin = () => {
    axios.post(`${base_url}/login`, { token: token })
      .then(res => {
        if (res.data.status === 'success') {
          sessionStorage.setItem('token', token);
          changeLoggedIn(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  const handleSecretTokenInput = (e) => {
    updateToken(e.target.value);
  };

  return (
    <div className='login-container'>
      <div className='login-left-container'>
        <img className='mym-logo' src={logo} alt="MYM Logo" />
        <div className='heading'>
          Welcome to MYM
        </div>
        <div className='sub-heading'>
          Boost Your Career with our product
        </div>
      </div>
      <div className='login-right-container'>
        <div className='heading' style={{ color: 'black', margin: '1em' }}>
          Sign in using your Secret Token
        </div>
        <TextField
          style={{ marginTop: '2em' }}
          onChange={handleSecretTokenInput}
          className='text-field'
          id="outlined-basic"
          value={token}
          label="Secret Token"
          variant="outlined"
        />
        <Button
          style={{
            display: 'block',
            width: 'fit-content',
            alignSelf: 'center',
            backgroundColor: 'black',
            marginTop: '1em'
          }}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
