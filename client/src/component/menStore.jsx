import React, { useState, useRef, useEffect } from 'react';
import app from '../firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import axios from 'axios';
import ProductPost from './LatestPost';
import SubmitBtn from './submitbtn';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingComponent from './Loading';
import Navcomponent from './navbar';

function MenStore(){
const [searchInput , setSearchInput] = useState("")
const [isloading , setisloading] = useState(false)
const [islogin , setislogin] = useState(false)
const [products , setProducts]= useState([])
const [userdata , setuserdata] = useState([])
const [found404 , setfound404]= useState(false)
const navigate = useNavigate();
const location = useLocation();
const womentag = useRef([]);
const mentag = useRef([]);
const childrentag = useRef([]);
const SearchHandler = (e) => {
  e.preventDefault();
  
  setisloading(true)

  const encodedSearchInput = encodeURIComponent(searchInput);
  navigate(`/store/Men?s=${encodedSearchInput}`);
  axios.get(`/posts/men?s=${searchInput}`)
    .then((res) => {
      setProducts(res.data);
      
  setfound404(false)

      // Update the URL without triggering a full page reload
    })
    .catch((e) =>{ console.log(e)
    setfound404(e.message)
    console.log(found404)
    })
    .finally(()=>{
  setisloading(false)

    })
}

const userLoginCheckHandler = async() =>{

  try {
    const res = await axios.get("/currentuser",{
      withCredentials: true,
    })
    setislogin(true)
    
    setuserdata(res.data)
  } catch (error) {
    console.log(error)
    setislogin(false)
  }
}


const searchQuery = new URLSearchParams(location.search).get('s');

useEffect(()=>{
  console.log(searchQuery, "amd searced bi" ,searchInput)
  setSearchInput(searchQuery || '')
  
  setisloading(true)
axios.get(`/posts/men?s=${searchQuery || ""}`)
.then((res)=>{
  
  setProducts(res.data)
  console.log(products)
  setfound404(false)
})
.catch((e)=>{console.log(e)
  setfound404(e.messege)
})
.finally(()=>{
  setisloading(false)

})
},[])
useEffect(()=>{
  userLoginCheckHandler()
},[islogin])

useEffect(()=>{
  const mentags = products.filter((product)=>product.tag === 'Men').map((product)=>product.tag)
  const womentags = products.filter((product)=>product.tag === 'women').map((product)=>product.tag)
  const childrentags = products.filter((product)=>product.tag === 'children').map((product)=>product.tag)


  mentag.current = mentags
  womentag.current = womentags
  childrentag.current = childrentags
},[SearchHandler])


    return(

     <>
     <Navcomponent islogin={islogin} img={userdata.image} changeCss={true}/>

      <div className='bg-[#f5f7f9] max-[600px]:flex-col px-[30px] flex justify-around md:py-[70px] py-[50px]'>

        <div>
          <div>
            <form className=' md:max-w-[300px]' onSubmit={SearchHandler}>
             <div className='flex border border-violet-500 justify-between overflow-hidden rounded-[3px]'>
             <input type="text" value={searchInput} className='outline-none'
              onChange={
                (e)=>
                  {setSearchInput(e.target.value)}
                  }/>
             </div>
             <SubmitBtn value="Search" valueOnUpload="searching.." Requirments={[searchInput]} isProcessing={isloading} />
            </form>
          </div>
          <div>
            <h1>Catogries</h1>
            <div>
              <ul className='max-[600px]:flex gap-[10px] my-[10px]'>
                <li>Men({mentag.current.length})</li>
                <li>Women({womentag.current.length})</li>
                <li>Children({childrentag.current.length})</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='pt-[100px] bg-white max-w-[1000px] w-[95%] px-[5%] flex flex-col items-center ' >
         <div className=' px-[13px] w-full flex  justify-start pb-[2em]'>
          <h1 className='text-[#777] '>{searchQuery || searchInput ? (`Home/Store/Men ${searchQuery}`) :'Home/Store/Men'}</h1>
         </div>
         <div>
            <h1 className='text-[66px] max-[450px]:text-3xl mb-[1em]'>Men</h1>
            <p  className='max-[500px]:hidden'>
            Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed ut.
            </p>
         </div>
         <div className='pb-[2em] px-[13px] flex w-full justify-between'>
          <h1 className='text-xl'>Showing 1-{products.length || 0} of {products.length ||0} result</h1>
          <select name="" id="" className='outline-none px-3 py-2 w-[200px] text-slate-500'>
            <option className='px-3 py-2' value="">Default sorting</option>
            <option className='px-3 py-2' value="">sort by name</option>
            <option className='px-3 py-2' value="">Default sorting</option>
            <option className='px-3 py-2' value="">Default sorting</option>
          </select>
         </div>
         
         <div className='flex flex-wrap justify-center gap-[20px]'>

          {
           isloading? (<LoadingComponent isLoading={isloading} />)         
          :
            found404?(<div>{found404}</div>):
            (products.length > 0 &&
              products.map((product) => (
                <ProductPost
                  productid={product._id}
                  key={product._id}
                  title={product.title}
                  price={product.price}
                  isSale={product.salesDiscount}
                  ratings={product.rating} // Map the ratings array correctly
                  tag={product.tag}
                  productImg={product.img}
                />
              )))
          
          }
  
         </div>
        </div>
      </div>
     </>
  
    )
}

export default MenStore