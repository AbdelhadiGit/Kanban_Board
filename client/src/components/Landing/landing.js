import React,{Component} from "react";
import Menu1 from "../Menu/menu1";
import './landing.css'
import taskimage from './tasks.png'
import oraganizework from './organizetasks.jpeg'


class Landing extends Component{
    componentDidMount(){
        document.body.style.background = "#F4F5FF";
       }


    render(){
        return (<>
        <div className='infinity'>
            <h2 className ='newlogo'>Infinity∞</h2>
            <button className="in">Sign In</button>
            <button className="up">Sign Up</button>
        </div><br></br>
        
           <div className="welc">
           <h2 className="intro">Infinity∞ lets you work more collaboratively and 
            get more done</h2>
           <p className="desc"> Infinity∞'s board and cards enable you to organize amd prioritise your projects in a fun and flexible way</p>
            
       
           </div>

           <div className="firstdiv"><div><h3>Infinity∞ aide les èquipes a avancer dans leur travail</h3> <h6>Collaborez, gérez des projets et atteignez de nouveaux sommets en matière de productivité.</h6> <h6>Que votre équipe soit sur site ou en télétravail, votre méthode de travail est unique.</h6><h6> Accomplissez toutes vos tâches grâce à Trello.</h6> <button className="getit">Get Started</button></div><img className='task' src={oraganizework}/></div>

        
        
        
        
        
        </>)
    }

}

export default Landing