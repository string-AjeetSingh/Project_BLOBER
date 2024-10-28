import './header.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fade, pleaseWait, startAnimationType } from '../Animation/animation';


function Header({ param, children, userName }) {
    const navigate = useNavigate();
    const href = useRef(null);
    const animationId1 = useRef(null);
    const animationId2 = useRef(null);
    const closeAnimationRender1 = useRef(false);
    const closeAnimationRender2 = useRef(false);



    useEffect(() => {
        closeAnimationRender1.current = false;
        closeAnimationRender2.current = false;
        try {

            if (href.current.style) {
               
                startAnimation();
            }
           
        } catch (error) {
            console.error(error);
        }

        //Effect functions............................................
        function startAnimation() {
            let animationCycleCount = 0;
            const animate = async () => {
                
                try {
            
                    //console.log(closeAnimationRender1.current);
                    if (closeAnimationRender1.current) {
                       // console.log('Attempt to close the render loop from unmount');
                        return;
                    }
                    
                    await pleaseWait(4000);
                    
                    
                    //fade out --
                    await fade(href.current, 5, 0.5, 0, 30, 'bottom',
                    'plus', 0, closeAnimationRender1.current);
                    
                    await pleaseWait(1000);
                    //fade in--
                    await fade(href.current, 10, 0.5, -20, 0, 'bottom', 'plus', 1
                    , closeAnimationRender1.current
                );
                
               
                //console.log(`Animation loop running with cycle count = ${animationCycleCount}`);
               // console.log(`Animation loop running with cycle count`);
                animationCycleCount++;
                animationId1.current = requestAnimationFrame(animate);
                
            } catch (error) {
                
            console.error(error);
        }
            }
            animationId1.current = requestAnimationFrame(animate);
        }

      

        //Effect functions............................................

        return () => {
           
            closeAnimationRender1.current = true;
            closeAnimationRender2.current = true;
             
            cancelAnimationFrame(animationId1.current);
        }
    }, [])
    return (
        <>
          
            <div className="header">
                <nav className='nav-pack'>
                    <div className='nav-heading'>
                        <div ref={href} className='nav-heading-val'>BLOBER</div></div>
                    <div className="nav-values">
                        <div className='nav-button-pack'>

                            {param.wbutt}
                            {param.abutt}

                        </div>
                        <div className='nav-userName'>{userName}</div>
                    </div>
                </nav>
            </div><hr></hr>
        </>
    );
}

export { Header };