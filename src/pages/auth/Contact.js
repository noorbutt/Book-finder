import React, { useState , useEffect } from 'react' ;
import './style.css';
import {SendOutlined} from '@ant-design/icons'
import dp from '../../firebase'
import firebase from 'firebase'
import {useSelector} from 'react-redux'
import Message from './Message'
import FlipMove from 'react-flip-move'





  const Contact = () => {


  const [input,setInput ] = useState('')
  const [messages , setMessages] = useState([ ])  
  const [username , setUsername] = useState('')


    // function useState(){
    //    return[ 'noor',123,'butt' ]
    //  }

  
    // const [name,roll,sirName] = useState() 
 
    
    //   console.log(name)
    //   console.log(rollNum)
    //   console.log(sirName) 




console.log(input)
console.log( "dpdata", messages)


// useState  = variable in React
// useEffect = runs  code  on a condition 



 useEffect (()=>{
//   // runs once the app component loads.............

   //takes the picture of database onSnapshot function.........

 dp.collection('messages')
 //orderBy() a query retrieves all documents that satisfy the query
 // in ascending order by document ID
 .orderBy('timestamp', 'desc')
 .onSnapshot(snapshot =>{

 setMessages(snapshot.docs.map(doc=>( {id:doc.id, message: doc.data()} ) ) )
 })

},[])


console.log(dp, "dpdata" )

       
  useEffect(() => {
 // run code here 
 
setUsername(prompt('please enter you user name '))

  // if its blank inside [] this code  run when the app component loads....
 
  },[] ) //condition



const sendMessage = (event)=> {
  event.preventDefault();
  dp.collection('messages').add({
    message:input,
    username:username,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
  // all the logic to send message goes..........
  // setMessages([...messages, { username:username, message: input}])
  setInput('')
}



       // ///In redux data get from store .........
       const {user} = useSelector((state)=>
                    ({...state})         
       )

                 console.log(user,'coming user')

     

  
      


    return (
  <section className="cont">
    
          
<div className="chatArea"> 





         <div className="messageSections" >
   

         <div className="listOfUsers">
           
           

         <div className="displayName">


            <div className="displayPic">  

           
{/*             
             {user ? ( <img src={user.photoURL} /> ):( <h6></h6>)}
            {user ? (    <h6>  {user.displayName} </h6>) : ( <h1>empty  </h1>) } 
          </div>
           */}




<div className="displayPic">




</div>
           

             </div>

           


    <FlipMove>                
               {  
  messages.map( ( {id,message} )=>( 
    <Message key={id} username={username}  message={message}    />
  

  ))

  }
   </FlipMove>     








      </div> 
     
           
      

          </div> 
           </div>  

      

           <FlipMove>

 <div className="chatControls"> 

  
   
  <textarea className="textarea"  value={input}  onChange={(e)=>setInput(e.target.value)}   />


      <button    className="btn btn-info"     type="danger" type="submit"
      onClick={sendMessage}    disabled={!input}  >
      <SendOutlined    className="icon"    />
      </button>

  


  
  

    
           </div> 
           </FlipMove>  
       </div> 
          

  </section>

    );
  }
  
  export default Contact;


