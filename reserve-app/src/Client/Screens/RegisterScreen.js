import React,{useState} from 'react'
import axios from 'axios'

import {TextField,FormControl} from '@mui/material' 
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function RegisterScreen() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[cpassword,setcpassword]=useState('')
  
  async function register(){
    if(password===cpassword)
    {const user={name,email,password,cpassword}
    try{
      const result=(await axios.post("http://localhost:5000/api/users/register",user)).data;
      alert(result)
      window.location.href='/Lo'
    }catch(error){
       console.log(error)
    }
    }else{
    alert("Password Not Match")
    }
    }

    return (
<div class="form" style={{marginLeft:"74px"}} >
    <TextField id="standard-basic" label="Name" variant="standard" sx={{width: '78%'}}
    value={name} onChange={(e)=>{setname(e.target.value)}} />
    <br/>
    <TextField id="standard-basic" label="Email" variant="standard" sx={{width: '78%'}}
    value={email} onChange={(e)=>{setemail(e.target.value)}}/>
    <br/>
    <FormControl sx={{width: '78%'}} variant="filled">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            value={password} onChange={(e)=>{setpassword(e.target.value)}}
            id="standard-adornment-password"
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
        </FormControl>
         <TextField id="standard-basic" label="CPassword" variant="standard" sx={{width: '78%'}}
    value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
    
     <Button variant="contained" startIcon={<VpnKeyIcon/>} onClick={register} sx={{width: '78%'}} >
      SIGN UP
      </Button>     
  
    </div>
  )
}

export default RegisterScreen