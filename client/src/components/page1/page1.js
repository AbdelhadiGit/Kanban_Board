import  { Component } from 'react'
import BoardList from '../board/board'
import Menu2 from '../Menu/menu2'




class Page1 extends Component{
    render(){
        return(
            <>
            
            <Menu2/>
            <br></br>
            <BoardList/>
            
            </>
        )
    }
}

export default Page1