import './rough.css'
import {fade, finishInterval, pleaseWait } from './../Animation/animation';
import { useData } from "./../PracLib/alib";
import { useEffect, useRef, useState } from 'react';


function Rough({ children }) {

    let arr = ['/Stuff/about1.png', '/Stuff/about2.png', '/Stuff/about3.png'];
    let [lstate, setlstate] = useState(null);
    const handleArr = useRef(new useData(arr));
    const animationId = useRef(null);
    const boolCheck_lstate = useRef(true);
    const aref = useRef(null);
    const arefImg = useRef(null);

    async function setState(par) {
        setlstate(par);
    }
    async function getState(par) {
        console.log(lstate);
        return lstate;
    }

    useEffect(() => {

        let animationCycleCount = 0;

        let inter;
        try {

            handleArr.current.loop(true);
            startAnimation();
  
        } catch (error) {
            console.log(error);


        } finally {
            return (() => {
                clearInterval(inter);
                cancelAnimationFrame(animationId.current);
            })
        }


        //Effect Functions...................................................................
        function startAnimation() {
            const animate = async () => {
                if (boolCheck_lstate.current) {

                    boolCheck_lstate.current = false;

                    await pleaseWait(1500);
                    if (arefImg.current) {
                        console.log("fadding out");
                        await fade(arefImg.current, 10, 0.5, 0, 30, 'right', 'plus', -1);
                    }
                    let val = handleArr.current.getVal();
                    setState(val);
        
                }

                console.log(`running the animation block by Cycle count = ${animationCycleCount}`);
                animationCycleCount++;
                animationId.current = requestAnimationFrame(animate);
            }
            animationId.current = requestAnimationFrame(animate);
        }

        //Effect Functions...................................................................

    }, [])

    useEffect(() => {
      
        async function aWrapp() {
            let data ;
            if (lstate) {
         
              data = await fade(arefImg.current, 10, 0.5, -60, 0, 'right', 'plus', 1);
              boolCheck_lstate.current = true
             
            }
        }
        aWrapp();

    }, [lstate])

    return (

        <>
            <h1>Rough practise below  : </h1><hr></hr>
            <div className="rough-pack">
                <div className="rough-img-pack">
                    <img ref={arefImg} className='aimg' src={lstate} alt='a img' />
                    <h1>{lstate}</h1>
                </div>
            </div><hr></hr>
            <div className="">
                <div ref={aref} className="div-animated">
                    I am animated
                </div>
            </div>

            <button onClick={() => {
                cancelAnimationFrame(animationId.current);
            }}>Stop animation cycle</button><hr></hr>
        </>
    );
}

export { Rough };




























//......................................................................
