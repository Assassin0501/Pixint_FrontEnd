import React from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/bg-vid.mp4';
import logo from '../assets/logo-white.png';
import {gapi} from "gapi-script";
import { client } from '../client';

const Login = () => {

  const navigate =useNavigate();
  window.gapi.load('client:auth2',() => {
    window.gapi.client.init({
      clientId: '667377158054-shf38k1qmopvflrkme6kjhbhdhed062o.apps.googleusercontent.com',
      plugin_name: "chat" })}
  )

  const responseGoogle= (response)=>{
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc)
    .then(()=>{
      navigate('/',{replace:true});
    })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen '>
      <div className="relative w-full h-full ">
        <video 
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted 
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay '>
          <div className='p-5'>
            <img src={logo} alt="logo" width='130px' />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId='667377158054-shf38k1qmopvflrkme6kjhbhdhed062o.apps.googleusercontent.com'
              render={(renderProps)=>(
                <button type="button" className='bg-mainColor flex justify-center rounded-lg items-center p-3 cursor-pointer outline-none' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <FcGoogle className='mr-4' />
                    Sign In with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
