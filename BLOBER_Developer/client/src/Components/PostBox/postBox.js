import {useState, useRef, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Comment } from '../Comment/comment';
import { ButtonAnimation } from '../Animation/animation';

import './postBox.css';



function Cards({ param, children }) {
    const navigate = useNavigate();
    ///console.log('below data from cards');
    ///console.log(param.data);
    return (
        <>
            <div className="card-contain postBox-card-contain">
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
                        from : param.data.from,
                        setup: param.setup
                    }}></Like>
                </div>
                <div className="card-title">
                   <u> {param.data.title}</u> 
                </div>
                <textarea readOnly
                    value={param.data.data}
                    className='card-data postBox-card-data'></textarea>
                <div className='card-date'>{param.data.date}</div>
            </div>
        </>
    );
}

function Like({ param, children }) {
    const [lstate, setlstate] = useState(null);
    const aref = useRef(null);
    const bref = useRef(true);
 




    //....................................................

    async function fetchLike() {
        let data = {
            name: param.name
        }

<<<<<<< HEAD
        let res = await fetch('http://localhost:3500/xt/api/fetch/like',
=======
        let res = await fetch('/xt/api/fetch/like',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            }
        )

        if (res.ok) {
            let js = await res.json();
            return js;
        } else {
           /// console.log("error like connection")
        }
    }


    async function setLike() {
        let data = {
            name: param.name
        }

<<<<<<< HEAD
        let res = await fetch('http://localhost:3500/xt/api/like',
=======
        let res = await fetch('/xt/api/like',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data), credentials : 'include'
            }
        )

        if (res.ok) {
            let js = await res.json();
            return js;
        } else {
            console.error("error setlike connection")
        }
    }

    async function checkLiked() {
        let data = {
            name: param.name,
            from : param.from
        }

<<<<<<< HEAD
        let res = await fetch('http://localhost:3500/xt/api/fetch/liked',
=======
        let res = await fetch('/xt/api/fetch/liked',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data), credentials : 'include'
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

        checkLiked().then((res)=>{

            if(res.output1 || res.output2){
               if(aref.current){
                   aref.current.style.backgroundColor = 'gray';
               }
                bref.current = false;
            }
            else{

            }
        });
        fetchLike()
            .then((res) => {
                setlstate(res.data);
            });

    })

    //....................................................

    return (
        <>
            <div ref={aref} onClick={async() => {
               await ButtonAnimation(aref);
               if(bref.current){
                    handleLikeButt();
                }
            }} className='like-pack'>

                <div className='like'>Like : </div>
                <div className='like-count'>{lstate}</div>
            </div>
        </>
    );
}


function PostBox({children}){
    let {name} = useParams();
    let decodeName = decodeURIComponent(name);
    const [dataPost, setDataPost] = useState(null);  
 


    //.............................................
   useEffect(()=>{
   
        let lfun = async () =>{
            let data = await fetchPost(decodeName);
       /// console.log(data.data[0]);
        setDataPost(data.data[0]);
        }

        lfun();
    return ()=>{

    }        
   }, [decodeName])
    //.............................................

    ///console.log(dataPost);
    return (
    <>
    <div className="postBox-pack">
    {dataPost?<Cards param={{data : dataPost}}
    ></Cards>:'No Post Data'}
     
    </div><hr></hr>
    <div className="comment-pack">
        <Comment  postName={decodeName}
        ></Comment>
    </div>
     </>
    );
}

export {PostBox};






































//Functions Ahead ...................................................................................

async function fetchPost(par) {

    let data =  {
        name : par
    }

<<<<<<< HEAD
    let res = await fetch("http://localhost:3500/xt/api/fetch/post",
=======
    let res = await fetch("/xt/api/fetch/post",
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
        { method: "POST", headers: { 'content-type': 'application/json' },
    body : JSON.stringify(data) }
    );

    if (res.ok) {
       /// console.log('connection succesfull');

        let js = await res.json();
        return js
    }
    else {
        ///console.log('connection failed');
        return false;
    }

}



//Functions Ahead ...................................................................................
