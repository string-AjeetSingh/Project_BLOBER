import './footer.css'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {   ButtonAnimation  } from '../Animation/animation';

function Footer({param, children}){
    const navigate = useNavigate();
    const aboutButt = useRef(null);
    const tearmButt = useRef(null);
    const privacyButt = useRef(null);
    const helpButt = useRef(null);

    return (
    <>
    <div className="footer">

       <div className="foot-pack">
        
        <div className="foot-button-pack">
            <button ref={aboutButt} onClick={async ()=>{
                await ButtonAnimation(aboutButt);
                navigate('/aboutt');
            }}>About</button>
            <button ref={tearmButt} onClick={ async ()=>{
                  await ButtonAnimation(tearmButt);
                alert(`As BLOBER is not commercial web appication.
                    We do not have TERMS, This is a Open Project, can be found on GitHub`);
            }}>Terms</button>
            <button ref={privacyButt} onClick={async ()=>{
                await ButtonAnimation(privacyButt);
                alert(`As BLOBER is not commercial web appication.
                    We do not have PRIVACY policy, This is a Open Project, can be found on GitHub`);
            }}>Privacy</button>
            <button ref={helpButt} onClick={async ()=>{
                  await ButtonAnimation(helpButt);
                 alert(`We do not have HELP section, Every Detail regarding the project, can be found on GitHub.
                    and ReadMe file inside the BLOBER project Folder`);
            }}>Help</button>
        </div>
        <div className='foot-img-div'><img src='/Stuff/footerimg.png'></img></div>
       </div>
    </div>
     </>
    );
}

export {Footer};