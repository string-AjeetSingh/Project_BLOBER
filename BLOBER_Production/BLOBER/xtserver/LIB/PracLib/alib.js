const mg = require("mongodb");
//const client = new mg.MongoClient('mongodb://localhost:27017/');
const client = new mg.MongoClient('mongodb+srv://asdhod2003:y74TG8pBSxG09d82@blobercluster.8rovz.mongodb.net/');


class alib {
    constructor(database) {
        this.db = database;
        this.client = client;
        this.collection = {};
        this.collectionName = null;

        (async () => {
            await this.client.connect();
        })();


    }
    async find(query) {


        if (Object.keys(this.collection).length > 0) {
            let state = await this.collection[this.collectionName].find(query);
            state = await state.toArray();
            return state;
        }
        else {

            throw new Error("set collection first");

        }
    }

    async ag(query){
        if (Object.keys(this.collection).length > 0) {
            let state = this.collection[this.collectionName]
            .aggregate(query);
            state = await state.toArray();
            return state;
        }
        else {

            throw new Error("set collection first");

        }
    }

    async insertOne(query){
        if (Object.keys(this.collection).length > 0) {
            let state = await this.collection[this.collectionName]
            .insertOne(query);
        
            return state;
        }
        else {

            throw new Error("set collection first");

        }

        
    }

    
    async updateOne(matching, update){

      
        if (Object.keys(this.collection).length > 0) {
            let state = await this.collection[this.collectionName]
            .updateOne(matching, update);
        
            return state;
        }
        else {

            throw new Error("set collection first");

        }
    }

    setCollection(str) {
        this.collection[str] = this.client.db(this.db).collection(str);
        this.collectionName = str;

    }



}

//let con = new alib('db1');


async function run() {
    try {

        con.setCollection('users');
        let data = await con.find({ 'email': 'ajeet@gmail.com' });
        console.log(data);

        con.setCollection('posts');
        data = await con.ag([{$match : {"from" : "rough@gmail.com"}}]);
         console.log(data);

         /* 
         
         con.setCollection('posts');
         data = await con.insertOne
         ({doc : "dummy"});
         console.log(data);
         */

         /* 
    )
    data =  await con.updateOne({doc : 'dummy'},
    {$set : {name : 'Ajeet'}});
    
    console.log(data);
    */
} catch (error) {
    console.error(error);
}

}

//run();

exports.alib = alib;
/* 

con.activate().then(()=>{
    con.setCollection('users');
    con.find({'email' : 'ajeet@gmail.com'}).then((data)=>{
        console.log(data);
    }).catch((e) =>{
        console.error(e);
    })
})
*/
