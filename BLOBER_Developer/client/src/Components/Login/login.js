
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAnimation } from "../Animation/animation";
import './login.css'

function Login() {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const submitButt = useRef(null);
    const navigate = useNavigate();


    function handleemail(e) {
        setemail(e.target.value);

    }
    function handlepass(e) {
        setpass(e.target.value);
    }

    function handleSubmit() {

      ///  console.log("form handleSubmit()");

        if (!email.includes("@gmail.com")) {
            alert("please enter valid email id");
            return 0;
        }
        if (pass.length < 1) {
            alert("please enter password");
            return 0;
        }

        let data = {
            email: email,
            pass: pass
        }

        fetch('http://localhost:3500/xt/api/login',
            {
                method: 'POST', body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
                credentials: 'include'
            }
        ).then((res) => {

            if (res.ok) {
               /// console.log("succesfull connection");
            }
            else {
               /// console.log("Not connected");
            }
            res.json().then((js) => {
                ///console.log(js);

                if (js.output) {
                    alert("Succesfully Loged In");
                    navigate("/");
                } else {
                    alert("Wrong password ");
                    return 0;
                }
            })
        })

        //

    }

    function checkLogin() {
      ///  console.log("Recently loaded");

        fetch('http://localhost:3500/xt/api/checkLogin',
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'include'
            }
        ).then((res) => {

            if (res.ok) {
               /// console.log("succesfull connection");
            }
            else {
               /// console.log("Not connected");
            }
            res.json().then((js) => {
               /// console.log(js);

                if (js.output) {   //User Logged in ---------------------

                    navigate('/');
                    return true;
                } else {     //User not Logged in -------------

                    return false;


                }
            })
        })

    }
    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <>

            <main>
                <section className="sec-login">
                    <div className="login-pack">
                        <div className="login-heading">Login : </div>
                        <div className='login-sub-heading'>Let's roll to BLOBER</div>
                        <form className="login-form">

                            <div className="login-email">Email ID : </div>
                            <input onChange={(e) => {
                                handleemail(e);
                            }} placeholder="example@gmail.com" ></input>
                            <div className="login-email-space lspace">
                            </div>

                            <div className="login-pass">
                                Password :
                            </div>
                            <input onChange={(e) => {
                                handlepass(e);
                            }}></input>
                            <div className="login-pass-space lspace">
                            </div>

                            <button ref={submitButt} onClick={async (e) => {
                                e.preventDefault();
                                await ButtonAnimation(submitButt);
                               /// console.log('Attemp to submit');
                                handleSubmit();
                            }} className="login-submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </main>

        </>
    );

}


export { Login };