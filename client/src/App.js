import React from 'react'
import {Route, Routes } from 'react-router-dom';
import LogIn from './components/Login/login';
import SignUp from './components/SingUp/signup';
import ReSet from './components/Reset/reset';

import BoardList from './components/board/board';
import Page1 from './components/page1/page1';
import Landing from './components/Landing/landing';
import AboutUs from './components/aboutUS/aboutus';
import Dev from './components/Developper/dev';







function App(){

  var StoredToken ='tokenTest'
    if( localStorage.getItem('token')){
        StoredToken =  localStorage.getItem('token')
    }
  
  var room = '/board/' + StoredToken.substring(1, 90)
  return(

   <>

    <Routes>
    <Route  exact path='/' element={<LogIn/>}/>
    <Route exact path = '/home' element={<Page1/>}/>
    <Route  exact path = '/register' element={<SignUp/>}/>
    <Route exact path='/reset' element={<ReSet />} />
    <Route exact path ={room} element={<BoardList/>}/>
    <Route exact path ='/Landing' element={<Landing/>}/>
    <Route exact path = '/AboutUs' element={<AboutUs/>}/>
    <Route exact path = '/Developper' element={<Dev/>}/>
    
   
    </Routes>

  

   </>
    

  );
}
export default App
