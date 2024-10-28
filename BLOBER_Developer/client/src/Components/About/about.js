import { useEffect, useState } from 'react';
import "./about.css"

function About({children}){
    return (
    <>
    <div className="about-pack">
        <div className="about-heading">
            About the <div style={{display : 'inline-block'}} className="about-heading">
            <u>Project :</u>
            </div>
            
            </div>
            <div className="about-data">
                <p>Welcome to <b style={{fontFamily : 'serif'}}>BLOBER</b>, a dynamic <b>blogging</b> platform designed for people who love to share their thoughts, insights, and stories. 
                    Here, we believe in the power of words to connect, inspire, and build a community.
                    </p>
                    <p className='about2img-pack'><img className='about2img' src='/Stuff/about2.png'></img></p>
                    <p>
                    Our platform allows users to <b className='blods'>create text-based posts</b>, 
                    engage through < b className='blods'>comments</b> , and show < b className='blods'>appreciation with likes</b>, fostering an interactive space for expression and discovery. 
                    
                    </p>  
                    <p className='about2img-pack'><img className='about2img' src='/Stuff/about3.png'></img></p>
                    <p>
                    Whether you’re looking to share daily reflections, connect with others, or discover fresh perspectives, <b style={{fontFamily : 'serif'}}>BLOBER</b> is here to make sharing your voice easy and meaningful. 
                    
                    </p>
                    <p className='about1img-pack'><img className='about1img' src='/Stuff/about1.png'></img></p>
                    
                    <p>Join us, and <b className='blods'>start writing your story</b> today!</p>
        </div>
    </div>
     </>
    );
}

export {About};