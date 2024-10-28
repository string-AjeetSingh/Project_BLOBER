const mg = require("mongodb");
//const client = new mg.MongoClient('mongodb://localhost:27017/');
const client = new mg.MongoClient('mongodb+srv://asdhod2003:y74TG8pBSxG09d82@blobercluster.8rovz.mongodb.net/');

let {alib} = require('./../PracLib/alib');  //a parctise lib, in working.



exports.registration = (req, res) => {

    console.log(req.body);
    /* 
    
    req.body = {
        'task': 'preemail'
    }
    */


    /* 
    
    const ud = {
        userName: 'ajeet466966333',
        email: 'ajeet45@gmail.com',
        pass: 'Ajjet34'
    }
    */
    let ud = {
        userName: req.body.userName,
        email: req.body.email,
        pass: req.body.pass
    }

    //run(ud);

    switch (req.body.task) {
        case 'preuserName':

            reguserName(ud.userName).then(data => {
                res.json(data);
            })
            break;

        case 'preemail':
            console.log('from preemail');
            regemail(ud.email).then(data => {
                res.json(data);
            })
            break;

        case 'submit':

            regSubmit(ud).then(data => {
                console.log(data);
                res.json(data);
            });
            // console.log(data);



            break;

        default:
            break;
    }



}


exports.login = (req, res) => {

    console.log('From login');
    console.log(req.body);

    /* 
    
    req.body.par = {
        userName : 'abhi456745',
        pass : 'abhi456'
    };
    */

    logit(req.body).then(data => {

        if (data.output) {
            req.session.emailxt = req.body.email
        }

        res.json(data);
        console.log(data);
    })




}

exports.logout = (req, res) => {

    console.log("Attemp to logout");
    
    req.session.emailxt = null;

    if (!req.session.emailxt) {
        res.json({ "output": true, mess: 'See you later , you are loged out' });

    } else {

        res.json({ "output": false, mess: 'unable to logout' });
    }
}

exports.checkLogin = (req, res) => {
    console.log('Going to check');
    console.log(req.session.emailxt);

    if (req.session.emailxt != undefined) {
        res.json({ output: true, mess: 'Loged in', data: req.session.emailxt });
    }
    else {
        res.json({ output: false, mess: 'Not Logged in', data: undefined });
    }
}

exports.trending = (req, res) => {

    console.log('call trending');

    gettrending().then((data) => {
        //console.log(data);
        res.json({ "data": data });
    });

}

exports.recent = (req, res) => {

    console.log('call recent');

    getrecent().then((data) => {
        // console.log(data);
        res.json({ "data": data });
    });


}
exports.recentPostUser = (req, res) => {

    console.log('call recentPostUser');

    getrecentPostUser(req.session.emailxt)
        .then((data) => {
            // console.log(data);
            res.json({ "data": data });
        });


}

exports.getlike = (req, res) => {

    console.log('call getlike');
    console.log(req.body);

    fetchlike(req.body.name)
        .then((data) => {
            //console.log(data);
            res.json({ "data": data[0].like });
        });
}

exports.getliked = (req, res) => {

    console.log('call getliked');
    console.log(req.body);
    if(req.session.emailxt){

        
        fetchliked(req.body.name, req.session.emailxt, req.body.from)
        .then((data) => {
            console.log(data);
            res.json(data);
        });
    }
    else{
        console.log("no session found");
        res.json({output : "true"});
    }
}

exports.getpost = (req, res)=>{
    console.log('from getPost');
    console.log(req.body);
    fetchPost(req.body.name)
    .then((data)=>{
        console.log(data[0]);
        res.json({"data" : data});
    })
}

exports.getcomments = (req, res)=>{
    console.log('from comments');
    console.log(req.body);

    fetchComments(req.body.name)
    .then((data)=>{
        console.log(data);
        res.json({"output" : true, data : data});
    }).catch((e)=>{
        res.json({'output' : false, mess : e});
        console.error(e);
    })
}

exports.setlike = (req, res) => {

    console.log('call setlikes');

    setlikes(req.body.name, req.session.emailxt)
        .then(() => {
            fetchlike(req.body.name)
                .then((data) => {
                    console.log(data);
                    res.json({ "data": data[0].like });
                });

        });
}

