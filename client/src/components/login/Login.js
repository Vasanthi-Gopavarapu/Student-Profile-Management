import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Grid,Paper, TextField, Button} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Login.css';

const Login = (props) => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    const paperStyle={padding :'30px 20px',height:380,width:280, margin:"60px auto"}
    const btnstyle={margin:'20px 0'}
    
    Axios.defaults.withCredentials = true;

    const submitLogin = (e) => {
        e.preventDefault();
        console.log("login Submitted");
        Axios.post("http://localhost:3001/api/login", {
            emailId: emailId,
            password: password
          }).then((response) => {
           if(response.data.error) {
              console.log("login err", response.data.error)
           }else {
               props.history.push('/studentDetails');
           }
          }).catch((err) => {
            console.log(err);
          });
    }

    useEffect(() => {
        console.log("login useEffect");
        Axios.get("http://localhost:3001/api/login").then(response => {
            if(response.data.loggedin) {
                props.history.push('/studentDetails');
            }
        })
    }, []);

    return (
        <React.Fragment>
            <AppBar position="static">
                <ToolBar >
                    <Typography variant="h6" style={{
                        margin: '10px auto'}}> Student Profile Management</Typography>
                        <Button href='/register' variant="contained" color="secondary">Register</Button>
                </ToolBar>
            </AppBar>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Log In</h2>
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
                <Button type='submit' color='primary' 
                variant="contained"
                 fullWidth
                 style={btnstyle}
                 onClick={submitLogin} >Login</Button>
            </Paper>
        </Grid>
        </React.Fragment>
    );
    
    // return (
    //     <div className="Container Login">
    //         <h1>Log In</h1>
    //         <form>
    //             <div className="mb-3">
    //                 <label htmlFor="emaillogin" className="form-label">Email address</label>
    //                 <input type="email" 
    //                 className="form-control" 
    //                 id="emaillogin"
    //                 onChange={(e)=>{setEmailId(e.target.value)}} />
    //             </div>
    //             <div className="mb-3">
    //                 <label htmlFor="passwordlogin" className="form-label">Password</label>
    //                 <input type="password" 
    //                 className="form-control" 
    //                 id="passwordlogin"
    //                 onChange={(e)=>{setPassword(e.target.value)}} />
    //             </div>
                
    //             <button type="submit" 
    //             className="btn btn-primary"
    //             onClick={submitLogin}>Login</button>
    //         </form>
           
    //     </div>
    // );
}

export default Login;