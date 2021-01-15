import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import AdminUser from '../adminUser/AdminUser';
import ViewStudentUser from '../studentUser/ViewStudentData';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StudentDetails = (props) => {

    const [user, setUser] = useState(null);
    
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        
        Axios.get("http://localhost:3001/api/login").then(response => {
            console.log(response);
            if(response.data.loggedin) {
                setUser(response.data.user[0])
                console.log(response.data.user[0]);
            }else{
                console.log(props);
                props.history.push('/login');
            }
        })
    },[]);

    const logoutHandler = () => {
        Axios.get("http://localhost:3001/api/logout").then(response => {
            console.log(response);
            props.history.push('/login')
        })
    }

    if(user === null) {
        return null;
    }else {
        return (
            <div>
                <AppBar position="static" >
                    <ToolBar >
                        <Typography variant="h6" style={{
                            margin: '30px auto'}}> Student Profile Management</Typography>
                        <Button variant="contained"
                         color="secondary"
                         onClick={logoutHandler}>Logout</Button>
                    </ToolBar>
                </AppBar>
                { user.isAdmin ? <AdminUser /> : <ViewStudentUser user={user}/> }
            </div>
        );
    } 
} 

export default StudentDetails;