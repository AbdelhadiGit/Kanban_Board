import React, { Component } from 'react'
import './menu.css'
import {useNavigate} from 'react-router-dom'



function Menu2()  {

    

        const navigate = useNavigate()
    const StoredToken = localStorage.getItem('token')
    const room = '/board/' + StoredToken.substring(1, 90)



      
        return (
            <>
            <div className="navbar">
                <div className="dropdown">
                    <p id='logo'>Infinity∞</p>
                </div>

                <div className="dropdown">
                    <button onClick={()=>{navigate('/AboutUs')}} className="dropbtn">About Us
                        <i className="fa fa-caret-down"></i>
                    </button>
                   
                </div>

                <div className="dropdown">
                    <button className="dropbtn">Productes
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={() => { navigate(room) }} href="">Board-Room</a>
                        <a href="/Landing">Landing</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button  className="dropbtn">Services
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">Tricks
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Welcome back to Infinity∞. Please follow the forward steps to costumisze your website!</a>
                        <a href="#">1.The colors are generated on an anynomous way, please drag any item, to make a harmonic colorisation</a>
                        <a href="#">2.you can switch colors by clicking on the colone's name</a>
                        <a href="#">3.Save changes by moving or draging an item</a>
                        <a href="#">******Enjoy it***</a>
                        <a href="#">:) :) :) :) :) :)</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button onClick={()=>{navigate('/Developper')}} className="dropbtn">Developper
                        <i className="fa fa-caret-down"></i>
                    </button>
                   
                </div>

                <div className="dropdown">
                    <button className="dropbtn">Help
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Join Us
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">page 1</a>
                        <a href="#">page 2</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                        <a href="#">page 3</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button  onClick={()=>{navigate('/')}} className='connect'>Disconnect</button>
                </div>
             
            </div>
           
           
           
            </>
        )
    
}
export default Menu2
