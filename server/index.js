const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
//const multer = require("multer");
const upload = require('express-fileupload');
const app = express();
var uuid = require('uuid')

const mysql = require('mysql');
const saltRounds = 10;

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'awsowac',
    database: 'student_data_management'
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: "userId",
    secret: "manageViews",
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000
    }
}));

// const upload = multer({ dest: './uploads' });
app.use(upload());
app.post('/api/upload/:userId', function(req, res) {
    console.log(req.params.userId);
    var id = req.params.userId;
    if(req.files){
        //console.log(req.files);
        var file = req.files.myFile
        var filename = file.name
        //console.log(filename)
        var uuidname = uuid.v1(); // this is used for unique file name
        var filesrc = 'http://localhost:3001/api/upload/' + uuidname + file.name

        var sql = "UPDATE student_details SET file_src=?, filename=? WHERE id=?"

        dbPool.query(sql, [filesrc, filename, id], (err, result) => {
            if(err){
                console.log(err);
            }else {
                file.mv('./uploads/' + uuidname + file.name, (err) => {
                    if(err){
                        res.send({error: err});
                    } else {
                        res.send({message: "File Uploaded"})
                    }
                })
            }
        });
    }else {
        res.send({message: "please choose a file for upload"});
    }
  
});

app.post('/api/register', (req, res) => {
    
    const email = req.body.emailId;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin
    
    const sqlInsert = "INSERT INTO userdetails (emailId, password, isAdmin) VALUES (?,?,?);"
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err);
        }else {
            dbPool.query(sqlInsert, [email, hash, isAdmin], (err, result) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
        }
    });  
});

app.get('/api/login', (req, res) => {
    if(req.session.user){
        res.send({ loggedin: true, user: req.session.user});
    } else {
        res.send({ loggedin: false});
    }
});

app.post('/api/login', (req, res) => {
    const email = req.body.emailId;
    const password = req.body.password;

    const sqlSelect = "SELECT * FROM userDetails WHERE emailId = ? ;"
    
    dbPool.query(sqlSelect, email, (err, result) => {
        if(err){
            res.send({ error: err });
        }else{
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (er, response) => {
                    if(response){
                        req.session.user = result;
                        console.log(req.session.user)
                        res.send({ loggedin: true, user: req.session.user});
                    }else {
                        res.send({error: "InCorrect Password"});
                    }
                }); 
            }else{
                res.send({error: "Invalid EmailId"});
            }
        }
    });
});

app.get('/api/list/get', (req, res) => {

    sqlSelect = "SELECT * FROM student_details;"
    dbPool.query(sqlSelect, (err, result)=> {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.post('/api/list', (req, res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const std_class = req.body.std_class;
    const birthdate = req.body.birthdate;
    const street_address = req.body.street_address;
    const city = req.body.city;
    const std_state = req.body.std_state;
    const country = req.body.country;
    const postalCode = req.body.postalCode;
    const emailID = req.body.emailID;
    const contactNo = req.body.contactNo;

    const sqlInsert = "INSERT INTO student_details VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    const insertArr =  [null, name, gender, std_class, birthdate, street_address, city, std_state, country, postalCode, emailID, contactNo, null, null]
    dbPool.query(sqlInsert, insertArr, (err, result) => {
            if(err) {
                res.send({message: err});
            }else {
                res.send({message: "Details are saved successfully"});
            }
        });
});

app.put("/api/list-update", (req, res) => {
    const studentId = req.body.id
    const name = req.body.lists.name;
    const gender = req.body.lists.gender;
    const std_class = req.body.lists.std_class;
    const birthdate = req.body.lists.birthdate;
    const street_address = req.body.lists.street_address;
    const city = req.body.lists.city;
    const std_state = req.body.lists.std_state;
    const country = req.body.lists.country;
    const postalCode = req.body.lists.postalCode;
    const emailID = req.body.lists.emailID;
    const contactNo = req.body.lists.contactNo;

    const sqlUpdate = "UPDATE student_details SET Name=?, Gender=?, Class=?, Birthdate=?, street=?"+
    ", city=?, state=?, country=?, postalCode=?, emailID=?, contactNo=? WHERE id = ?"

    const updateArr =  [name, gender, std_class, birthdate, street_address, city, std_state, country, postalCode, emailID, contactNo, studentId]
    console.log(sqlUpdate);
    dbPool.query(sqlUpdate, updateArr, (err, result) => {
            if(err) {
                res.send({message: err});
            }else {
                console.log("success")
                res.send({message: "Details updated successfully", result: result});
            }
        });
});

app.post('/api/getStudent', (req, res) => {
    const emailID = req.body.emailId;
    console.log(emailID);

    const sqlSelect = "SELECT * FROM student_details WHERE emailID = ?";
    dbPool.query(sqlSelect, emailID, (err, result) => {
        if(err) {
            res.send({message: err});
        }else {
            console.log("success")
            res.send({message: "Selected Successfully", result: result});
        }
    });
})

app.get("/api/logout", (req, res) => {
    console.log(req.session)
    req.session.destroy(function(err) {
        if(err){
            res.send({error: err});
        }else {
            res.send({loggedin: false})
        }
        // cannot access session here
      })
})

app.listen(3001, () => {
    console.log("server started listening");
});