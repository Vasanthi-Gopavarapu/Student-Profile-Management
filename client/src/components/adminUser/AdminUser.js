import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import Grid from  '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import './AdminUser.css';
import { TableContainer } from '@material-ui/core';


class SchoolAdmin extends Component {
    state = {
        StudentDetails: [],
        isAdmin: true
    }

    componentDidMount() {
        //this.studentDetails();
        
        Axios.get("http://localhost:3001/api/list/get").then((response) => {
            if(response.data){
                this.setState({StudentDetails : response.data});
            }
        })
    }

    render() {

            let list = null;

            if(this.state.StudentDetails.length > 0) {
                list = this.state.StudentDetails.map(item => {
                    return (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.Name}</TableCell>
                            <TableCell>{item.Gender}</TableCell>
                            <TableCell>{item.Class}</TableCell>
                            <TableCell>{item.Birthdate}</TableCell>
                            <TableCell>{item.street},{item.city},{item.state},{item.country},{item.postalCode}</TableCell>
                            <TableCell>{item.emailID}</TableCell>
                            <TableCell>{item.contactNo}</TableCell>
                            <TableCell>
                                <NavLink to={{
                                    pathname: `/addStudent`,
                                    query:{
                                        item
                                    }
                                }}>
                                <button type="button" className="btn btn-outline-primary">Edit</button>
                                </NavLink>
                            </TableCell>
                        </TableRow>
                        // <tr key={item.id}>
                        //     <td>{item.id}</td>
                        //     <td>{item.Name}</td>
                        //     <td>{item.Gender}</td>
                        //     <td>{item.Class}</td>
                        //     <td>{item.Birthdate}</td>
                        //     <td>{item.street},{item.city},{item.state},{item.country},{item.postalCode}</td>
                        //     <td>{item.emailID}</td>
                        //     <td>{item.contactNo}</td>
                        //     <td>
                        //         <Link to={{
                        //             pathname: `/addStudent`,
                        //             query:{
                        //                 item
                        //             }
                        //         }}>
                        //         <button typr="button" 
                        //         className="btn btn-outline-primary">Edit</button>
                        //         </Link>
                        //     </td>
                        // </tr>
                    );
                })
            }

        return (
            <Grid style={{width: '100%'}}>
                <div className="Adminpage">
                    <Typography variant="h4" style={{textAlign: "center"}}>
                        Students List
                    </Typography>
                    {/* <NavLink to="/addStudent" className="text-primary"
                                    activeClassName="text-danger"> */}
                            <Button 
                            style={{
                                margin: '15px'
                            }}
                            href='/addStudent'
                            variant="contained" color="primary">
                                Add Student
                            </Button>
                    {/* </NavLink> */}
                    <TableContainer style={{maxHeight: 580}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow >
                                    <TableCell style={{fontSize: 17}}>Id</TableCell>
                                    <TableCell style={{fontSize: 17}}>Name</TableCell>
                                    <TableCell style={{fontSize: 17}}>Gender</TableCell>
                                    <TableCell style={{fontSize: 17}}>Class</TableCell>
                                    <TableCell style={{fontSize: 17}}>Birthdate</TableCell>
                                    <TableCell style={{fontSize: 17}}>Address</TableCell>
                                    <TableCell style={{fontSize: 17}}>Email ID</TableCell>
                                    <TableCell style={{fontSize: 17}}>Contact No</TableCell>
                                    <TableCell style={{fontSize: 17}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Class</th>
                                <th>Birthdate</th>
                                <th>Address</th>
                                <th>EmailID</th>
                                <th>Contact No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table> */}
                </div>
            </Grid>
        );
    }
}

export default SchoolAdmin;