exports.deletePoste = (req, res) => {

    console.log('call deletePost');
    console.log(req.body);
    deleteP(req.body.name)
        .then((response) => {
            res.json({ mess: 'attempt to delete' });
        })

}

exports.createPost = (req, res) => {

    console.log("form create Post");
    console.log(req.body);

    createP({
        email: req.session.emailxt,
        title: req.body.title,
        data: req.body.data
    }).then(() => {

        res.json({ output: true });
    })

}

exports.createComment = (req, res) => {

    console.log("form create comment");
    console.log(req.body);

    createC(req.body.name, req.session.emailxt,
        req.body.comment
    ).then((ret)=>{
        if(ret){
            res.json({'output' : true}); res.end();
        }
        
    }).catch((e=>{
        res.json({'output' : false, mess : e});
        console.error(`From createComment --- ${e}`);
    }));

  

}



exports.rough = (req, res) => {
    console.log("Form rough");
    
    let mongo = new alib('db1');
   
    mongo.setCollection('users');
    mongo.find({}).then((data)=>{
        console.log(data);
        mongo.insertOne({doc : 'dummy', name : 'First Update to the BLOBERCluster by xtserver'}).then((data)=>{
            console.log(data)
        })
    })

    

    res.status(200);
    res.json({ "Hello": "Hero"});

}



















//Functions Ahead ---------------------------------------------------------


async function run(parm) {

    await client.connect();

    const current = client.db('db1').collection('users');
    let state = current.find({ "UserName": parm.UserName });
    let result = await state.toArray();
    // console.log(result.length);
    // console.log(result);

    if (result.length < 1) {
        // console.log('form if container');
        state = await current.insertOne({ ...parm });
        result = state;
        console.log(result);

    }
    else {
        //console.log('already registered');
    }

}

async function regSubmit(param) {       //working fine

    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('users');

    state = curr.find({ userName: param.userName });
    result = await state.toArray();

    if (result.length < 1) {           //check if userName not exists
        state = await curr.insertOne({ ...param });
        result = state;

        console.log(result);

        if (result.acknowledged) {

            return { output: '1' };
        }

        return { output: 'some error' };
    }
    else {                            //if exists
        // console.log("already registered userName");
        // console.log(result);


        return { output: '0' };
    }




}


async function reguserName(param) {         //working fine
    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('users');

    state = curr.find({ userName: param });
    result = await state.toArray();

    if (result.length < 1) {           //check if userName not exists

        return { output: true };

    }
    else {                            //if exists
        // console.log("already registered userName");
        // console.log(result);
        return { output: false };
    }

}


async function regemail(param) {     //working fine
    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('users');

    state = curr.find({ email: param });
    result = await state.toArray();

    if (result.length < 1) {           //check if email not exists

        return { output: true };

    }
    else {                            //if exists
        //console.log("already registered userName");
        // console.log(result);
        return { output: false };
    }

}


async function logit(param) {     //working fine
    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('users');

    state = curr.find({ email: param.email });
    result = await state.toArray();

    if (result.length < 1) {           //check if userName not exists

        state = curr.insertOne({ email: param.email, pass: param.pass, prevNo: 0, posts: [], doc: 'user', liked : [] }); ``

        return { output: 2, mess: 'Attempt to register' };

    }
    else {                            //if exists
        //console.log("else running");
        //console.log(result);

        //console.log(result.pass);
        //console.log(param.pass);

        if (result[0].pass == param.pass) {      //if password matchers
            return { output: true, mess: 'succesfully matched' };
        } else {                                 //else not matches

            return { output: false, mess: 'wrong password' };
        }
    }

}

async function gettrending() {

    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('posts');

    state = curr.aggregate([{ $match: { doc: 'post' } },
    { $sort: { like: -1 } }]);
    result = await state.toArray();


    return result;
}

async function getrecent() {

    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('posts');

    state = curr.aggregate([{ $match: { doc: 'post' } },
    { $sort: { No: -1 } }]);
    result = await state.toArray();



    return result;
}

async function getrecentPostUser(par) {

    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('posts');

    state = curr.aggregate([{ $match: { from: par } },
    { $sort: { No: -1 } }]);
    result = await state.toArray();



    return result;
}

