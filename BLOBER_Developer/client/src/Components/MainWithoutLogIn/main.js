import './main.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fade, pleaseWait, finishInterval, ButtonAnimation, startAnimationType } from '../Animation/animation';
import { useData } from '../PracLib/alib'; import userEvent from '@testing-library/user-event';
;




function Sec2({ param, children }) {
    return (
        <>
            <section className='sec2-pack'>

                <div className='write-imgpack'>
                    <img className='write-img' src='Stuff/write.png'></img>
                    <div className="sec2-heading-pack">
                        <p className='sec2-heading1'><u>Write a Story That</u></p><p className='sec2-heading2'> MATTERS</p>
                    </div>

                </div>
            </section><hr></hr>
        </>
    );
}



function Main({ param, children }) {

    const navigate = useNavigate();
    const animationId4 = useRef(null);
    const closeAnimationBool4 = useRef([false, false]);
    const gsbutt = useRef(null);
    const refImg = useRef(null);
    const refTitle = useRef(null);
    const refBoolst = useRef(true);
    const dumref = useRef(null);

    let newref = useRef([{ title: 'The world is eager to know.', src: 'Stuff/solor.png' },
    { title: 'Knock Knock !! Hello Hello', src: 'Stuff/solor2.png' }
    ])
    const [st, setst] = useState({ title: 'The world is eager to know.', src: 'Stuff/solor.png', on: false });


    const [count, setCount] = useState(0);

    useEffect(() => {

        closeAnimationBool4.current = false;
        let handleArr;
        let interval; let val;
        if (newref.current) {

            handleArr = new useData(newref.current);
            handleArr.setPos(1);
            handleArr.loop(true);


            startAnimationType('Main.js Animation Loop', animationId4, closeAnimationBool4
                , async (close) => {

                    if (refBoolst.current) {

                        if (refTitle.current || refImg.current) {

                            refBoolst.current = false;
                            await pleaseWait(2500);


                            await new Promise((resolve, reject) => {
                                //fade outs --
                                fade(refTitle.current, 10, 0.5, 0, 30, 'right', 'plus',
                                    -1, close.current).then((ret) => {
                                        
                                    })
                                    fade(refImg.current, 10, 0.5, 0, 30, 'right', 'plus',
                                        -1, close.current).then((ret) => {
                                            resolve();
                                        })
                            })

                           
                            val = handleArr.getVal();
                           /// console.log(val);
                            setst((prev) => {
                                return { title: val.title, src: val.src, on: true }
                            });
                        };
                    }


                }
            )

        }



        return () => {

            closeAnimationBool4.current = true;
            cancelAnimationFrame(animationId4.current);

        }

    }, []);

    useEffect(() => {
       
        if (st.on) {
            async function wrapper(params) {
               await new Promise((resolve, reject)=>{
                fade(refTitle.current, 10, 0.5, -30, 0, 'right', 'plus',
                    1).then((ret) => {
                    })
                    fade(refImg.current, 10, 0.5, -30, 0, 'right', 'plus',
                        1).then((ret) => {
                          resolve();
                        })
               }) 
            };
            
            wrapper().then(()=>{
                
                refBoolst.current = true;
            });
            
        }
    }, [st])


    return (
        <>
            <div ref={dumref} className="main-pack">
                <div className="main-heading">
                    Have you listened?
                </div>
                <div  className="main-heading2">
                   <div ref={refTitle} className="main-heading2-val">
                   {st.title}
                   </div> 

                </div>
                <img ref={refImg} className='solor' src={st.src}></img>


                <button ref={gsbutt} onClick={async () => {
                    await ButtonAnimation(gsbutt);
                    navigate('Login')
                }} className='main-button'>Get Started</button>
            </div><hr></hr>
            <Sec2></Sec2>
        </>
    );
}

export { Main };

