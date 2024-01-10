import React, { useState, useEffect, useRef } from "react";
import Navcomponent from "./navbar";
import axios from "axios";
import imgprd from "../img/productjeans1.jpg";
import { Link , useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const dataarray = [25, 626, 62, 6, 74, 673, 6, 37, 45, 74];
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [addressForm, setAddressForm] = useState(true);
  const [addressData, setAddressData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const addresscityRef = useRef()
  const addresscountryRef = useRef()
  const messageRef = useRef()
  const addressExectRef = useRef()
  const userLoginCheckHandler = async() =>{

    try {
      const res = await axios.get("/currentuser",{
        withCredentials: true,
      })
      setIsLogin(true)
      setData(res.data)
    } catch (error) {
      setIsLogin(false)
      navigate('/login')
    }
  }

  const SelectedHandler = (selected) => {
    setSelectedData(selected);
  };

  useEffect(() => {
    userLoginCheckHandler();

  }, [isLogin]);
  useEffect(()=>{
  },[addressData])
  useEffect(()=>{
  },[messageData])
  return (
    <div>
      <Navcomponent islogin={isLogin} img={data.image} />
      <div className="flex bg-[#f5f7f9]">
        <div className="h-auto max-w-[300px] py-[15px] px-[40px] bg-[#1a52f3]">
          <div className="w-full flex justify-center mt-[30px]">
          <div className="overflow-hidden w-[110px] h-[110px] rounded-full">
              <img src={data.image} alt="nodp" />
          </div>
          </div>
          <div className="text-center">
            <h1 className="font-semibold text-white text-2xl">{data.name}</h1>
            <h3 className="text-base text-violet-50">{data.email}</h3>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col ml-[20px]">
          <div className="flex gap-[30px] mt-[40px]">
            <div
              style={{
                backgroundColor: selectedData === "orders" ? "blue" : "white",
                color: selectedData === "orders" ? "white" : "black",
              }}
              className={`shadow rounded-lg p-[20px] max-w-[300px] w-[400px]  h-[150px] flex flex-col justify-between`}
              onClick={() => SelectedHandler("orders")}
            >
              <h1 className=" font-semibold mt-[10px] text-xl">Total Orders</h1>
              <div>
                <h1>This month <span>+5</span></h1>
                <h1>+23</h1>
              </div>
            </div>
            <div
              style={{
                backgroundColor: selectedData === "reviews" ? "blue" : "white",
                color: selectedData === "reviews" ? "white" : "black",
              }}
              className={`shadow rounded-lg p-[20px] max-w-[300px] w-[400px]  h-[150px] flex flex-col justify-between`}
              onClick={() => SelectedHandler("reviews")}
            >
              <h1 className=" font-semibold mt-[10px] text-xl">Your reviews</h1>
              <div>
                <h1>This month <span>+5</span></h1>
                <h1>+23</h1>
              </div>
            </div>
            <div
              style={{
                backgroundColor: selectedData === "messages" ? "blue" : "white",
                color: selectedData === "messages" ? "white" : "black",
              }}
              className={`shadow rounded-lg p-[20px] max-w-[300px] w-[400px]  h-[150px] flex flex-col justify-between`}
              onClick={() => SelectedHandler("messages")}
            >
              <h1 className=" font-semibold mt-[10px] text-xl">
                Messages from Saler
              </h1>
              <div>
                <h1>This month <span>+5</span></h1>
                <h1>+23</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-[30px] my-[40px]">
            <div
              className="shadow rounded-lg bg-white p-[20px]  w-full max-w-[630px]  h-[350px] flex flex-col "
            >
              <div className="md:mx-[20px] mt-[10px]">
                <h1 className="text-xl font-semibold border-b pb-2">
                  {selectedData}
                </h1>
              </div>
              <div className="overflow-y-scroll">
                { selectedData === "orders" ?
                dataarray.map(() => (
                  <div className="flex  w-full border-b p-[10px] items-center bg-white hover:bg-[#f9f9f9]">
                    <img className="w-[60px]" src={imgprd} alt="" />
                    <h1 className=" md:ml-[30px] max-w-[200px] w-full font-semibold">
                      New Men's Jeanse
                    </h1>
                    <h3 className="md:ml-[30px] max-w-[60px] w-full ">4</h3>
                    <h3 className="md:ml-[30px] max-w-[100px] w-full">$400</h3>
                    <h1 className="font-semibold md:ml-[30px] max-w-[70px]">
                      Pending
                    </h1>
                  </div>
                ))
             : selectedData === "reviews" ? 
               dataarray.map(()=>[
                <Link>
                <div className="flex  w-full border-b p-[10px] items-center bg-white hover:bg-[#f9f9f9]">
                   <img className="w-[60px]" src={imgprd} alt="" />
                  <div className="md:ml-[30px] max-w-[400px]"> 
                   <div className="text-slate-500 text-sm my-[2]"> 4 days ago</div>
                  <h1 className="  w-full font-semibold">New Men's Jeanse
                   </h1>
                   <p>wooooowwww this product is really good i love it i will buy this.....</p>
                  </div>
                  <div>
                   <button>
                       <i className="fa fa-remove"></i>
                   </button>
                  </div>
                 </div>
               </Link>
               ])
             : selectedData === "messages" ?
             <div >
                <div className="h-[200px]">

               { messageData.map((message) => (
  <div className={`flex my-4 mx-2 ${message.role === "admin" ? "justify-start" : "justify-end"}`}>
    <h1 className={`rounded-[15px] p-[7px] shadow ${message.role === "admin" ? "bg-slate-200 text-black" : "bg-violet-300 text-white"}`}>
      {message.message}
    </h1>
  </div>
))}
                  
                </div>
               <div className="flex justify-center"
               onSubmit={(e)=>{
                e.preventDefault()
                 const newmessage = {
                    role:"client",
                    message:messageRef.current.value,
                    timestamp:Date.now()
                 }
                  setMessageData([...messageData , newmessage])
               }}
               >
               <form className="flex  md:w-[400px] w-full border my-[5px]">
                <input type="text" className="px-6 py-2 outline-none w-full"  placeholder="write message here...."
              ref={messageRef}
              />
              <input className="px-3 py-2 text-white bg-violet-500 font-semibolf" type="submit" value="send" />
                </form>
               </div>
             </div>
             : selectedData === 'notification' ?
             <div></div>
             : selectedData === "Address" ?
           (addressForm && addressData.length ) ?
              
              <div className="flex gap-[15px] flex-wrap justify-center">
                {( addressData?.map((data, index)=>[
                <div className="shadow-lg rounded p-[15px] w-full max-w-[240px] ">
                    <h1>{data.city|| 'karachi'} {data.country || "pakistan"}</h1>
                    <p>{data.exect || "nagan chwrangi latif nagar north karachi 11-c-1  Plot R135"}</p>
                    <button  key={index}
                    onClick={()=>{
                        const listcopy = [...addressData]
                        listcopy.splice(index , 1)
                        setAddressData(listcopy)
                    }}
                    >delete</button>
                </div>
               ]))}
               <div>
               <input type="submit" className="px-6 py-2 bg-violet-500 text-white font-semibold rounded shadow" value='Add Address' onClick={()=>{
                setAddressForm(false)

               }}/>
                
               </div>
              </div>
              :
              <form className="p-[20px]"
              onSubmit={(e)=>{
                e.preventDefault()
                if (!addresscityRef.current.value ||!addresscountryRef.current.value || !addressExectRef.current.value) {
                    return
                }
                const newAddress ={
                    city:addresscityRef.current.value,
                    country:addresscountryRef.current.value,
                    exect:addressExectRef.current.value
                }
                console.log(newAddress)
                setAddressData([...addressData , newAddress])
                setAddressForm(true)
              }}
              >
              <input type="text" className="px-6 py-2 w-full border outline-none my-[5px]"  placeholder="Your country"
              ref={addresscountryRef}
              />
              <input type="text" className="px-6 py-2 w-full border outline-none my-[5px]"  placeholder="Your City"
              ref={addresscityRef}
              />
              <textarea className="px-6 py-2 w-full border outline-none my-[5px]" id=""
              ref={addressExectRef}
              ></textarea>
              <input type="submit" className="px-6 py-2 bg-violet-500 text-white font-semibold rounded shadow" value='Add Address'
               
               />
             </form>
             
              : null
              
              }
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div
                style={{
                  backgroundColor:
                    selectedData === "notification" ? "blue" : "white",
                  color: selectedData === "notification" ? "white" : "black",
                }}
                className={`shadow rounded-lg p-[20px] max-w-[300px] w-[400px]  h-[150px] flex flex-col justify-between`}
                onClick={() => SelectedHandler("notification")}
              >
                <h1 className=" font-semibold mt-[10px] text-xl">
                  Notifications
                </h1>
                <div>
                  <h1>This month <span>+5</span></h1>
                  <h1>+23</h1>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: selectedData === "Address" ? "blue" : "white",
                  color: selectedData === "Address" ? "white" : "black",
                }}
                className={`shadow rounded-lg p-[20px] max-w-[300px] w-[400px]  h-[150px] flex flex-col justify-between`}
                onClick={() => SelectedHandler("Address")}
              >
                <h1 className=" font-semibold mt-[10px] text-xl">Your address</h1>
                <div>
                  <h1>This month <span>+5</span></h1>
                  <h1>+23</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
