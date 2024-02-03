import React,{useState} from 'react'
import {TextField,FormControl} from '@mui/material' 
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'


function LoginScreen() {
   
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
  
    
  async function Login(){
       const user={
        email,
        password
       }
       try{
        const result=(await axios.post(" http://localhost:5000/api/users/login",user)).data;

        localStorage.setItem('currentUser', JSON.stringify(result));
        window.location.href='/home'
        }catch(error){
         console.log(error)
         alert("Password Not Match")
      }
    }
    return (
    <div class="form" style={{marginLeft:"74px"}} >
    <TextField id="standard-basic" label="Email" variant="standard" sx={{width: '78%'}}
      value={email} onChange={(e)=>{setemail(e.target.value)}}/>
    <br/>
    <FormControl sx={{width: '78%'}} variant="standard">
    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
         <Input
            id="standard-adornment-password"
            value={password} onChange={(e)=>{setpassword(e.target.value)}}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br/>
          <Button variant="contained" startIcon={<LoginIcon/>} onClick={Login}>
            Login
           </Button>
        </FormControl>
  </div>
  )
}

export default LoginScreen