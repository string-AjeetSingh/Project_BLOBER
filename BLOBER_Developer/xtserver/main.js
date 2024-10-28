const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoClient = require('connect-mongo');
const cors = require('cors');
const handle = require('./LIB/Handles/handles');
const alib = require('./LIB/PracLib/alib');


const port = 3500;
const app = express();
const apiAddress = 'http://localhost:3500/xt/api/';

//Config-----------------------------------------------------------

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'clientBuild/build')));

app.use(session({
    saveUninitialized :false,
    resave : false,
    secret : 'i am secreate',
   
    cookie : {
        secure : false, 
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Set expiration to 1 day
    httpOnly : true,
    secure : false,
    },
     store : mongoClient.create({
        mongoUrl : 'mongodb+srv://asdhod2003:y74TG8pBSxG09d82@blobercluster.8rovz.mongodb.net/db1',
        collectionName : 'sessions'
     })


}));

/* 

app.use(cors({
    origin : 'http://localhost:3000',
    methods: ['GET', 'POST'],  // Allow specific methods
    optionsSuccessStatus: 200 // For older browsers compatibility
}));
*/

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3000/Login'];
    app.use(cors({
        
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            // Check if the origin is in the allowedOrigins array
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified origin.';
                return callback(new Error(msg), false);
                }
                return callback(null, true);
                },
                methods: ['GET', 'POST'], // Allow specific HTTP methods
                credentials: true // Enable credentials (cookies, authorization headers, etc.)
                }))
                 

    //------------------------------------------------------------------



app.get('http://localhost:3500/xt/api', (req, res) => {
    res.type('html');

    res.send(`
        <h1> Working on xt Api </h1>
        `).end();
})


app.get('http://localhost:3500/xt/api/session/:name', (req, res) => {
    res.type('html');

    req.session.user = {username : req.params.name, age  : 21};

    res.send(`
        <h1> Session set </h1>
        <b>user =  ${req.session.user.username}</b>
        `).end();
})

app.post('http://localhost:3500/xt/api/registration',  handle.registration);
app.post('http://localhost:3500/xt/api/login',  handle.login);
//app.post('http://localhost:3500/xt/api/rough',  handle.rough);
//app.get('http://localhost:3500/xt/api/rough',  handle.rough);
app.post('http://localhost:3500/xt/api/checkLogin', handle.checkLogin);
app.post('http://localhost:3500/xt/api/logout', handle.logout);
app.post('http://localhost:3500/xt/api/fetch/trending', handle.trending);
app.post('http://localhost:3500/xt/api/fetch/recent', handle.recent);
app.post('http://localhost:3500/xt/api/fetch/recentPostUser', handle.recentPostUser);
app.post('http://localhost:3500/xt/api/fetch/like', handle.getlike);
app.post('http://localhost:3500/xt/api/fetch/liked', handle.getliked);
app.post('http://localhost:3500/xt/api/fetch/post', handle.getpost);
app.post('http://localhost:3500/xt/api/fetch/comments', handle.getcomments);
app.post('http://localhost:3500/xt/api/like', handle.setlike);
app.post('http://localhost:3500/xt/api/deletePost', handle.deletePoste);
app.post('http://localhost:3500/xt/api/createPost', handle.createPost);
app.post('http://localhost:3500/xt/api/createComment', handle.createComment);

app.get("*", (req, res) => {
   
    // res.sendFile(path.join(__dirname, 'clientBuild/build/index.html'));
     res.type('html').send(<h1>Welcome to Servr XT</h1>).end();
 })

app.listen(port, () => {
    console.log(`Server on port = ${port}, press ctrl
         c to terminate`);
})