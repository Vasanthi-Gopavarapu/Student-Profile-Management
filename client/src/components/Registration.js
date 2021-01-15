import React, { useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox'

const Registration = () => {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setisAdmin] = useState(false);
  
    const submitRegister = () => {
      Axios.post("http://localhost:3001/api/register", {
        emailId: emailId,
        password: password,
        isAdmin: isAdmin
      }).then(() => {
        console.log("registered successfully");
      }).catch((err) => {
        console.log(err);
      });
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"60px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'20px 0'}

    return (
      <React.Fragment>
        <AppBar position="static">
          <ToolBar>
            <Typography variant="h6" style={{
              margin:"10px auto"
            }}> Student Profile Management</Typography>
            <Button href="/login" variant="contained" color='secondary'>Login</Button>
          </ToolBar>
        </AppBar>
      <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email Address'
                type="email" 
                placeholder='Enter email'
                fullWidth required
                onChange={(e)=>{setEmailId(e.target.value)}}/>
                <TextField label='Password'
                type="password" 
                placeholder='Enter password'  
                fullWidth required
                onChange={(e)=>{setPassword(e.target.value)}} />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        checked={isAdmin} onChange={(e)=>{setisAdmin(e.target.checked)}}
                    />
                    }
                    label="Admin"
                 />
                <Button type='submit' color='primary' 
                variant="contained"
                 style={btnstyle} fullWidth
                 onClick={submitRegister} >Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <NavLink to="/login">
                      Login
                    </NavLink>
                </Typography>
            </Paper>
        </Grid>
        </React.Fragment>
    );
  
    // return (
    //   <div className="Container Register">
    //     <h1>Sign Up</h1>
    //     <form >
    //       <div className="mb-3">
    //         <label htmlFor="userName" className="form-label">User Name</label>
    //         <input type="text" 
    //         className="form-control"
    //         id="userName"
    //         onChange={(e)=>{setUserName(e.target.value)}} />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="email" className="form-label">Email address</label>
    //         <input type="email" 
    //         className="form-control" 
    //         id="email"
    //         onChange={(e)=>{setEmailId(e.target.value)}} />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="password" className="form-label">Password</label>
    //         <input type="password" 
    //         className="form-control" 
    //         id="password"
    //         onChange={(e)=>{setPassword(e.target.value)}} />
    //       </div>
    //       <div className="mb-3 form-check">
    //         <input type="checkbox" 
    //         className="form-check-input" 
    //         id="adminCheck" 
    //         checked={isAdmin} onChange={(e)=>{setisAdmin(e.target.checked)}} />
    //         <label className="form-check-label" htmlFor="adminCheck">Admin</label>
    //       </div>
    //       <button type="submit" 
    //       className="btn btn-primary"
    //       onClick={submitRegister}>Submit</button>
    //     </form>
    //     <p className="Reg-para">Already Registered, 
    //     <NavLink to="/login" 
    //         className="text-primary"
    //         activeClassName="text-danger">
    //       Click Here for Login
    //   </NavLink></p>
    //   </div>
    // );
}

export default Registration;
