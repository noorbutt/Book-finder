
import React, {useState,useEffect} from 'react';
import './SearchResult.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, FormGroup,InputGroup , InputGroupAddon ,Label,Spinner} from 'reactstrap';
import {toast , ToastContainer} from 'react-toastify';
import axios from 'axios' ;
import BookCard from './BookCard.jsx';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';


const { Search } = Input;



  const onChange = e => {
   console.log(e);
 };



    
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
     




  const onSearch = value => console.log(value);
 






const Home = () => {


  // States
  const [maxResults, setMaxResults] = useState(6);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  



  //maxResults > 40 || maxResults < 1


  // // Handle Search
   const handleSubmit = () => {
     setLoading(true);
     if (maxResults > 6) {
       toast.error('max results must be between 1 and 40');
     } else {
       axios
 ///////       Api intergeration using template literals .........
         .get(
`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        )
         .then(res => {
          console.log(res.data)
           if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `max reults must be between 1 and ${res.data.totalItems}`
           );
           
           } else {
             if (res.data.items.length > 0) {
               setCards(res.data.items);
               setLoading(false);
             }
           }
         })
         .catch(err => {
          setLoading(true);
         console.log(err.response);
        });
    }
   };




                     // input search using lifecycle method......//
                     // it will render when first render.........//

//useEffect(()=>{

//setLoading(true)

///axios.get(
 //'https://www.googleapis.com/books/v1/volumes?q=search+terms'
//).then(()=>{
 // setCards(res.data.items);
 // setLoading(false);
//}).catch(()=>{
//console.log(err)
//})

///},[] )




// useEffect(()=>{
//   setCards(
//       cards.filter((cards) =>
//       cards.name.toLowerCase().includes(search.toLowerCase())
//     )
//     );

// },[search,cards])


                           ///////// ending ///////////



  // Main Show Case
  const mainHeader = () => {

    return (
      <div className='container  d-flex justify-content-center align-items-center flex-column'>
             
        {/* Overlay */}

        <div className='filter'></div>
        <h1
          className="dislay-2   text-center   text-white mb-3"
          style={{ zIndex: 2}}
        >
          Book finder
        </h1>

        <div style={{zIndex :2  ,width:'60%'}}>
          
        
{/* style={{height:'35px', width:'800px'}}  input-group-append */}



<InputGroup size='lg' className='mb-3' >

 <div className="input-group-append"  >
 

<Input placeholder="Search your books........"  allowClear onSearch={onSearch}    onChange={e => setQuery(e.target.value)}    value={query}   allowClear    />
 

  <button type="button" class="btn btn-primary"    style={{width:'50px' , height:'35px',  paddingBottom:'18px' , scrollPaddingRight:'5px' , color:'#F7F9F9'  ,backgroundColor: "#1890ff" }}     onClick={handleSubmit}    >
  <i class="fas fa-search"></i>
  </button>


  </div>   

    




<div className="input-group-append">

  </div>



<InputGroupAddon addonType='append'  >
            
            </InputGroupAddon>


          </InputGroup>


          <div className='d-flex text-white justify-content-center'>


            <FormGroup >
              <Label for='maxResults' className="labelmax"  style={{color:"#FFFFFF  " , fontSize:"18px" , fontWeight:"bold"}}   >Max Results</Label>
              <Input
                type='number'
                id='maxResults'
                placeholder='Max Results'
                value={maxResults}
                onChange={e => setMaxResults(e.target.value)}
                className='maxinput'
              />
            </FormGroup>

            <FormGroup className='ml-5'>
              <Label for='startIndex' className="labelindex" style={{color:"#FFFFFF   " , fontSize:"18px" , fontWeight:"bold"}}  >Start Index</Label>
              <Input
                type='number'
                id='startIndex'
                placeholder='Start Index'
                value={startIndex}
                onChange={e => setStartIndex(e.target.value)}
                className='indexinput'
              />
            </FormGroup>
          </div>

        </div>

      </div>
    );
  };


  // Cards list show......

  const handleCards = () => {
    if (loading) {
      return (
        <div className=' d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      const items = cards.map((item, i) => {let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }



        return (
          <div className='col-lg-4 mb-3'  key={item.id}  >
            <div class="listof">

            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
              />
              </div>
          </div>

        );
      });



      return (
        <div className="row mt-5">

        <div className='row'>{items}</div>
          </div>
       
      );
    }
  };



    return (
      <div className='w-100 h-100'>
         {mainHeader()} 
         <div >
        {handleCards()}
         </div>
        {/* <ToastContainer /> */}
      </div>
    );
  }
  



export default Home;








