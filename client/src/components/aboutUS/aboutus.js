import React,{Component} from "react";
import './aboutus.css'


class AboutUs extends Component{
    componentDidMount(){
        document.body.style.background = "#F4F5FF";
       }


    render(){
        return(<>
         <div className='infinity'>
            <h2 className ='newlogo'>Infinity∞</h2>
            <button className="iner">Sign In</button>
            <button className="uper">Sign Up</button>
        </div><br/>
        <div className="blueContainer"><h2 className="about">About Infinity∞</h2>
        <p className="quote">What's behind the board</p>
        
        </div>
        <div className="Us">
            <h3 className="elemh3">The way your team works is unique — so is Infinity∞.</h3>
            <h4 className="elemh41">Infinity∞ is the flexible work management tool where teams can track tasks,</h4><h4 className="elemh41"> collaborate on projects, organize work, and track progress in a visual,</h4><h4 className="elemh41"> productive, and rewarding way. From brainstorm to planning to execution,</h4><h4 className="elemh41"> Infinity∞ manages the big milestones and the day-to-day tasks of working</h4><h4 className="elemh42">together and getting things done.</h4>
        </div>
        
        
        </>)
    }
}

export default AboutUs