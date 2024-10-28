import { useRef, useState, useEffect } from 'react';
import './comment.css';
import { ButtonAnimation } from '../Animation/animation';




function CommentData({ children, postname, comments, resetComments }) {
    const [lstate, setlstate] = useState(null);
    //..................................................................
    useEffect(() => {

        let arr = [];
        comments.forEach(element => {
            arr.push(<CommentCard eachComment={element}/>)
        });
        setlstate(arr);
    }, [comments])
    //..................................................................

    return (
        <>
        <div className="commentdata-contain">
           { lstate ? lstate : <h1></h1>}
            </div>
        </>
    );
}



function CommentCard({ children, eachComment }) {
  
        ///console.log('below data from cards');
        return (
            <>
                <div className="card-contain ">
                    <div className="card-user">
                        <div className="user-pack">
                            <div className="card-user-img">
                            </div>
                            <div className="card-user-email">
                                {eachComment.from}
                            </div>
                        </div>
                    </div>
    
                    <textarea readOnly
                        value={eachComment.data}
                        className='card-data '></textarea>
                    <div className='card-date'>{eachComment.date}</div>
                </div>
            </>
        );
   
    
    /* 
    
    return (
        <>
        <h1>{eachComment.to}</h1>
        </>
    );
    */
}


function Comment({ children, postName }) {
    const [commdata, setcommdata] = useState(null);
    const [fetchedData, setfetchedData] = useState(null);
    const [committext, setcommittext] = useState('Comment it!');
    const aref = useRef(null);
    const bref = useRef(null);
    const cref = useRef(null);



    function handleCommit() {

        if (commdata) {
            bref.current.style.backgroundColor = 'gray';
            setcommittext('commiting the comment -');
            setComment(postName, commdata).then((res => {
                if (res) {
                    if (res.output) {
                        ///alert("successfully commited comment");
                        setTimeout(()=>{
                            setcommittext((i)=>'succesfull ');
                            bref.current.style.backgroundColor = 'Green';
                            setTimeout(()=>{
                                alert("succesfully commented");
                                bref.current.style.backgroundColor = 'palevioletred';
                                setcommittext((b)=>'Commit it!');
                                setcommdata('');

                            }, 800)
                        }, 800)
                        resetfetchData();

                    }
                    else {
                        alert("A Error when commiting the comment, see the log for detail");
                        console.error(res.mess);
                    }
                } else {
                    console.error("Error : Connection Failed");
                }
            }));
        } else {
            alert('please write comment, then try to commit it');
        }
    }

    function resetfetchData() {
       
        fetchComments(postName).then((res) => {
            setfetchedData(res.data);
        }).catch((e) => {
            console.error(e);
        })
    }


    useEffect(() => {

        fetchComments(postName).then((res) => {
            setfetchedData(res.data);
        }).catch((e) => {
            console.error(e);
        })
    }, [])



    return (
        <>
         <div className="commentwrite-heading commentdata-heading">
         What You Think ......
         </div>
            <div className="comment-contain">
                <div className="comment-create">
                    <textarea ref={aref} value={commdata} onChange={(e) => {
                        setcommdata(e.target.value);
                    }}
                        className='comment-textarea'
                        placeholder='Write your Comment...'
                        maxLength={600}
                        >
                            
                    </textarea>
                    <button ref={bref} onClick={async () => {
                       await ButtonAnimation(bref);
                       handleCommit();
                    }}
                        className='comment-comit nav-button'>{committext}</button>
                </div>
                <div className="comment-i1">
                </div><hr></hr>
                <div className="commentdata-pack">
                    <div className='commentdata-heading'>Comments Below : </div>
                    {fetchedData ? <CommentData reFetch={cref}
                        postname={postName} comments={fetchedData}
                        resetComments={() => {
                            resetfetchData();
                        }}
                    /> : <h1>'No Comments Here'</h1>}
                </div>
            </div>
        </>
    );
}

export { Comment };




































//Function Ahead ........................................................
async function setComment(par, comm) {
    let data = {
        name: par,
        comment: comm
    }

    let res = await fetch("http://localhost:3500/xt/api/createcomment",
        {
            method: "POST", headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data), credentials: 'include'
        }
    );

    if (res.ok) {
       /// console.log('connection succesfull');

        let js = await res.json();
        return js
    }
    else {
       /// console.log('connection failed');
        return false;
    }
}
async function deleteComment(params) {

}

async function fetchComments(par) {

    let data = {
        name: par
    }

    let res = await fetch("http://localhost:3500/xt/api/fetch/comments",
        {
            method: "POST", headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data), credentials: 'include'
        }
    );

    if (res.ok) {


        let js = await res.json();
        if (js.output) {
            return js
        }
        else {
            throw new Error(js.mess);
        }
    }
    else {

        throw new Error('Error - Connection Failed');
    }
}
//................. ........................................................