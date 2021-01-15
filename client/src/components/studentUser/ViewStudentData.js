import React, { Component } from 'react';
import Axios from 'axios';
//import StudentDetails from '../studentDetails/StudentDetails';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class ViewStudentData extends Component {

    state = {
        studentDetails: null,
        selectedFile: "",

    }

    componentDidMount() {
        const user = this.props.user;
        console.log(user);
        
        Axios.post("http://localhost:3001/api/getStudent", user).then((response) => {
            console.log(response.data.result[0]);
            this.setState({studentDetails : response.data.result[0]})
        }).catch((err) => {
            console.log(err);
        });
    }

    onFileChange = (e) => {
        console.log(e.target.files[0]);
        this.setState({
            selectedFile: e.target.files[0]
          })
    }

    onFileUpload = (id) => {
        const formData = new FormData(); 
        const selectedfile = this.state.selectedFile;

        if(selectedfile === ''){
            return;
        }
     
        // Update the formData object 
        formData.append( 
          "myFile", 
          this.state.selectedFile,
          this.state.selectedFile.name 
        ); 
       
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
       console.log(id, "this is the id");
        // Request made to the backend api 
        // Send formData object 
        console.log("uploadFile", formData);
        Axios.post("http://localhost:3001/api/upload/"+id, formData)
      .then(res => { // then print response status
        console.log(res)
      })
    }

    render() {
        let details = this.state.studentDetails ;
        return (
            <Grid>
                <div className="container">
                    
                    <Typography variant="h5" style={{textAlign: 'center'}}>View Details and Upload Docs</Typography>
                    <Paper style={{
                        padding: 20,
                        maxHeight: 580
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                                    <TableCell>{details?details.Name:""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Gender</TableCell>
                                    <TableCell>{details ? details.Gender:""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Class</TableCell>
                                    <TableCell>{details ? details.Class : ""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Date of Birth</TableCell>
                                    <TableCell>{details ? details.Birthdate : ""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Address</TableCell>
                                    <TableCell>{details ? details.street : ""} {details ? details.city : ""}
                                {details ?details.state : ""} {details ? details.country : ""}
                                {details ? details.postalCode : ""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Email ID</TableCell>
                                    <TableCell>{details ? details.emailID : ""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Contact Number</TableCell>
                                    <TableCell>{details ? details.contactNo:""}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <input type="file" name="myfile" onChange={this.onFileChange} />
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.onFileUpload(details?details.id:"")}> 
                                        Upload! 
                                        </Button> 
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {/* <p><b>Name  </b> <span>{details?details.Name:""}</span></p>
                            <p><b>Gender </b> <span>{details ? details.Gender:""}</span></p>
                            <p><b>Class </b> <span>{details ? details.Class : ""}</span></p>
                            <p><b>Date of Birth </b> <span>{details ? details.Birthdate : ""}</span></p>
                            <p><b>Address </b><span>
                                {details ? details.street : ""} {details ? details.city : ""}
                                {details ?details.state : ""} {details ? details.country : ""}
                                {details ? details.postalCode : ""}
                            </span></p>
                            <p><b>Email ID  </b> <span>{details ? details.emailID : ""} </span></p>
                            <p><b>Contact Number </b> <span>{details ? details.contactNo:""}</span></p> */}      
                    </Paper>
                </div>    
            </Grid>
        )
    }
}

export default ViewStudentData;


