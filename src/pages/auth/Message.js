import React , {forwardRef} from 'react'
import {Card, CardContent,Typography} from '@material-ui/core'
import './style.css';





const  Message = forwardRef( ({message , username},ref) => {


  const isUser = username === message.username;


    //&& operator evaluates the operands from left to right and returns the first falsy value...
    return (
        <div ref={ref}  className={`mobilediv message ${isUser && 'message_user'}`}>
        
            {/* Template literals  */}
            {/*  multiline strings in one line  */}
            {/* BEM */}  
            <Card className = {  isUser ? 'message_userCard' : 'message_guestCard'   }>  
            <CardContent>

             <Typography className="typing"  color="white" variant="p" component="p">
           
             { !isUser && `${message.username || 'Unknown user' } say ` }    
           {/* {!isUser ?   (message.username) :     (<h2>  Unknown user say  </h2> ) }    */}
             {/* {!isUser? (<img src={user.photoURL} /> ):( <h6>pgl</h6>)} */}
            {/* {!isUser ? (<h6>  {user.displayName} </h6>) : ( <h1>empty  </h1>) }  */}
                   
                   {message.message} "{message.username}" 

              </Typography>

             

            </CardContent>
            
            </Card>

          
        </div>
       
    )

})

export default Message;






