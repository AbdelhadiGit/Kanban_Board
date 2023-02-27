import React,{ Component } from 'react'


class Menu1 extends Component{
    render(){
        return(
            <div className="navbar">
                <div className="dropdown">
                    <p id='logo'>LOGO</p>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">menu1
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
                    <button className="dropbtn">menu2
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
                    <button className="dropbtn">menu3
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
                    <button className="dropbtn">menu4
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
                    <button className='connect'>Sign Up</button>
                </div>
            </div>
        )
    }
}
export default Menu1