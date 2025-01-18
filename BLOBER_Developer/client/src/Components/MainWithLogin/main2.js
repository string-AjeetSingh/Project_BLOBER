import { data } from '@remix-run/router';
import './main2.css';
import './other.css';
import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonAnimation } from '../Animation/animation';
let MyContext = createContext('defalut value');
let MyContext2 = createContext('defalut value');


function Trending({ param, children }) {
    const aref = useRef(null);
    //....................................
    function handleClick() {
        param.setswi(1);
    }

    useEffect(() => {
        /// console.log(param.swi);
        if (param.swi == 1) {
            let result;
            /// console.log("Trending");
            aref.current.style.backgroundColor = 'wheat';

            fetchTrending().then((result) => {

                param.setdata(result);
            });


        }
        else {
            aref.current.style.backgroundColor = 'white';
        }

    }, [param.swi])
    //........................................

    return (
        <>
            <button ref={aref} onClick={async () => {
                await ButtonAnimation(aref);
                handleClick();
            }} className="trending">
                Trending
            </button>
        </>
    );
}

function Recently({ param, children }) {
    const aref = useRef(null);

    //........................................
    function handleClick() {
        param.setswi(2);
    }
    useEffect(() => {
        ///console.log(param.swi);
        if (param.swi == 2) {



            /// console.log("Recent");
            aref.current.style.backgroundColor = 'wheat';

            fetchRecent().then((result) => {

                param.setdata(result);
            });

        }
        else {
            aref.current.style.backgroundColor = 'white';
        }

    }, [param.swi])

    //........................................

    return (
        <>
            <button ref={aref} onClick={async () => {
                await ButtonAnimation(aref);
                handleClick();
            }} className="recently">
                Recently
            </button>

        </>
    );
}

function Cards({ param, children }) {
    const navigate = useNavigate();
    const aref = useRef(null);
    /// console.log('below data from cards');
    /// console.log(param.data);
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
                        from: param.data.from,
                        setup: param.setup
                    }}></Like>
                </div>
                <div className="card-title">
                    <u> {param.data.title}</u>
                </div>
                <textarea readOnly
                    value={param.data.data}
                    className='card-data'></textarea>
                <div className='card-date'>{param.data.date}</div>
                <button ref={aref} onClick={async () => {
                    await ButtonAnimation(aref);
                    navigate(`postbox/${encodeURIComponent(param.data.name)}`);
                }} className='readmore'>Read More</button>
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

        let res = await fetch('/xt/api/fetch/like',
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

        let res = await fetch('/xt/api/like',
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data), credentials: 'include'
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
            from: param.from
        }

        let res = await fetch('/xt/api/fetch/liked',
            {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data), credentials: 'include'
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

        checkLiked().then((res) => {

            if (res.output1 || res.output2) {
                aref.current.style.backgroundColor = 'gray';
                bref.current = false;
            }
            else {

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
            <div ref={aref} onClick={async () => {
                await ButtonAnimation(aref);
                if (bref.current) {
                    handleLikeButt();
                }
            }} className='like-pack'>

                <div className='like'>Like : </div>
                <div className='like-count'>{lstate}</div>
            </div>
        </>
    );
}

function NavCardButt({ param, children }) {

    const { swi2, setswi2 } = useContext(MyContext2);

    const aref = useRef();


    useEffect(() => {

        if (swi2) {
            /// console.log(' from naveCardButt swi');


            if (swi2 == param.swiequalent) {



                aref.current.style.border = '2px solid black';
            } else {
                aref.current.style.border = '1px solid purple';

            }
        }

    }, [swi2])



    function handleClick() {
        setswi2(param.swiequalent);
        let arr = [];
        param.data.forEach(element => {
            arr.push(<Cards param={{
                data: element,

            }} />)
        });
        param.setenddata(arr);

    }

    return (
        <>
            <button ref={aref} onClick={() => {
                handleClick();
            }} className='nav-card-button'>
                {children}
            </button>
        </>
    );
}


function NavCard({ param, children }) {

    let [lstate, setlstate] = useState(null);
    /// console.log('from NavCard : ');
    ///console.log(param.data);

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
        reset() {
            this.pos = 0;
        }
    }

    let fetchData = new useData();



    //........................................

    //............................................ 
    function buttonClick() {
        let arr = [];
        for (let i = 0; i < param.data.data.length && i < 10; i++) {
            arr.push(<Cards param={{
                data: param.data.data[i],
            }} />);
        };
        ///console.log('no of cards = ' + arr.length);
        param.setenddata(arr);
    }
    function setDefaultEndData(arrdata) {
        /// console.log("Form setDefaultEndData");
        let arr = [];
        arrdata.forEach(element => {

            ///console.log(element);
            arr.push(<Cards param={{
                data: element,
                setdata: param.setdata


            }} />)
        });
        param.setenddata(arr);
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
            /// console.log('from param.cou effect');
            /// console.log(`finalcount = ${finalcount}`)
            fetchData.reset(); //reset the fetchData pos, so array can be fetched

            for (let i = 0; i < finalcount; i++) {
                for (let j = 0; j < 10; j++) {
                    let out = fetchData.getVal();
                    if (out != false) {
                        arr2.push(out);
                    } else {

                        break;
                    }
                }
                /// console.log(arr2);

                arr.push(<NavCardButt param={{
                    setenddata: param.setenddata,
                    data: arr2,
                    swiequalent: i + 1,
                    setdata: param.setdata,
                }}>
                    {i + 1}
                </NavCardButt>)
                if (i == 0) {
                    arr3 = arr2;
                }
                arr2 = [];
            }
            setDefaultEndData(arr3);
            setlstate(arr);
        }
    }, [param.data])
    //............................................ 

    return (
        <>
            {lstate}
        </>
    );

}