async function fetchlike(par) {

    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('posts');

    state = curr.aggregate([{ $match: { name: par } },
    { $project: { like: 1 } }]);
    result = await state.toArray();



    return result;
}

async function fetchliked(par, useremail, from) {

    await client.connect();
    let out = {};
    out.output1 = false;
    out.output2 = false;
    let result, state, curr;
    curr = client.db('db1').collection('users');

    state = curr.aggregate([{ $match: { email: useremail } },
    { $project: { liked: 1 } }]);
    result = await state.toArray();


    for (let index = 0; index < result[0].liked.length; index++) {

        if (result[0].liked[index].trim().normalize() == par.trim().normalize()) {
            out.output1 = true;
        }


    }

    state = curr.aggregate([{ $match: { email: useremail } },
    { $project: { email: 1 } }]);
    result = await state.toArray();
    if (result[0].email == from) {
        out.output2 = true;
    }

    return out;


}


async function fetchPost(post){

        await client.connect();
        
        let result, state, curr;
        curr = client.db('db1').collection('posts');
        
        state = curr.find({name : post});

        result = await state.toArray();

         return result;
    
}


async function fetchComments(post){

    const mongo = new alib('db1');
    mongo.setCollection('comments');

    let result;

    result = await mongo.ag([{$match : {to : post}},
        {$sort : {No : -1}}
    ]);
    
    if(result.length > 0){
        return result;
    }
    else{
        throw new Error("No Comment Data from DataBase");
    }


}




async function setlikes(par, useremail) {

    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('posts');
    users = client.db('db1').collection('users');

    state = await users.updateOne({ email: useremail }, { $push: { liked: par } })
    state = await curr.updateOne({ name: par }, { $inc: { like: 1 } })
    //result = await state.toArray();



    //return result;
}

async function deleteP(par) {
    await client.connect();

    let result, state, curr;
    curr = client.db('db1').collection('posts');

    state = await curr.deleteOne({ name: par });
    console.log(state);


    //result = await state.toArray();

}

async function createP(par) {
    await client.connect();

    let result, state, curr, users, posts;

    users = client.db('db1').collection('users');
    posts = client.db('db1').collection('posts');

    state = users.aggregate([{ $match: { email: par.email } },
    { $project: { prevNo: 1 } }
    ]);
    state = await state.toArray();
    console.log(state);

    let userPrevNo = state[0].prevNo + 1;
    let userPostName = par.email + '#' + userPrevNo;


    state = await users.updateOne({ email: par.email },
        { $push: { posts: userPostName } }
    )

        console.log(state);
        state = await users.updateOne({ email: par.email },
        { $set: { prevNo: userPrevNo } }
    )

    state = posts.aggregate([
        { $match: { doc: 'var' } },
        { $project: { prevNo: 1 } }
    ])
    state = await state.toArray();
    console.log(state);
    let postPrevNo = state[0].prevNo + 1;


    state = await posts.insertOne(
        {
            doc: 'post',
            from: par.email, name: userPostName,
            data: par.data, title: par.title,
            No: postPrevNo + 1, like: 0,
            date: new Date().toLocaleDateString()
        }
    );

    console.log(state);

    state = await posts.updateOne({ doc: 'var' },
        { $set: { prevNo: postPrevNo } }
    )



}

async function createC(post, from, comment) {

   
        const mongo = new alib('db1');
        let result; let date = new Date;
        date = date.toLocaleString();

        mongo.setCollection('comments');
        result = await mongo.ag([{$match : {doc :'var'}},
            {$project : {prevNo : 1}} //get the prevNo
        ])
        console.log(`The prev no is ${result[0].prevNo}`);
        let newprevNo = result[0].prevNo + 1;
        console.log(`The new prev no is ${newprevNo}`);

        
        await mongo.updateOne({doc : 'var'},  //reset the prevNo.
            {$set : {prevNo : newprevNo}}
            );
            
            result = await mongo.insertOne({doc : 'comment',
                from : from, to : post, data : comment,
                date : date, No : newprevNo
                });
                
                console.log(result);
                if(result.acknowledged){
                    return true;
                }
                else{
                     throw new Error("Update not achknowleged")
                }
                
         
   
    


}



