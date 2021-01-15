import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './AddStudent.css';

function AddStudent(props) {

    const [gender, setGender] = useState("");
    const inputName = useRef(null);
    const inputClass = useRef(null);
    const inputBirth = useRef(null);
    const inputStreet = useRef(null);
    const inputCity = useRef(null);
    const inputState = useRef(null);
    const inputCountry = useRef(null);
    const inputPostal = useRef(null);
    const inputEmail = useRef(null);
    const inputContact = useRef(null);


    Axios.defaults.withCredentials = true;
    useEffect(() => {
        
        Axios.get("http://localhost:3001/api/login").then(response => {
            console.log(response);
            if(response.data.loggedin) {
                console.log(response.data.user[0]);
            }else{
                console.log(props);
                props.history.push('/login');
            }
        })
    },[]);

    const saveHandler = (e) => {
        e.preventDefault();
        const studentDetails = props.location.query ? props.location.query.item: null;
        console.log(gender)
        const lists = {
            name: inputName.current.value,
            gender: gender,
            std_class: inputClass.current.value,
            birthdate: inputBirth.current.value,
            street_address: inputStreet.current.value,
            city: inputCity.current.value,
            std_state: inputState.current.value,
            country: inputCountry.current.value,
            postalCode: inputPostal.current.value,
            emailID: inputEmail.current.value,
            contactNo: inputContact.current.value
        }
    
        console.log(lists);
        if(studentDetails) {
            Axios.put("http://localhost:3001/api/list-update", {
                id: studentDetails.id,
                lists: lists
            }).then(response => {
                console.log(response.data.message);
            }).catch((err) => console.log(err));
        }else {
           console.log("add student")
            Axios.post("http://localhost:3001/api/list", lists).then(response => {
            console.log(response.data.message);
            }).catch((err) => console.log(err));

        }
    }

    
        console.log(props.location.query);
        let student = props.location.query ? props.location.query.item: null;
        let heading = null
        
        if(student) {
            heading = "Edit student";

        }else {
            heading = "Add student"; 
        }

        return (
            <Grid>
                <div className="Addstudent">
                <Paper style={{padding:20}}>
                    <Typography variant="h4" style={{textAlign: "center"}}>{heading}</Typography>
                    <form onSubmit={saveHandler}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                name="name"
                                defaultValue={student ? student.Name : ""}
                                className="col-sm-10 form-control"
                                ref={inputName} 
                                />
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Gender</label>
                            <RadioGroup row onChange={(e)=>{setGender(e.target.value)}} 
                            defaultValue={student? student.Gender : ""}>
                                <FormControlLabel 
                                value="Male" 
                                control={<Radio color="primary" />}
                                label="Male"
                                labelPlacement="end" />
                                <FormControlLabel 
                                value="Female" 
                                control={<Radio color="primary" />}
                                label="Female"
                                labelPlacement="end" />
                                <FormControlLabel 
                                value="Other" 
                                control={<Radio color="primary" />}
                                label="Other"
                                labelPlacement="end" />
                            </RadioGroup>
                        </div>

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Class</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                name="std_class"
                                defaultValue={student ? student.Class : ""}
                                className="col-sm-10 form-control" 
                                ref={inputClass} />    
                            </div> 
                        </div>
                
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label" >Birthdate</label>
                            <div className="col-sm-10">
                                <input type="date" 
                                name="birthdate" 
                                defaultValue={student ? student.Birthdate : ""}
                                className="col-sm-10 form-control"
                                ref={inputBirth} 
                                />
                            </div>
                        </div>
                    
                        <div className="mb-3 row" >
                            <label className="col-sm-2 col-form-label">Address</label>
                            <div className="col-sm-10 ">
                                <input
                                className="form-control" 
                                name={"street_address"}
                                defaultValue={student ? student.street : ""}
                                placeholder={"Street Address"}
                                ref={inputStreet}
                                />
                                <input 
                                className="form-control"
                                name={"city"}
                                defaultValue={student ? student.city : ""}
                                placeholder={"City"}
                                ref={inputCity}
                                />
                                <input
                                className="form-control"
                                name={"std_state"}
                                defaultValue={student ? student.state : ""}
                                placeholder={"State"}
                                ref={inputState}
                                />
                                <input
                                className="form-control"
                                name={"country"}
                                defaultValue={student ? student.country : ""}
                                placeholder={"Country"}
                                ref={inputCountry}
                                />
                                <input 
                                className="form-control"
                                name={"postalCode"}
                                defaultValue={student ? student.postalCode : ""}
                                placeholder={"postal_Code"}
                                ref={inputPostal}
                                />
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Email ID</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                name="emailID"
                                defaultValue={student ? student.emailID : ""} 
                                className="col-sm-10 form-control"
                                ref={inputEmail}  
                                />
                            </div>          
                        </div>
                    
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contact No</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                name="contactNo" 
                                defaultValue={student ? student.contactNo :""}
                                className="form-control"  
                                ref={inputContact}
                                />
                            </div>
                        </div>
                        <Button type="submit" 
                            variant="contained"
                            color="primary"
                            >Save</Button>                   
                        </form>
                    </Paper>
                </div>
            </Grid>
            );

}

export default AddStudent;