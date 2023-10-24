import react,{useEffect, useRef, useState} from 'react'
import SubmitBtn from './submitbtn'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const [productItems , setProductItem] = useState([])
    const [title ,settitle] = useState("")
    const [rerenderOnPost , setrerenderOnPost] = useState(false)
    const [rerender , setrerender] = useState(false)
    const [image , setdpimage] = useState(null)
    const [URLtitle ,setURLtitle] = useState("")
    const [img , setImg] = useState()
    const [content ,setContent] = useState("")
    const [ProductsArray , setProductsArray] = useState([])
    const projectRepoRef = useRef(null) 
    const projectliveLinkRef = useRef(null) 
    const projectImage = useRef(null) 
    const [img_pro , setImg_pro] = useState()
    
    const deleteProductHandler = async(id)=>{
      try {
        const res = await axios.delete(`/delete-product/${id}`)
        console.log(res.data)
        setrerenderOnPost(true)
      } catch (error) {
        console.log(error)
        
      }
    }
    const AddProducthandler = (e)=>{
         e.preventDefault();

        const newAdd = {
            heading:title,
            content:content,
             urlTitle:URLtitle,
        }

        setProductsArray((ProductsArray)=>[...ProductsArray , newAdd])
        const formdata = new FormData()
        formdata.append('Heading',title)
        formdata.append('content',content)
        
        formdata.append('setUrl',URLtitle)
        formdata.append('image',img)
        axios.post("/post", formdata , {
            withCredentials: true, 
        })
          .then((res)=>{
            console.log(res)
            setrerenderOnPost(true)
          })
          .catch( (e)=>{
            console.log(e);
      
          })
    }
    const  AddProjectHandler = async(e)=>{
      e.preventDefault();

      try {
        const formdata = new FormData()
        formdata.append('hostlink',projectliveLinkRef.current.value)
        
        formdata.append('RepoLink',projectRepoRef.current.value)
        formdata.append('image',img_pro)
      const res = await axios.post(`/Add-project`,formdata,{withCredentials:true})
        console.log(res.data)
       
      } catch (error) {
        console.log(error)
      }
    }
    // const productsHandler = async()=>{

    //   try {
    //     const res = await axios.get('/posts')
    //     console.log(res.data)
    //     setProductItem((productItems) => [...productItems , res.data])
    //    setrerender(true)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // useEffect(()=>{
    //   // productsHandler()
    // },[rerenderOnPost])
    // useEffect(()=>{
    //   console.log(productItems)
    // },[productItems])
    // useEffect(()=>{
    //     console.log(ProductsArray)

    // },[ProductsArray])
    // useEffect(()=>{
    //     AdmincheckingHandler()
    // },[islogin])
    return(
        <div className='flex flex-col items-center gap-[60px]'>
         
         
            
            <div className='max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl'>
                <h1 className='text-4xl font-semibold'>Add a Article</h1>
                <form onSubmit={AddProducthandler}>
                <div className='flex justify-center h-[80px] my-[10px] w-[40px]'>
                    <img className=' w-full' src={image} alt=""onClick={(e)=>{
                      document.getElementById("inputimage").click()
}} />
                    <input type="file" id='inputimage' hidden onChange={(e)=>{
                      setdpimage(URL.createObjectURL(e.target.files[0]))
                      setImg(e.target.files[0])
                    }

                    }
                    
                     />
                </div>
              <div className='flex flex-col w-full gap-[20px]'>
                
              <input type="text" value={title} className='border px-4 py-3 w-full'
                    onChange={(e)=>{settitle(e.target.value)}} placeholder='title....'/>
                     <input type="text" value={URLtitle} className='border px-4 py-3 w-full'
                    onChange={(e)=>{setURLtitle(e.target.value)}} placeholder='add a unique title for Url'/>
                    
                    
                   <textarea name="" id="" cols="30" rows="10" value={content} className='border px-4 py-3 w-full'
                   onChange={(e)=>{setContent(e.target.value)}} placeholder='add content'
                   ></textarea>
                  <div className='w-full'>
                  <SubmitBtn value="add new Product" valueOnUpload="addingg" Requirments={[title , content , URLtitle]} />
                  </div>
                
              </div>
                </form>
            </div>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl'>
                <h1 className='text-4xl font-semibold'>Add a Project</h1>
                <form onSubmit={AddProjectHandler}>
                <div className='flex justify-center h-[80px] my-[10px] w-[40px]'>
                    <img className=' w-full' src={projectImage.current?.value}  alt=""onClick={(e)=>{
                      document.getElementById("inputimage-project").click()
}} />
                    <input type="file" id='inputimage-project' hidden ref={projectImage} onChange={(e)=>{
                      // projectImage = URL.createObjectURL(e.target.files[0])
                      setImg_pro(e.target.files[0])
                    }

                    }
                    
                     />
                </div>
              <div className='flex flex-col w-full gap-[20px]'>
                
              <input type="text" ref={projectRepoRef} className='border px-4 py-3 w-full'
                     placeholder='Repo Link of project'/>
                     <input type="text" ref={projectliveLinkRef } className='border px-4 py-3 w-full'
                    placeholder='live link of project'/>
                    
                    
                  
                  <div className='w-full'>
                  <SubmitBtn value="add new Product" valueOnUpload="addingg" Requirments={[title , content , URLtitle]} />
                  </div>
                
              </div>
                </form>
            </div>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white]'>
                <h1 className='text-4xl font-semibold'>products</h1>
                <table className="w-full border-collapse border border-gray-300 px-[20px]">
        <thead>
          <tr className="bg-gray-100">
            <th className='w-[100px]'></th>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody className=''>



        {
  productItems.length > 0 && 
  productItems.map((item) => (
    <tr key={item._id} className='text-center border-b border-gray-500 my-[40px]'>
      <Link to={`/product/${item._id}`}>
        <td className='w-[100px]'>
          {/* <img src={item.img} alt="" /> */}
        </td>
      </Link>
      <td className="p-2">{item.title}</td>
      <td className="p-2">${item.price}</td>
      <td className="p-2">
        <i className='bi bi-three-dots-vertical' onClick={() => deleteProductHandler(item._id)}></i>
      </td>
    </tr>
  ))
}
        </tbody>
      </table>
            </div>
        </div>
    )
}

export default Dashboard