function Main2({ param, children }) {
    const [data, setdata] = useState(null);
    const [enddata, setenddata] = useState(null);
    const [swi, setswi] = useState(2);
    const [up, setup] = useState(0);
    const [cou, setcou] = useState(null);         //how many buttons for post navigation
    const [swi2, setswi2] = useState(1);

    //...........................................................
    useEffect(() => {


        if (data) {

            let p = data.data.length / 10;
            let g = parseInt(p);
            if (p == g) {

                setcou(g);
            } else {

                setcou(g + 1);
            }

            setup((i) => i + 1);
        }


    }, [data]);



    //...........................................................


    return (
        <><MyContext.Provider value={{ up, setup }}>


            <section className="main2-pack">
                <div className="main2-contain">
                    <div className="main2-i1">
                        <div className='main2-i1-heading'>Posts :
                        </div><Trending param={{
                            data: data, setdata: setdata,
                            swi: swi, setswi: setswi
                        }} /> <Recently param={{
                            data: data, setdata: setdata,
                            swi: swi, setswi: setswi
                        }} />
                    </div>
                    <div className="main2-i2">
                        {enddata}
                    </div>
                    <div className="main2-i3">

                        <MyContext2.Provider value={{ swi2, setswi2 }}>

                            {data ? <NavCard param={{
                                cou: cou,
                                setenddata: setenddata,
                                data: data,
                                setdata: setdata

                            }} /> : 'No Data From Server'}
                        </MyContext2.Provider>
                    </div>
                </div>

            </section>
        </MyContext.Provider>
        </>
    );
}

export { Main2 };
















//Functions Ahead....................................................
async function fetchTrending(par) {

    let res = await fetch("/xt/api/fetch/trending",
        { method: "POST", headers: { 'content-type': 'application/json' } }

    );
    if (res.ok) {
        ///console.log('connection succesfull');
        let js = await res.json();
        return js;
    }
    else {
        ///console.log('connection failed');
        return false;
    }


}

async function fetchRecent(par) {

    let res = await fetch("/xt/api/fetch/recent",
        { method: "POST", headers: { 'content-type': 'application/json' } }
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