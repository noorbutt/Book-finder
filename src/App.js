
import './App.css';
import React, { useEffect } from 'react';
import {Switch , Route}  from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './component/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {auth} from './firebase'
import {useDispatch} from  'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import Contact from './pages/auth/Contact';





   const App = () => {


 //const dispatch = useDispatch() This hook returns 
 // a reference to the dispatch function from the Redux store....
   const dispatch = useDispatch()


//    to check firebase auth state 
//// try to login the currently user logged in from firebase if there currently user logged in 
// // then we get the information  here and that information we want to dispatch to the redux store....
   useEffect(()=>{



////  This method gets invoked in the UI thread on changes in the authentication state
/// When a user is signed in. When the current user is signed out.....
 const Unsubscribe = auth.onAuthStateChanged(async (user) =>{
  

     if(user){

   /// firebase auth  method 
      const idTokenResult = await user.getIdTokenResult()

     console.log("Currently logged in user" , user) 
      
    // update state in redux ....
       dispatch({ 
         type:"LOGGED_IN_USER",
         payload: {
            email: user.email,
            token:idTokenResult.token,
            displayName:user.displayName,
            photoURL:user.photoURL  }
           ,


       });

     }


  }) 

//   // cleanUp 
return () => Unsubscribe();

  },[])




return (

  <>

       <Header/>
       <ToastContainer/> 

       <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/register" component={Register} /> 
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/Contact" component={Contact} />
      </Switch>

</>

)



}

export default App;



















