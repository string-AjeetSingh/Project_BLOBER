import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from './Components/Login/login';
import { Rough } from './Components/Rough/rough';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';



const router = createBrowserRouter(
  [
    {path : '/', element : <App param={{
      mode : 'default'
    }}/>},
    {children : [
      {path : 'rough', element : <Rough/>},
      {path : 'Login', element : <Login/>},
      {path : 'Write', element : < App key={1} param={{
        mode : 'write'
      }}/>},
      {path:'aboutt', element:<App key={3} param={{mode : 'about'}}/>},
      {path:'postbox/:name', element:<App key={2} 
        param={{
          mode : 'postbox'
      }}/>},
      {path:'postbox', element:<><h1>Please do not navigate this page through, address bar,
      </h1><h4>This is reserved for BLOBER functionality</h4></>}, 
     
    ]}
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
