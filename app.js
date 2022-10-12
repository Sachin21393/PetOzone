const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');
const Datastore = require("nedb");

//setup database
const user_database = new Datastore('./database/users.db');
const doctor_database = new Datastore("./database/doctors.db");
const inventory_database = new Datastore("./database/inventory.db");
user_database.loadDatabase();
doctor_database.loadDatabase();
inventory_database.loadDatabase();
const databaseTable = {
    doctor: doctor_database,
    inv: inventory_database
}

//setup env variables
const port = process.env.PORT || 80;
const admin_key = process.env.KEY || "hello";

//setup app
const app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded())

//settings of the app
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))





function exportMail(receiver, subject, html,timing){
    let info = transporter.sendMail({
        from: 'petozone update', // sender address
        to: receiver, // list of receivers
        subject: "", // Subject line

        html: html, // html body
    
      
    });
}

//routes
app.get('/', (req, res) => {
    const params = {}
    res.redirect("/login")
})
app.get('/login', (req, res) => {
    const params = {}
    res.status(200).render('login.pug', params);
})
app.get('/form', (req, res) => {
    const params = {}
    res.status(200).render('form.pug', params);
})
app.get('/med', (req, res) => {
    const params = {}
    res.status(200).render('med.pug', params);
})
app.get('/index', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
})
app.get('/add', (req, res) => {
    const params = {}
    res.status(200).render('add.pug', params);
})
app.get('/about' ,(req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/confirm' ,(req, res) => {
    const params = {}
    res.status(200).render('confirm.pug', params);
})

app.post('/contact', async (req, res) => {
    var newData = req.body;
    user_database.insert(newData, (err) => {
        if (err) {
            res.status(400).send("nooo")
        }else{
            res.render("login.pug")
        }
    });
});
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    user_database.findOne({ email: email }, (err, data) => {
        try{
            console.log(data.password,password);
            console.log(data);
            if (data.password===password) {
                           res.status(200).render('index.pug');
            }else{
               res.send("invalid");
            }
        }
        catch{
            res.redirect("/")
        }
    });
})
app.post('/dlogin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    user_database.findOne({ email: email }, (err, data) => {
        try{
            console.log(data.password,password);
            console.log(data);
            if (data.password===password) {
                           res.status(200).render('qr.pug');
            }else{
               res.send("invalid");
            }
        }
        catch{
            res.redirect("/")
        }
    });
})
app.get("/admin", (req,res) => {
    res.status(200).render("admin.pug", {});
})

app.get("/add_doctor", (req,res) => {
    res.status(200).render("admin_doc.pug", {});
})

app.get("/add_inv", (req,res) => {
    res.status(200).render("admin_inv.pug", {});
})

app.get("/doctor", (req,res) => {
    res.status(200).render("doctor.pug", {});
})


app.get("/add_to_database_doctor/:key/:name/:number", (req,res) => {
    console.log("adding")
    const doc = {
        name: req.params.name,
        number: req.params.number
    }
    console.log(doc)
    const req_key = req.params.key;
    res.contentType('application/json');
    if (req_key == admin_key){
        doctor_database.insert(doc, err => {
            if (err){
                console.log(err)
                res.status(400).send({status: "error"})
            }
            else{
                res.status(200).send({status:"success"})
            }
        });
    }
    else{
        res.status(400).send("Invalid Key")
    }
})

app.get("/add_to_database_inv/:key/:name/:price/:stock", (req,res) => {
    console.log("adding")
    const doc = {
        name: req.params.name,
        price: req.params.price,
        stock: req.params.stock
    }
    console.log(doc)
    const req_key = req.params.key;
    res.contentType('application/json');
    if (req_key == admin_key){
        inventory_database.insert(doc, err => {
            if (err){
                console.log(err)
                res.status(400).send({status: "error"})
            }
            else{
                res.status(200).send({status:"success"})
            }
        });
    }
    else{
        res.status(400).send("Invalid Key")
    }
})

app.get("/list/:db_name", (req,res) => {
    console.log(req.params.db_name)
    const db = databaseTable[req.params.db_name];
    db.find({}, (err, data) => {
        res.status(200).json(data);
    })
})

app.post("/confirm_appointment", async (req,res) => {
    // const doc_id = req.body.doc_id;
    const email = req.body.email;
    const timing = req.body.timing;
    const name = req.body.name;


    const user = user_database.findOne({ email: email }, (err, data) => {
        const html = `
        <html>
        <head>
        </head>
        <style>
            .header{
                text-align: center;
                background-color:black ;
                color: beige;
                font-size: medium;
            }
            .container{
                color: black;
                font-size: medium;

            }
            .text{
                font-size: medium;
                text-align: center;


            }
            .footer{
                background-color: black;
                color: white;
            }
        </style>
        <body style="background-color:rgb(193, 250, 250);">
         <div class="header" style=" text-align: center;
         background-color:black ;color:white;">  <h1>Congratulation!!!!</h1></div>
         <hr>
         <div class="container">
             <h2><i>DEAR SIR/MADAM,</i></h2>
            <div class="text" style=" text-align: center;"> <P><b><i>We are here to inform you that you have succesfully booked an appoinment with are verified doctor <br>
                 and it is your first appointment so it will be free of cost.Other details like video calling link will be <br> sent to you
                 your registered mobile number as your mentioned timing.:):):)</b></i>
             </P>
            </div>
         </div>
         <hr>
        
         <div class="footer">
             <h2><i>Thank You!!</i></h2>

             <h3><i>Regards:PetoZone</i></h3>
         </div>

        </body>
        </html>



        `
        exportMail(email, "Confirmation for booking", html)
    });
})

app.post("/checkout", (req,res) => {

});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

