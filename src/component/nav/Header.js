import React, {useState} from 'react';
import {Menu} from 'antd';
import { AppstoreOutlined, SettingOutlined ,UserOutlined , UserAddOutlined , LogoutOutlined, CommentOutlined , LoadingOutlined   } from '@ant-design/icons';
import firebase from 'firebase'
import {useDispatch , useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Link} from "react-router-dom";
import './header.css'





 const { SubMenu ,Item } = Menu;




  const Header =   () => {



// from destructuring you can rid of the  repetition code from everywhere...  
 const [current,setCurrent] = useState("home")

const [loading , setLoading ] = useState(false)

 let dispatch = useDispatch();

 let {user} = useSelector((state)=> ({...state}))


 let history = useHistory( );




const handleClick = (e)=>{
 setCurrent(e.key)  
}





const Logout = (  )=>{
 
  if (loading) {
    return (
      <div className='d-flex justify-content-center mt-3'>
        {/* <Spinner style={{ width: '3rem', height: '3rem' }} /> */}
        <LoadingOutlined style={{ width: '3rem', height: '3rem' }}   />
      </div>
    );
  } else{
   
  firebase.auth().signOut()

    dispatch({
      type:"LOGOUT ",
      payload:null,
    })


   console.log(firebase.auth().signOut())

   history.push("/Login")
  }
  
}




 const Register = ()=>{
     history.push('./Register/Complete')
 }




const Contact = ()=>{
 history.push('./Contact')
 }


// img className='imgheader' style={{width:'150px' , height:'55px' ,marginLeft:'50px'}}
// className='imgheader' style={{ width:'12px' , height:'13px' ,marginLeft:'50px' }}

     return(
     // Conditionally render....
     // {JSON.stringify(user)}

  <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
    
{/*    
  <div   className='imgheader' style={{ width:'12px' , height:'13px' ,marginLeft:'50px' }}           >
 <img   className='imgheader' style={{width:'150px' , height:'55px' ,marginLeft:'50px'}}           src='https://techaeris.com/wp-content/uploads/2016/07/Google-Play-Books-FI.jpg' />   
  </div>  */}



    <Item key="home" icon={ <AppstoreOutlined /> }   className="float-right" >
     <Link  to="/">Home  </Link>
     </Item>
  
   


{!user&& (  
     <Item key="Register" icon={ < UserAddOutlined /> }   className="float-right"     >
     <Link  to="/Register/complete">Register</Link>
     </Item>

)}


{!user&& (   
     <Item key="Login" icon={ <UserOutlined  /> }  className="float-right">
     <Link  to="/Login">Login</Link>
     </Item>
)}



{!user&& (   
     <Item key="CardDetail" icon={ <CommentOutlined /> }  className="float-right">
     <Link  to="/Contact">Contact</Link>
     </Item>
)}



{user&& (  
<SubMenu key="SubMenu"    icon={<SettingOutlined  />}
 title={user.email && user.email.split('706')[0] } 
 className="float-right" >


     <Item key="setting:1" icon={ <UserOutlined  /> } onClick={ Register}>Register</Item> 
     <Item key="setting:2"  icon={ <CommentOutlined /> }  onClick={ Contact} >Contact</Item>
     <Item icon={<  LogoutOutlined />}     onClick={Logout}>logout</Item>



  
  </SubMenu>
 )}

   </Menu>
        
        // style={{width:'140px' , height:'50px' ,marginLeft:'5px'}}      


        )
        
         
        }
        
       
        
        
        export default Header;
        








        