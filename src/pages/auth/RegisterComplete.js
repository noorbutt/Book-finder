import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase'
import {toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Input } from 'antd';





// main function 

const RegisterComplete = ({history})=>{


 const [email , setEmail] = useState("")
 const [password , setPassword] = useState("")



//  I will run on first  render..... 
// when ever the password changes the function will run... 
useEffect(()=>{
  // this method save user email in local storage ...
    setEmail(window.localStorage.getItem('emailForRegistration'))
  // console.log(window.location.href);

   // Email get from the local storage 
   //console.log(window.localStorage.getItem('emailForRegistration'))
},[])




// // handle submit function 
// const handleSubmit = async (e)=>{

//  // validations  email and password....

// // the email or password no then we want to show some error message...
// if(!email || !password){
//   toast.error("Email and Password is required")
//   return;
//   }
 
 
  
//   // password validation 
//   if(password.length < 6){
//  toast.error("password must be at least 6 charaters long")
//  return;
//   }
 

//   e.preventDefault();

//   const result = await auth.signInWithEmailAndPassword(email, password)

//   .then((userCredential) => {
//       // Signed in
//       var user = userCredential.user;
 
//         // get user id token 
    
//       const idTokenResult =  user.getIdTokenResult()
//    // redux store 
//    console.log('user', user , 'idTokenResult' , idTokenResult)



  
//    /// redirect
//    history.push("/");

  

//    }).catch ((error)=>{
//        console.log(error)
//        toast.error(error.message);
//    })
   



//   };



// // handle submit function 
   const handleSubmit = async (e)=>{
// //this method prevent the brwoser from reload.....
 // e.pereventDefault();


// // validations  email and password....


// // the email or password no then we want to show some error message...
  if(!email || !password){
 toast.error("Email and Password is required")
 return;
 }



//  // password validation 
  if(password.length < 6){
 toast.error("password must be at least 6 charaters long")
 return;
  }



// // firebase code...
 try{

     const result = await auth.signInWithEmailLink(
        email, 
// //location. href returns the href (URL) of the current page
       window.location.href
       );


console.log("Resulting" , result)

 

 if(result.user.emailVerified){

//    // remove the user from local storage 
    window.localStorage.removeItem("emailForRegistration")
    
//     // get user id token 
    let user = auth.currentUser

//     // this funtion is comes from the firebase get this current logged 
//     //in user then we can access this update password.....
//    // The await keyword causes the JavaScript runtime to pause your code on this line..

     await user.updatePassword(password)
     const idTokenResult = await  user.getIdTokenResult()
   

//    // redux store 
   console.log('user', user , 'idTokenResult' , idTokenResult)


//    /// redirect
    history.push("/");

   
 }

     }



 catch (error){
     console.log(error)
     toast.error(error.message);
 }

   };



    const completeRegisterForm = ()=> (  

  <form onSubmit={handleSubmit}  className='p-5'   >

  

<Input placeholder=" enter your email "
  value={email}
  onChange={(e)=>setEmail(e.target.value)}    
   allowClear    type="email"      />




<br/>
<br/>


     <Input   placeholder="enter your password"      type="password" 
    value={password}
    onChange={(e)=>setPassword(e.target.value)}  
    allowClear       />



     <br/>
     <br/>

<button type="button"   className="btn btn-info"  onClick={handleSubmit}>Complete Registeration</button>


    </form>

)


     return(

     <div className=' container  d-flex   justify-content-center align-items-center flex-column'    >

       <div className="row">  
      
   <h4  className='head' >Register complete</h4>

     {/* <ToastContainer/>  */}
      
     {completeRegisterForm()}

      </div>  
       
        </div>
    )


   



 }




 export default RegisterComplete;


















































