
 import React, {useState,useEffect} from 'react';
 import {auth} from '../../firebase'
 import {toast , ToastContainer} from 'react-toastify'
 import "react-toastify/dist/ReactToastify.css";
 import { useSelector} from 'react-redux'
 import { Input } from 'antd';




// main function 
    const Register = ({history})=>{


  const [email , setEmail] = useState("")


// useSelector allows us to extract the data from redux store ....
  const {user} = useSelector((state)=> ({...state}))
 



  useEffect(()=>{
    if(user && user.token)history.push('/')
    },[user])
   
   
   



// handle submit function 
   const handleSubmit = async (e)=>{

 // this is basically to prevent the browser from reload...
     e.preventDefault();

 // config functoin will be used to  create that link by firebase...
 // Thats are the configuration which  will to use in the email that we will be sending...
 console.log("ENV---->" ,process.env.REACT_APP_REGISTER_REDIRECT_URL )
     const config = {
 // we need to create this page very soon....
      url:'http://localhost:3000/register/complete',
    //ProcessingInstruction to check the development 
      //url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
  // This must be true becacuse the registration is complete from one device and try to login from another device... 
      handleCodeInApp: true,
    };
    
    
   
     
   await auth.sendSignInLinkToEmail(email, config) 
  toast.success( 
       `Email is sent to ${email}.Click the Link to Complete your registration.`
      );
  // save user email in local storage 
  window.localStorage.setItem("emailForRegistration" , email);
    
  // clear state
  setEmail("");
    
   };

 



     const registerForm = ()=> (  

     <form onSubmit={handleSubmit}>


    <Input placeholder=" enter your email "
  value={ email }
  onChange={(e)=>setEmail(e.target.value)}    
 allowClear    type="email"      />

<br/>
<br/>

   <button type="button" className="btn btn-raised"  onClick={handleSubmit}  >Register</button>

     </form>

)


      return(

          <div className="container p-5 container  d-flex   justify-content-center align-items-center flex-column'               ">
    

         <div className="row">
     

          <h4 className="Register">Register</h4>

       
        {registerForm()}
        </div>
      
        
          </div>
     )




  }




  export default Register;
