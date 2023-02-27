import React, { Component } from 'react'
import devImg from './devBack.jpeg'
import './dev.css'
import  avatar from './avatar.jpg'


class Dev extends Component{


    componentDidMount(){
        document.body.style.backgroundImage = `url(${devImg})`
    }

    render(){
        return(<>
        <div>
        <div className='infinityab'>
            <h2 className ='newlogoab'>Abdelhadi∞</h2>
           <div className='collection'>
            <span class="dot" id='col1'></span>
            <span class="dot" id='col2'></span>
            <span class="dot" id='col3'></span>
            <span class="dot" id='col4'></span> 
            </div>  
        </div><br></br>

        </div>
       
       <div className='portfolio'>
       <div>
            <h1 className='Intro'>Hello ! I'm <span>Abdelhadi</span> BAKHTY</h1><br></br>
          


           
        </div>

        <div className='skills'>
           <div>
           <h6 className='bio'> I'm a software engineer student at national Institut of postes and Telecommunication . </h6>
           <h6  className='bio'>I have many skills in my hand like frond end developpment with React Js, and </h6><h6 className='bio'> coding in the back side with Node Js espicially with Express Framework.</h6>
           
         

           <div> 
            
            <button className='contact'><a  className="email" href = "mailto: bakhtiazerreza2000@gmail.com">Send Email</a></button>

           </div>
           

           </div>
        <img className='avatar' src={avatar} alt="Avatar"/>
       
        </div>

       
       
       </div>


       <div>
       <footer className='copy'>&copy; Copyright 2022 all rights reserved</footer>

       </div>

        
        
        
        </>)
    }
}


export default Dev