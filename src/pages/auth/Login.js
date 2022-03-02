
import React, {useState,useEffect} from 'react';
import {auth, googleAuthProvider} from '../../firebase'
import {toast , ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {MailOutlined , GoogleOutlined} from '@ant-design/icons'
import { Button } from 'antd';
import {useDispatch , useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Input } from 'antd';



// main function 
   const Login = ( { history }  ) => {


 const [email , setEmail] = useState("")
 const [password , setPassword] = useState("")
 const [loading,setLoading] = useState(false)

  const {user} = useSelector((state)=> ({...state}))
 

 useEffect(()=>{
   if(user && user.token)history.push('/')
   },[user])
  
  
  





let dispatch = useDispatch()



// handle submit function 
  const handleSubmit = async (e)=>{
   

// this is basically to prevent the browser from reload...
    e.preventDefault();
 //console.table(email , password)
//  when user click on this button we get the response... user try login set the loading  state to true.....  
setLoading(true)

   try{
     // user can sign in again with email and password...
  const  result = await auth.signInWithEmailAndPassword(email, password)

  console.log(result)

  const {user} = result 
  const idTokenResult = await user.getIdTokenResult()


  dispatch({ 
    type:"LOGGED_IN_USER",
    payload:{   
       email: user.email,
       token:idTokenResult.token,
      },
  });


  // redirect the user from many way...
  history.push('/');

  }


  catch(error){
    console.log(error)
   toast.error(error.message);
   setLoading(false);
}


  };



/// Google auth.............
  const googleLogin = ()=>{
   auth.signInWithPopup(googleAuthProvider)
   .then(async (result )=>{
 // we get the result  from that result we can destruct the user...
 const {user} = result ;

 const idTokenResult = await user.getIdTokenResult()
 //making request our own on backend get the response from there based on user role..
 
// In redux data update.....
 dispatch({ 
  type:"LOGGED_IN_USER",
  payload:{   
     email: user.email,
     token:idTokenResult.token,
    },
});


// redirect the user from many way...
history.push('/');

   })

   .catch(error=>{
     console.log(error)
     toast.error(error.message)
   })
  }








    const LoginForm = ()=> (  

    <form onSubmit={handleSubmit} >

   <div className="form-group"> 

      <Input placeholder=" enter your email "
      value={email}
      onChange={(e)=>setEmail(e.target.value)}    
      allowClear    type="email"      />





   </div>



<div   className="form-group">

 

     <Input   placeholder="enter your password"      type="password" 
    value={password}
    onChange={(e)=>setPassword(e.target.value)}  
    allowClear       />


   </div>


<br/>  


<Button type="danger "
   className="mb-3" class="btn btn-danger"
   block 
   shape="round"   
   onClick={handleSubmit}   icon={< MailOutlined />}  size="large"
   disabled={ !email ||  password.length < 6 }
    > Login with Email/password  </Button>
  
  

    </form>

)





     return(

         <div className="container p-5"    className=' container  p-5   d-flex justify-content-center align-items-center flex-column'                  >

        <div className="row">
      
         {/* <div className="col-md-6 offest-md-3"> */}

{ loading ? ( <h4 className="text-danger">Loading....</h4> ) :  ( <h4 className='text'> Login</h4> ) }


       {/* <ToastContainer/>  */}
      
       {LoginForm()}
       
<Button type="danger"
    className="mb-3"   
    className="btn btn-info"
   block 
   shape="round"   
   onClick={googleLogin}  size="large"
   icon={< GoogleOutlined />}
    > Login with Google  </Button>
   

   <Link to="/forgot/password"  className="float-right  text-danger" >Forgot password? </Link>

       </div>
         {/* </div> */}
       
         </div>
    )




 }


 export default Login;


