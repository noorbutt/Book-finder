import React, {useState , useEffect} from 'react';
import {auth} from '../../firebase'
import {toast } from 'react-toastify'
import {useSelector} from 'react-redux'
import { Input } from 'antd';
// in case if user they log in with email and password but next time they want to login again 
// but they forget password so in that case we should give them the option to enter a new password....





const ForgotPassword = ({history}) =>{
    
const [email,setEmail] = useState("")
const [loading , setLoading] = useState(false)

 const {user} = useSelector((state)=> ({...state}))


 useEffect(()=>{
 if(user && user.token)history.push('/')
 },[user])



const handleSubmit = async (e)=>{

e.preventDefault();
setLoading(true)

// the user will click on the link they will see a pop-up 
//window key they will be landing on a page they will be able to enter new password ..
const config={
    // url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL ,
    url:'http://localhost:3000/Login',
    handleCodeInApp: true, 
}
 

await auth.sendPasswordResetEmail(email , config)

.then(()=>{
setEmail("")
setLoading(false)
toast.success("Check your email and password reset link ")
})

.catch((error)=>{
setLoading(false)
toast.error(error.message)
console.log("ERROR MSG IN FORGOT PASSWORD ",error )
})


}






return (
    <div className="container col-md-6 offset-md-3 p-5">
       {loading 
       ? (  <h4 className="text-danger">  Loading... </h4>) :
         (  <h4  className='forgot'>  Forgot Password </h4> 
        ) }

    <form onSubmit={handleSubmit} >

    <h6 className='forgot'  >  To reset your password, enter the email address you use to sign in to Google play.  </h6>
     <br/>
     <Input placeholder=" enter your email "
  value={email}
  onChange={(e)=>setEmail(e.target.value)}    
 allowClear    type="email"      />



<br/>
<br/>
 <button  onClick={handleSubmit}   className="btn btn-info"
    disabled={!email}> Submit  </button>
    </form>


         </div>
)

}





export default ForgotPassword;





