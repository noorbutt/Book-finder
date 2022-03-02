import  firebase from 'firebase/app';
import      'firebase/auth'
import 'firebase/firestore'


///////////////////////////////////////////////////////////////////
  // var firebaseConfig = {
  //   apiKey: "AIzaSyD1HeHoN9Kpzm4gFO4r07WflcJuo4h6Bng",
  //   authDomain: "redux-app-b8d97.firebaseapp.com",
  //   projectId: "redux-app-b8d97",
  //   storageBucket: "redux-app-b8d97.appspot.com",
  //   messagingSenderId: "136799971065",
  //   appId: "1:136799971065:web:7064382653e031e8f72428",
  //   measurementId: "G-QZB59K7YD7"
  // };

/////////////////////////////////////////////////////////////////






  const firebaseApp =  firebase.initializeApp({
      apiKey: "AIzaSyD1HeHoN9Kpzm4gFO4r07WflcJuo4h6Bng",
      authDomain: "redux-app-b8d97.firebaseapp.com",
      databaseURL: "https://redux-app-b8d97-default-rtdb.firebaseio.com",
      projectId: "redux-app-b8d97",
      storageBucket: "redux-app-b8d97.appspot.com",
      messagingSenderId: "136799971065",
      appId: "1:136799971065:web:27bb8d1ff79d5885f72428",
      measurementId: "G-9E5XLXLD7E"
    
  });


  // Initialize Firebase
 //firebase.initializeApp(firebaseConfig);
  
  const dp =  firebaseApp.firestore();
  
  // const fieldValue = admin.firestore.FieldValue; 


  //   export default fieldValue;



    export default dp;




  
   export const auth = firebase.auth();
  


   
   export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

























   

