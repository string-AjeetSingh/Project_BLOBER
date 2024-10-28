import './write.css';
import './../MainWithLogin/main2.css';
import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ButtonAnimation } from '../Animation/animation';

let MyContext = createContext('defalut value');
let MyContext2 = createContext('defalut value');


function Cards({ param, children }) {
    const deleteButt =useRef(null);
    ///console.log('below data from cards');
    ////console.log(param.data);
     
  
    //............................................................
    function handleDelete() {
       ////console.log("form handleDelete");
       ////console.log(param.data.name);
        
        ///console.log("attempt to delete post");
        deletepost(param.data.name)
        .then((result) => {
            ///console.log(result);
            
            ///console.log(" now attempt to fetchRecent");
            fetchRecentPostUser()
            .then((res) => {
                param.setdata(res);
                })
                })
                /* 
        */


    }

    //...........................................................

    return (
        <>
            <div className="card-contain">
                <div className="card-user">
                    <div className="user-pack">
                        <div className="card-user-img">
                        </div>
                        <div className="card-user-email">
                            {param.data.from}
                        </div>
                    </div>
                    <Like param={{
                        name: param.data.name,
                       
                    }}></Like>
                </div>
                <div className="card-title">
                    <u> {param.data.title}</u>
                </div>
                <textarea readOnly
                    value={param.data.data}
                    className='card-data'></textarea>
                <div className='card-date'>{param.data.date}</div>
                <button ref={deleteButt} onClick={async () => {
                    await ButtonAnimation(deleteButt);
                    handleDelete();
                }}
                    className='delete'>Delete</button>
            </div>
        </>
    );
}

function Like({ param, children }) {
    const [lstate, setlstate] = useState(null);
   



    //....................................................

    async function fetchLike() {
        ///console.log("From fetchLike() below");
      ///console.log(param.name);
        let data = {
            name: param.name
        }

        let res = await fetch('http://localhost:3500/xt/api/fetch/like',
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            }
        )

        if (res.ok) {
            let js = await res.json();
            return js;
        } else {
            console.error("error like connection")
        }
    }


    async function setLike() {
        let data = {
            name: param.name
        }

        let res = await fetch('http://localhost:3500/xt/api/like',
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            }
        )

        if (res.ok) {
            let js = await res.json();
            return js;
        } else {
            console.error("error setlike connection")
        }
    }

    function handleLikeButt() {

        setLike(param.name)
            .then((res) => {
                ///console.log("from like butt");
                ///console.log(res);
                setlstate(res.data);
            });
    }

    useEffect(() => {

       
        fetchLike()
            .then((res) => {
                setlstate(res.data);
            });

    })

    //....................................................

    return (
        <>
            <div onClick={() => {
                // handleLikeButt();
            }} className='like-pack-user'>

                <div className='like-user'>Like : </div>
                <div className='like-count-user'>{lstate}</div>
            </div>
        </>
    );
}

function NavCardButt({param, children}){
    
    const {swi, setswi} = useContext(MyContext2);
    
    const aref = useRef();

   ///console.log(' from naveCardButt');
    ///console.log(param.data);

   

    useEffect(()=>{
        
        if(swi){
            ///console.log(' from naveCardButt swi');


            if(swi == param.swiequalent){
                
               ///console.log("setting the stuff");
             
                
            aref.current.style.border = '2px solid black';
        }else{
            aref.current.style.border = '1px solid purple';
            
        }
    }
        
    }, [swi])



    function handleClick(){
       setswi(param.swiequalent);
       let arr = [];
                param.data.forEach(element => {
                arr.push(<Cards param={{
                    data: element,
                    setdata : param.setdata
                    

                }} />)
            });
            param.setenddata(arr);

    }
    
    return (
    <>
    <button ref={aref} onClick={()=>{
        handleClick();
    }} className='nav-card-button'>
        {children}
    </button>
     </>
    );
}

function NavCard({ param, children }) {

    let [lstate, setlstate] = useState(null);
    const refNavCardButtFunc = useRef(null);
   
    const {swi, setswi} = useContext(MyContext2);

    //.........................................
    class useData {
        constructor() {
            this.length = param.data.data.length;
            this.pos = 0;
        }
        getVal() {    //get the value from array, one after one,each call.
            let out;
            if (this.pos < this.length) {
                out = param.data.data[this.pos];
                this.pos++;

                return out;
            }
            else {
                return false;
            }
        }
        reset(){
            this.pos = 0;
        }
    }

    let fetchData = new useData();



    //........................................

    //............................................ 
    function  setDefaultEndData(arrdata){
      ///console.log("Form setDefaultEndData");
      if(arrdata.length < 1){
          param.setenddata(<h1 style={{
            margin : '5px', padding : '5px'
          }}>You Not Post Anything Yet - </h1>);

      }else{

          let arr = [];
          arrdata.forEach(element => {
            
              ///console.log(element);
              arr.push(<Cards param={{
                  data: element,
                  setdata : param.setdata
                  
                  
                }} />)
            });
    param.setenddata(arr);
        }
    }

    useEffect(() => {
        if (param.data) {
         
            
            //set the finalcount for NavCard
            let arr = [];
            let arr2 = [];
            let arr3 = [];
            let p = param.data.data.length / 10;
            let g = parseInt(p);
            let finalcount;
            if (p == g) {
                finalcount = g
                
            } else {
                finalcount = g + 1;
            }

            //using finalcount to update lstate
            ///console.log('from param.cou effect');
            ///console.log(`finalcount = ${finalcount}`)
            fetchData.reset(); //reset the fetchData pos, so array can be fetched
            
            for(let i = 0; i <finalcount; i++){
                for(let j=0; j < 10; j++){
                    let out = fetchData.getVal();
                    if(out != false){
                        arr2.push(out);
                 }else{
                    
                    break;
                 }
                }
                ///console.log(arr2);
               
                arr.push(<NavCardButt param={{
                    setenddata : param.setenddata,
                    data :arr2,
                    swiequalent : i+1,
                    setdata : param.setdata,
                    parRef : refNavCardButtFunc
                }}>
                    {i+1}
                </NavCardButt>)
                if(i == 0){
                    arr3 = arr2;
                }
                arr2 = [];
            }
           setDefaultEndData(arr3);
            setlstate(arr);

        }
    }, [param.data])

    useEffect(()=>{
        if(lstate){
            setswi(1);
        }
    }, [lstate])
    //............................................ 

    return (
        <>
            {lstate}
        </>
    );

}



