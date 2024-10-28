const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoClient = require('connect-mongo');
const cors = require('cors');
const handle = require('./LIB/Handles/handles');
const alib = require('./LIB/PracLib/alib');


const port = 3500;
const app = express();
const apiAddress = '/xt/api/';

//Config-----------------------------------------------------------

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'clientBuild/build')));

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

/* 
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3000/Login',
    
    ];
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
*/
    //------------------------------------------------------------------



app.get('/xt/api', (req, res) => {
    res.type('html');

    res.send(`
        <h1> Working on xt Api </h1>
        `).end();
})


app.get('/xt/api/session/:name', (req, res) => {
    res.type('html');

    req.session.user = {username : req.params.name, age  : 21};

    res.send(`
        <h1> Session set </h1>
        <b>user =  ${req.session.user.username}</b>
        `).end();
})

app.post('/xt/api/registration',  handle.registration);
app.post('/xt/api/login',  handle.login);
//app.post('/xt/api/rough',  handle.rough);
//app.get('/xt/api/rough',  handle.rough);
app.post('/xt/api/checkLogin', handle.checkLogin);
app.post('/xt/api/logout', handle.logout);
app.post('/xt/api/fetch/trending', handle.trending);
app.post('/xt/api/fetch/recent', handle.recent);
app.post('/xt/api/fetch/recentPostUser', handle.recentPostUser);
app.post('/xt/api/fetch/like', handle.getlike);
app.post('/xt/api/fetch/liked', handle.getliked);
app.post('/xt/api/fetch/post', handle.getpost);
app.post('/xt/api/fetch/comments', handle.getcomments);
app.post('/xt/api/like', handle.setlike);
app.post('/xt/api/deletePost', handle.deletePoste);
app.post('/xt/api/createPost', handle.createPost);
app.post('/xt/api/createComment', handle.createComment);

app.get("*", (req, res, next) => {
    // res.type('html');
    
     res.sendFile(path.join(__dirname, 'clientBuild/build/index.html'));
     
 })

app.listen(port, () => {
    console.log(`Server on port = ${port}, press ctrl
         c to terminate`);
})