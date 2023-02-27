const express = require('express');
const jwt = require('jsonwebtoken');
const emailvalidator = require('email-validator')
const app = express(); 
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
var userid = 27 ;
const saltRounds = 10;
const http = require('http').Server(app);
http.listen(3002)
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});





let school = '';
let last = '';
let first = ''

if (typeof localStorage === 'undefined' || localStorage === null) {
    var LocalStorage = require('node-localStorage').LocalStorage
    localStorage = new LocalStorage('./scratch')
}


const GenerateRoom=()=>{
    var StoredToken ='tokenTest'
    if( localStorage.getItem('token')){
        StoredToken =  localStorage.getItem('token')
    }
   var room = '/board/' + StoredToken.substring(1, 90)
   
   return room;
    
}

console.log(GenerateRoom())







const verifyToken=(req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).json('a token is required for Auth')
    }

    try{
        const decode= jwt.verify(token,'SUBSCRIBESOFTWARE12');
        req.user=decode;


    }catch(error){
        return res.status(401).json('Invalid token')
    }
    

    return next()


}


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bakhtiazerreza2000@gmail.com',
        pass: 'waoccuqttvtghzwm'
    },
})


app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:3000'],
         methods: ['GET', 'POST'],
        credentials: true,
 })
);


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'mysql@2020',
    database: 'loginsystem',
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
   
});



app.post('/register', async(req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const establishment = req.body.establishment;
    const confirmation = req.body.confirmation;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    const encryptedConfirmation = await bcrypt.hash(confirmation,saltRounds)
    console.log(encryptedPassword)

    if(email && password && firstname && lastname && establishment && confirmation && confirmation == password){

        if(emailvalidator.validate(email)){
            db.query('SELECT COUNT(*) AS cnt FROM users WHERE email=?', [email],
                (err, result) => {
                    if (err) {
                        res.send({ err: err })
                        console.log(err)
                    }
                    else {
                        if (result[0].cnt > 0) {
                            res.send({ message: 'email already exist, Failed registration' })
                        }
                        else {
                            db.execute(
                                'INSERT INTO users(firstname,lastname,email,establishment,password,confirmation,ischecked) VALUES(?,?,?,?,?,?,?)',
                                [firstname, lastname, email, establishment, encryptedPassword, encryptedConfirmation, false],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (result.affectedRows > 0) {
                                        res.status(200).send({ message: 'registred succesfully' })
                                    }
                                    else {
                                        res.send({ message: "can't register" })
                                    }

                                }
                            );

                            db.execute('SELECT id FROM users WHERE email= ? ',
                                [email], (err, rows) => {

                                    if (err) {
                                        res.send({ err: err })
                                    }
                                    else {
                                        userid = rows[0].id


                                    }
                                    console.log(userid)
                                    transporter.sendMail({
                                        to: email,
                                        subject: 'verify Account',
                                        html: '<p>copy this link to your browser *-* localhost:3001/verify/' + userid + '<a href="localhost:3001/verify/' + userid + '">*-*</a></p> to confirm your email'
                                    })

                                }

                            )

                        }
                    }

                }
            )    
        }else{
            res.send({message:'invalid email!'})
        }

    }else{
        res.send({message: ':(,invalid informations'})
    }
    
    
   
        
        
});









app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   
   

   
    
    

    db.query('SELECT * FROM users WHERE email = ? ',
        [email],
         async(err,result)=>{

            if(err){
                res.send({err: err})
            }
            
            if(result.length>0){
                const comparison = await bcrypt.compare(password,result[0].password)
                
                if(comparison){
                    identificator = result[0].id
                    school = result[0].establishment
                    first = result[0].firstname
                    last = result[0].lastname
                    console.log(userid, first, last, school)

                    const token = jwt.sign({ id: identificator, school: school, firstname: first, lastname: last }, 'SUBSCRIBESOFTWARE12', { expiresIn: '50s' })
                   
   
                    res.send({token:token,message: 'success'})
                    localStorage.setItem('token',token);
                   
    
                    console.log('successs')
                    
                }
                else {
                    res.send({ message: "Wrong username/password combination!" })
                };

            } 
            else{
                res.send({ message: "user do not exist" })
            };
        })

       
});





app.post('/reset', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmation =req.body.confirmation
    const encryptedPassword = await bcrypt.hash(password,saltRounds)
    const encryptedConfirmation = await bcrypt.hash(confirmation,saltRounds)


   if(confirmation == password){
           db.execute('UPDATE users SET password = ?, confirmation = ? WHERE email = ?',
           [encryptedPassword,encryptedConfirmation,email],
           (err, result) => {

               if (err) {
                   res.send({ err: err })
               }
               if (result.affectedRows > 0) {
                   res.send(result)
                   console.log('password had been reset')

               }
               else {
                   res.send({ message: "Wrong email!" })
               };
           })
    

   }else{
    res.send({message: 'please make sure you confirm password rightfully'})
    console.log('pass and confirm are not matched')
   }
});







app.get(`/verify/:verifyID`,
(req,res)=>{
    const {verifyID} = req.params
    console.log(verifyID)
    db.query('UPDATE users SET ischecked = ? WHERE id = ? ',
    [true,Number(verifyID)],(err,result)=>{
        
        if(err){
            res.send({err: err})
        }
       if(result.affectedRows>0){
        res.send({message: 'your email had been verified succesfully'})
        console.log('yessss')
       }  
       else{
        res.send({message: 'Oops!, we faced a problem during the process'})
       }
    })
})


app.get('/firstpage',verifyToken  ,(req,res)=>{
    res.status(200).json('welcome to home page')
    console.log(88888888)
})




app.get('/',(req,res)=>{
   
    const token = localStorage.getItem('token');
    if(!token){
        return res.status(403).json('a token is required for Auth')
    }

    try{
        const decode= jwt.verify(token,'SUBSCRIBESOFTWARE12');
        req.user=decode;
        res.send(decode)


    }catch(error){
        return res.status(401).json('Invalid token')
    }
})




app.post('/home/search', (req,res)=>{

    db.execute('SELECT * FROM users ',(err,result)=>{
        if(err){
            res.send({err: err})
        }
        else{
            if(result.length>0){
               
                res.send({usersdata: result})
            
            }
        }
    })
})




app.post(GenerateRoom(), (req, res) => {
    console.log(GenerateRoom())
   
   
    const account = req.body.account
    console.log(account)
    if (emailvalidator.validate(account)) {
        transporter.sendMail({
            to: account,
            subject: 'You have been invited to a board room',
            html: '<p>Click This <a href="http://localhost:3000' + GenerateRoom() + '">Link</a> to join The board room</p>'
        })
        res.send({ message: 'Invitation Sent' })
        console.log('sent')
    } else {
        res.send({ message: 'Email Not Valid' })
    }

})


app.get(GenerateRoom(),(req,res)=>{
    console.log(GenerateRoom());
})



app.listen(3001, (req,res) => {
    

    console.log('server is running');

});





socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
    socket.on("dragDrop",(move)=>{
        socket.broadcast.emit('dragDrop',move)
    })
    
});