function Write({ param, children }) {
    const [data, setdata] = useState(null);
    const [enddata, setenddata] = useState(null);
    const [swi, setswi] = useState(null);
    const [up, setup] = useState(0);
    const [cou, setcou] = useState(null);         //how many buttons for post navigation
    const [title, settitle] = useState('');
    const [post, setpost] = useState('');
    const [poststatus, setpoststatus] = useState('Post');

    const aref = useRef(null);
    const bref = useRef(null);
    const cref = useRef(null);
  
    //...........................................................
    function handlePost() {
        ///console.log('form handlePost');
        ///console.log('attempt to create');
        setpoststatus('Posting');
        aref.current.disabled = true;
        bref.current.disabled = true;
        cref.current.style.backgroundColor = 'grey';

        createPost({ title: title, data: post })
            .then((res) => {
                if (res.ok) {
                    ///console.log("createPost connection succesfull");

                    setpost(''); settitle('');

                    if(res.output){

                        
                        setTimeout(() => {       //if succesfull hava a timout to see some effect.
                            setpoststatus('Post');
                            aref.current.disabled = false;
                            bref.current.disabled = false;
                            cref.current.style.backgroundColor = 'palevioletred';
                            
                            alert("succesfully post");
                        }, 1000);
                    }
                    else{
                        alert('An error from server');
                    }
                        
                    setpost(''); settitle('');
                    ///console.log("goind to fetchREcent");
                    fetchRecentPostUser()
                        .then((result) => {
                            setdata(result);
                        })

                } else {
                    ///console.log("createPost connection failed");

                }


            })
    }

    
    useEffect(() => {


        if (data) {

            setup((i) => i + 1);
        }


    }, [data]);

    useEffect(() => {
       
        fetchRecentPostUser()
            .then((data) => {
                ///console.log(data);
                setdata(data);
            });
    }, [])
   ///console.log(post);
    //...........................................................


    return (
        <>

            <MyContext.Provider value={{ up, setup, data, setdata }}>

                <div className="write-pack">
                    <div className='write-heading'>Write Your Post :-</div>
                    <div className="write-contain">
                        <textarea maxLength={70} onChange={(e) => {
                            settitle(e.target.value);
                        }}
                            value={title} placeholder='Title'
                            className='write-title'
                            ref={aref}>

                        </textarea>
                        <textarea maxLength={2000} onChange={(e) => {
                            setpost(e.target.value);
                        }}
                            value={post}
                            placeholder='Write Your Post ...'
                            className="write-post"
                            ref={bref}>
                        </textarea>
                        <button  onClick={async () => {
                            await ButtonAnimation(cref)
                            ///console.log("Posting");
                            handlePost();
                        }} ref={cref} className='post-button'>
                            {poststatus}
                        </button>
                    </div>
                </div><hr></hr>
                <div className="content-pack">
                    <div className="content-contain">
                        <div className="content-i1">
                            Your Posts :
                        </div>
                        <div className="content-i2">
                            {enddata}
                        </div>

                        <div className="content-i3">
                        <MyContext2.Provider value={{swi, setswi}}>
                            {data ? <NavCard param={{
                                cou: cou,
                                setenddata: setenddata,
                                data: data,
                                setdata : setdata
                                
                            }} /> : 'Data not found'}
                            </MyContext2.Provider>
                        </div>
                    </div>
                </div>
            </MyContext.Provider>
        </>
    );
}


export { Write };



























//Function Ahead.....................................
async function fetchRecentPostUser() {

    let res = await fetch("http://localhost:3500/xt/api/fetch/recentPostUser",
        {
            method: "POST", headers: { 'content-type': 'application/json' },
            credentials: 'include'
        }
    );

    if (res.ok) {
        ///console.log('connection succesfull');

        let js = await res.json();
        return js
    }
    else {
        ///console.log('connection failed');
        return false;
    }

}

async function deletepost(par) {
    let data = {
        name: par
    }
    let res = await fetch("http://localhost:3500/xt/api/deletePost",
        {
            method: "POST", headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    );

    if (res.ok) {
        ///console.log('connection succesfull');

        let js = await res.json();
        return js
    }
    else {
        ///console.log('connection failed');
        return false;
    }
}


async function createPost(par) {
    let data = {
        title: par.title,
        data: par.data
    }
    let res = await fetch("http://localhost:3500/xt/api/createPost",
        {
            method: "POST", headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data), credentials: 'include'
        }
    );

    if (res.ok) {
        ///console.log('connection succesfull');

        let js = await res.json();
        js.ok = res.ok;
        return js
    }
    else {
        ///console.log('connection failed');
        return res;
    }
}