
import './App.css';
import { Header } from './Components/Header/header';
import { Footer } from './Components/Footer/footer';
import { Main } from './Components/MainWithoutLogIn/main';
import { Main2 } from './Components/MainWithLogin/main2';
import { Write } from './Components/Write/write';
import { useEffect, useRef, useState } from 'react';
import { About } from './Components/About/about';
import { useNavigate, Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { PostBox } from './Components/PostBox/postBox';
import { pleaseWait, finishInterval, ButtonAnimation } from './Components/Animation/animation';


function App({ param, children }) {
  const [loginButt, setloginButt] = useState(null);
  const [writeButt, setwriteButt] = useState(null);
  const [main, setMain] = useState(null);
  const [hloginname, sethloginname] = useState(null);
  const [boolFooter, setboolFooter] = useState(true);
  const navigate = useNavigate();
  const loginButtAnim = useRef(null);
  const writeButtAnim = useRef(null);

  function checkLogin(mode = 'default') {
    ///console.log("Recently loaded");

<<<<<<< HEAD
    fetch('http://localhost:3500/xt/api/checkLogin',
=======
    fetch('/xt/api/checkLogin',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      }
    ).then((res) => {

      if (res.ok) {
        ///console.log("succesfull connection");
      }
      else {
       ///console.log("Not connected");
      }
      res.json().then((js) => {
        ///console.log(js);

        if (js.output) {   //User Logged in ---------------------
          sethloginname(js.data);   

          if (mode == 'write') {
            setMain(<Write/>);

            setloginButt(<div ref={loginButtAnim} onClick={async () => {
              await ButtonAnimation(loginButtAnim);
<<<<<<< HEAD
              fetch('http://localhost:3500/xt/api/logout',
=======
              fetch('/xt/api/logout',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
                {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  credentials: 'include'
                }
              ).then((res) => {
                if (res.ok) {
                  ///console.log('Connection succesfull');
                  res.json().then((js) => {
                    if (js.output) {
                      ///alert(js.mess);
                      navigate('/');
                      
                    }
                    else {
                      ///alert(js.mess)
                    }
                  })

                } else {
                  ///console.log('Error connection');
                }

              })

            }} className='nav-button'>Log Out</div>
            );
            setwriteButt(
              <div ref={writeButtAnim} onClick={async () => {
                await ButtonAnimation(writeButtAnim);
                navigate('/');
              }} className='nav-button'>Home</div>
            )
          }
          if (mode == 'postbox') {
          
            setMain(<PostBox></PostBox>);

            setloginButt(<div ref={loginButtAnim} onClick={async () => {
              await ButtonAnimation(loginButtAnim);
<<<<<<< HEAD
              fetch('http://localhost:3500/xt/api/logout',
=======
              fetch('/xt/api/logout',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
                {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  credentials: 'include'
                }
              ).then((res) => {
                if (res.ok) {
                  ///console.log('Connection succesfull');
                  res.json().then((js) => {
                    if (js.output) {
                     /// alert(js.mess);
                      navigate('/');
                     
                    }
                    else {
                     /// alert(js.mess)
                    }
                  })

                } else {
                  ///console.log('Error connection');
                }

              })

            }} className='nav-button'>Log Out</div>
            );
            setwriteButt(
              <div ref={writeButtAnim} onClick={async () => {
                await ButtonAnimation(writeButtAnim);
                navigate('/');
              }} className='nav-button'>Home</div>
            )
          }
          if (mode == 'about') {
            setMain(<About/>);

            setloginButt(<div ref={loginButtAnim} onClick={async () => {
              await ButtonAnimation(loginButtAnim);
<<<<<<< HEAD
              fetch('http://localhost:3500/xt/api/logout',
=======
              fetch('/xt/api/logout',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
                {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  credentials: 'include'
                }
              ).then((res) => {
                if (res.ok) {
                  ///console.log('Connection succesfull');
                  res.json().then((js) => {
                    if (js.output) {
                      ///alert(js.mess);
                      navigate('/');
                      
                    }
                    else {
                      ///alert(js.mess)
                    }
                  })

                } else {
                  ///console.log('Error connection');
                }

              })

            }} className='nav-button'>Log Out</div>
            );
            setwriteButt(
              <div ref={writeButtAnim} onClick={async () => {
                await ButtonAnimation(writeButtAnim);
                navigate('/');
              }} className='nav-button'>Home</div>
            )
          }

          else if (mode == 'default') {

            setMain(<Main2></Main2>);
            /// alert("A user Loged In");

            setloginButt(<div ref={loginButtAnim} onClick={async () => {
              await ButtonAnimation(loginButtAnim);

<<<<<<< HEAD
              fetch('http://localhost:3500/xt/api/logout',
=======
              fetch('/xt/api/logout',
>>>>>>> 4a7349f987241d86d79d38f3226f1845c0ca0068
                {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  credentials: 'include'
                }
              ).then((res) => {
                if (res.ok) {
                  ///console.log('Connection succesfull');
                  res.json().then((js) => {
                    if (js.output) {
                     /// alert(js.mess);
                      navigate('/');
                      checkLogin(mode);
                      
                    }
                    else {
                      ///alert(js.mess)
                    }
                  })

                } else {
                  ///console.log('Error connection');
                }

              })

            }} className='nav-button'>Log Out</div>
            )

            setwriteButt(
              <div ref={writeButtAnim} onClick={async () => {
                await ButtonAnimation(writeButtAnim);
                navigate('write');
              }} className='nav-button'>Write</div>
            )
          }
        } else {     //User not Logged in -------------
          sethloginname(null);
          if(mode == 'write'){
            navigate('/');
          }
          else if(mode == 'postbox'){
            navigate('/');
          }
          else if(mode == 'about'){
            setMain(<About/>);

           
            setloginButt(
              <div ref={loginButtAnim} onClick={async() => {
                await ButtonAnimation(loginButtAnim);
                navigate('/Login');
              }} className='nav-button'>Login</div>
            )

            setwriteButt(
              <div ref={writeButtAnim} onClick={async () => {
                await ButtonAnimation(writeButtAnim);
                navigate('/');
              }} className='nav-button'>Home</div>
            )
          }
          else if(mode == 'default'){

           /// alert("Not Loged in");
            setMain(<Main></Main>);
            
            
            setloginButt(
              <div ref={loginButtAnim} onClick={async() => {
                await ButtonAnimation(loginButtAnim);
                navigate('Login');
              }} className='nav-button'>Login</div>
            )
            
            setwriteButt(
              <div ref={writeButtAnim} onClick={async () => {
                await ButtonAnimation(writeButtAnim);
                navigate('Login');
            }} className='nav-button'>Write</div>
          )
          
        }
          return 0;
        }
      })
    })

  }

  useEffect(() => {

    if (param.mode == 'write') {
      checkLogin(param.mode);

    } else if (param.mode == 'default') {
      checkLogin();
    }
    else if (param.mode == 'postbox') {
      checkLogin(param.mode);
    }
    else if (param.mode == 'about') {

      setboolFooter(false);
      checkLogin(param.mode);

    }
  }, [])


  return (
    <>

      <Header param={{
        abutt: loginButt,
        wbutt: writeButt,
      }} userName={hloginname}></Header>
      <main>
        {main}
      </main>
      <hr></hr>
      {boolFooter ? <Footer></Footer> : ''}
    </>
  );
}

export default App;
