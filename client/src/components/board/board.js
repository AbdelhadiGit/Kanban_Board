import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import React, { useEffect, useState } from "react"
import './board.css'
import Chat from "../chat"
import Axios from "axios"
import swal from 'sweetalert'
import zoom from './zoom.png'
import back from './island2.jpeg'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3002');



function BoardList() {
    
    var StoredToken ='tokenTest'
    if( localStorage.getItem('token')){
        StoredToken =  localStorage.getItem('token')
    }
    var room = 'http://localhost:3001/board/' + StoredToken.substring(1, 90)
    

    useEffect( () => {
        // Anything in here is fired on component mount.
        //document.body.style.background = "#F4F5FF";
       // socket.emit('connection',()=>{console.log('new connexion')})

       
       socket.on('connect', ()=>console.log(socket.id))
        document.body.style.backgroundImage = `url(${back}) `
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundAttachment = "fixed"
        document.body.style.backgroundSize = "cover"
        
        
     }, []);

    var [mockData, setData] = useState({
        todo: {
            name: "Todo",
            items: [{
                id: 1000,
                text: "Make a UX/UI design"
            }, {
                id: 2000,
                text: "Project Conception"
            },{
                id: Math.floor(Math.random()*3243342534252425),
                text: 'Play games'
            }]
        },
        inprogress: {
            name: "Inprogress",
            items: [{
                id: 100,
                text: "Project Dev"
            }]
        },
        inreview: {
            name: "InReview",
            items: [{
                id: 10000,
                text: "MVC"
            }]
        },
        intest: {
            name: "InTest",
            items: [{
                id: 100002,
                text: "Integrated Test"
            }]
        },
        done: {
            name: "Done",
            items: [{
                id: 10000232,
                text: "BrainStorming"
            }]
        }
    })


    const give=()=>{
            
        if(localStorage.getItem('newItems') ){
            localStorage.setItem('mockdata',JSON.stringify(mockData))
            return JSON.parse(localStorage.getItem('newItems'))
        }  else{
            return mockData
        }
    }

   





    const [cols, setCols] = useState(give())
    const onDragEnd = (result, cols, setCols) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceCol = cols[source.droppableId]
            const destCol = cols[destination.droppableId]
            const sourceItems = [...sourceCol.items]
            const destItems = [...destCol.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems
                }

            })
           
            


        } else {
            const columns = cols[source.droppableId]
            const _items = [...columns.items]
            const [removed] = _items.splice(source.index, 1)
            _items.splice(destination.index, 0, removed)
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...columns,
                    items: _items
                }
            })
            
        }
    }
    const [todos, setTodos] = useState('')
    const [account, setAccount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange1 = (e) => {
        setTodos(e.target.value)
       
           
       
      
    }

    const handleChange2 = (e) => {
        setAccount(e.target.value)
    }



    const ListTodo = (e) => {
        Object.entries(cols).filter((to) => {
            console.log(todos, to[1])

            if (to[1].name == 'Todo') {
                to[1].items.push({ id: todos.length + 1 + (Math.floor(Math.random() * 100)) * (Math.floor(Math.random() * 1000)), text: todos })
                //console.log(to[1])
                
            }
           /* setData({
                ...mockData,
                todo: {
                  items:{
                    id: Math.floor(Math.random()*53463246532654),
                    text: e.target.value

                  }
                }
            });*/
           
            
           
            


        })
        console.log('yessssssss')
        console.log(mockData)
        console.log('Noooooooooo')
        Update()
    }

    const SendInvitation = () => {
        Axios.post(room, {
            account: account
        }).then((response) => {
            console.log(response.data.message)
            if (response.data.message == 'Email Not Valid') {
                swal('Oops!', response.data.message, 'error')

            } else {
                swal('Congrats!', response.data.message, 'success')
            }

        })
    }




   

    const Update = async () => {
       localStorage.setItem('TransferedData', JSON.stringify(cols))
       let Updated = localStorage.getItem('TransferedData')
       let mockDataUpdated = JSON.parse(Updated)
       console.log(mockDataUpdated)
        setCols(mockDataUpdated)
        socket.emit('dragDrop',mockDataUpdated)
        localStorage.setItem('newItems',JSON.stringify(mockDataUpdated))
        var StoredTodo = JSON.parse(localStorage.getItem('TodoColors'))
        if (document.getElementById('Todo') != null ){
            console.log('sss')
            console.log(StoredTodo[0])
            document.getElementById('Todo').style.backgroundColor = StoredTodo[0].toString()
            
            
        }
        else{
            document.getElementById('Todo').style.backgroundColor = StoredTodo[0].toString()
        }


        socket.on('dragDrop',(move)=>{
       
            setCols(move)
            
        })

        
       
       
       



        
    

        

        //console.log(mockData)
    }

    
    
   


    return (
        <>
         

        <div className="View">
        
            
            <div className="Options" style={{ display: 'flex' }}>
            <button  className='savebtn' onClick={Update}  style={{  maxHeight: '1.90rem',opacity:'0.7',marginTop:"1rem" }}>Save</button>
            
                <div className="contextTo" style={{ marginLeft: '10rem', marginTop: '1rem', display: 'flex' }}>
                    <input
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                        type="text"
                        className="todos"
                        placeholder="To Do"
                        name="todos"
                        maxLength='30'
                        value={todos}
                        onChange={handleChange1}

                    />
                    <button onClick={ListTodo} onSubmit={handleSubmit} type='submit' className='addToDo' style={{ backgroundColor: '#55c2da', maxHeight: '1.90rem',opacity:'0.7' }}>Add</button>



                </div>

                <div className="contextToInvite" style={{ marginLeft: '10rem', marginTop: '1rem', display: 'flex' }}>
                    
                    <input
                        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                        type="text"
                        className="toInvite"
                        placeholder="Invite friends by Gmail"
                        name="account"
                        value={account}
                        onChange={handleChange2}
                    />
                    <button onClick={SendInvitation} onSubmit={handleSubmit} type='submit' className='addFriend' style={{ backgroundColor: '#55c2da', maxHeight: '1.90rem' ,opacity:'0.7'}}>Invite</button>



                </div>

                <a href='https://zoom.us/'><img className="zoomImg" alt='zoom-img' src={zoom} /></a>

            </div>
           
            <div className="app-container">


                <DragDropContext onBeforeCapture={()=>{console.log('start')}} onDragEnd={(result) => {
                    
                   
                    
                    onDragEnd(result, cols, setCols)
                    
                    
                   
                    
            
                  


                }}>

                    {Object.entries(cols).map(([id, col], index) => {
                       
                        
                        
                        
                            
                        /*const Colors =['"#FF0000"','"#00FF00"','"#00FFFF"']

                        var RandomColor = Math.floor(Math.random()*3)
                        var PickedColor = Colors[RandomColor]
                        console.log(PickedColor)*/
                        //const L =[]

                        const generateColor = () =>{
                             
                            const CHHAPOLA = Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
                             
                            
                            
                            return '#'+CHHAPOLA

                        }
                        //L.push(generateColor())
                        //const savedColors =[]
                        
                        const changeColor = () => {
                            /* const btnColor = document.getElementById(col.name.toString())
                            btnColor.style.backgroundColor = generateColor()
                            const Apply = btnColor.style.backgroundColor
                            
                           
                            return  Apply*/
                            var savedColors =[]
                            var savedColorInTest=[]
                            var savedColorInProgress=[]
                            var savedColorInReview =[]
                            var savedColorDone =[]
                            var savedColorTodo =[]

                            
                            if (document.getElementById(col.name.toString()) != null ){
                                document.getElementById(col.name.toString()).style.backgroundColor = generateColor()
                                const Apply =document.getElementById(col.name.toString()).style.backgroundColor

                                if(col.name == 'Todo'){
                                    savedColorTodo.push(Apply)
                                    localStorage.setItem('TodoColors',JSON.stringify(savedColorTodo))
                                }
                                else if(col.name == 'Inprogress'){
                                    savedColorInProgress.push(Apply)
                                    localStorage.setItem('InProgressColors',JSON.stringify(savedColorInProgress))

                                }
                                else if(col.name == 'InReview'){
                                    savedColorInReview.push(Apply)
                                    localStorage.setItem('InReviewColors',JSON.stringify(savedColorInReview))
                                }
                                else if(col.name == 'InTest'){
                                    savedColorInTest.push(Apply)
                                    localStorage.setItem('InTestColors',JSON.stringify(savedColorInTest))
                                }
                                else if(col.name == 'Done'){
                                    savedColorDone.push(Apply)
                                    localStorage.setItem('DoneColors',JSON.stringify(savedColorDone))
                                }
                                
                                 savedColors =[savedColorTodo,savedColorInProgress,savedColorInReview,savedColorInTest,savedColorDone]
                                 localStorage.setItem('my-colors',JSON.stringify(savedColors))
                                 

                               for (let i=0;i<savedColors.length;i++){
                                console.log('+++++')
                                console.log(savedColors[i][0])
                                console.log('++++')
                               }
                               console.log(savedColors)
                               Update()
                                return Apply

                            }
                            else{
                               /* const sol = '#FF0000'
                                return sol*/
                                /*const Colors =["#FF0000","#00FF00","#00FFFF"]

                                var RandomColor = Math.floor(Math.random()*3)
                                var PickedColor = Colors[RandomColor]
                                return PickedColor.toString()*/
                                localStorage.setItem('my-colors',JSON.stringify(savedColors))

                                for (let i=0;i<savedColors.length;i++){
                                    console.log('+++++')
                                    console.log(savedColors[i][0])
                                    console.log('++++')
                                    var PickedColor = savedColors[i][0]
                                    return PickedColor.toString()
                                   }
                            }
                        }
                       // L.push(changeColor())

                       
                        /*const  giveFire=()=>{
                            
                            
                            
                            const btnColor =  document.getElementById(col.name.toString())
                            btnColor.style.visibility ='visible'
                           
                            
                            return btnColor.style.backgroundColor.toString()
                        }*/

                        const giveFire =()=>{

                            if (document.getElementById(col.name) != null){
                                
                                const Apple =document.getElementById(col.name).style.backgroundColor.toString()
                                return Apple

                            }
                            else{

                                var StoredColorInTest= JSON.parse(localStorage.getItem('InTestColors'))
                                var StoredColorInProgress=JSON.parse(localStorage.getItem('InProgressColors'))
                                var StoredColorInReview =JSON.parse(localStorage.getItem('InReviewColors'))
                                var StoredColorDone =JSON.parse(localStorage.getItem('DoneColors'))
                                var StoredColorTodo =JSON.parse(localStorage.getItem('TodoColors'))
                               
                                const Colors =[StoredColorTodo,StoredColorInProgress,StoredColorInReview,StoredColorInTest,StoredColorDone]
                                var PickedColor  ;
        
                                
                                if(Colors[0]!=null){
                                    if(col.name == 'Todo'  ){
                                         PickedColor =Colors[0][0].toString()
                                    }
                                    if(col.name =='Inprogress'){
                                        PickedColor = Colors[1][0].toString()
                                    }
                                    if(col.name == 'InTest'){
                                        PickedColor = Colors[2][0].toString()
                                    }
                                    if(col.name=='InReview'){
                                        PickedColor = Colors[3][0].toString()
                                    }
                                    if(col.name =='Done'){
                                        PickedColor = Colors[4][0].toString()
                                    }
                                }
                                else{
                                    PickedColor='#FF0FF0'
                                }
                                
                                
                                console.log(PickedColor)
                                return PickedColor

                            }
                        }
                      

                        
                        
                        return (
                            
                            <div  style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
                                
                                <button  id = {col.name} onClick={changeColor}  onSubmit={changeColor} style={{ backgroundColor:giveFire(),borderRadius:'7px',color:'black' ,padding:'4px',opacity:'0.7',marginBottom:'2rem',border:'none',fontFamily:' Courier'}}>{col.name}</button>
                                
                               
                                <div style={{ marginLeft: "8px" }}>
                                    <Droppable droppableId={id} key={id}  >
                                        {(provider, snapshot) => {
                                            

                                            
                                            return (
                                                <div   {...provider.droppableProps}
    
                                                
                                                    style={{
                                                        border: "none",
                                                        boxShadow: '0 0 8px '+giveFire(),
                                                        borderRadius: '5px',
                                                        backgroundColor: snapshot.isDraggingOver ? 'rgba(255,255,255,0.2)' :'rgba(0,0,25,0.4)',
                                                        opacity:'0.68',
                                                        backdropFilter: "blur('5px')",
                                                        zIndex: '3',
                                                        padding: "8px", height: "800px", width: "300px",


                                                    }}
                                                    ref={provider.innerRef}>
                                                    {col.items.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index} >
                                                                {(provider, snapshot) => {
                                                                  
                                                                    return (
                                                                        <div ref={provider.innerRef} 
                                                                            {...provider.dragHandleProps}
                                                                            {...provider.draggableProps}
                                                                            style={{
                                                                                padding: "16px",
                                                                                margin: "0 0 16px 0",
                                                                                fontSize:'20px',
                                                                                fontFamily:'Gill sans',
                                                                                fontWeight:'540',
                                                                                height: "40px",
                                                                                borderRadius: "8px",
                                                                                backgroundColor: snapshot.isDragging ? giveFire() : giveFire(),
                                                                                ...provider.draggableProps.style
                                                                            }}
                                                                        >


                                                                            {item.text}


                                                                            <img className="delete"
                                                                                onClick={(event) => {

                                                                                    console.log(event.currentTarget.id)
                                                                                    Object.entries(cols).filter((arr) => {
                                                                                        console.log(arr[1])
                                                                                        if (arr[1]) {
                                                                                            for (let i = 0; i < arr[1].items.length; i++) {
                                                                                                if (arr[1].items[i].id == event.currentTarget.id) {
                                                                                                    
                                                                                                    var poped = arr[1].items.splice(i, 1)
                                                                                                    console.log('deleted' + poped[0].text)
                                                                                                    
                                                                                                }

                                                                                            }



                                                                                        }

                                                                                    })
                                                                                    Update()
                                                                                    
                                                                                 
                                                                                  

                                                                                }}
                                                                                id={item.id}
                                                                                src='https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png'
                                                                                style={{ height: "1.25rem", width: "1.25rem", marginLeft: '0.7rem' ,borderRadius:'1px'}}

                                                                            />

                                                                        </div>
                                                                    )
                                                                    
                                                                }}
                                                               

                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provider.placeholder}
                                                    

                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>

                        )
                    })}
                     

                </DragDropContext>
                
               

                <Chat />
            </div>
            



        </div>
    </>);
}

export default BoardList




