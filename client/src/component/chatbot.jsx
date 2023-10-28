import react, { useEffect, useState } from "react"
import { useRef } from "react"
import axios from 'axios'

function ChatBot(){
  const baseURL = process.env.PORT || 'http://localhost:5000'
    const MessageRef = useRef(null)
    const [messages , setMessages] = useState([])
    const [chatToggle , setChatToggle] = useState(false)
    const [chatTypingEffect , setChatTypingEffect] = useState(false)

    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    const sendMessagehandler = async(e)=>{
        e.preventDefault()
         const messageToSend = MessageRef.current.value;
         if (messageToSend === "") {
          // Check if the message is empty
          return; // Exit the function without sending an empty message
        }
        setChatTypingEffect(true)
        const newMessage = {
            role:"user",
            Message:messageToSend
        }
        setMessages((messages)=>[...messages , newMessage])
        MessageRef.current.value = "";
         axios.post(`/Chatbot-message`,{
            message:messageToSend
        })
        .then((res)=>{
            console.log(res)
            const newbotMessage = {
                role:"Bot",
                Message:res.data.aiResponse
            }

        setChatTypingEffect(false)
        setMessages((messages)=>[...messages , newbotMessage])
        
            
        })
        .catch((e)=>{
          console.log(e)
          const newbotMessage = {
                role:"Bot",
                Message:e.message
            }
        setMessages((messages)=>[...messages , newbotMessage])
            
        setChatTypingEffect(false)

        })
        .finally(()=>{
          scrollToBottom()
        })
        
    }

    useEffect(()=>{
        scrollToBottom();
        
    },[messages])
    
    return(

        <div className={`min-[500px]:max-w-[350px] w-full min-[500px]:max-h-[500px] ${chatToggle ? 'h-[100vh]' : 'h-[40px]'} w-full fixed min-[500px]:right-[30px] bg-white z-[3000] transition ease-in-out bottom-[0px]`}>
            <div className="text-white text-center bg-[#191818] py-[9px]">
                <button
                onClick={()=>{
                   chatToggle ? setChatToggle(false) :setChatToggle(true)
                }}
                >{`${chatToggle ? 'Close':'Open'} The Chat `}</button>
             </div>
        <div className=" flex flex-col justify-between h-[95%]">
                <div className="h-[100%] flex flex-col bg-[#efefef] overflow-auto"
                ref={chatContainerRef}
                >
                   
           <>
           {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "Bot"
                    ? "my-4 flex justify-start"
                    : "my-4 flex justify-end"
                }
              >
                <div
                  className={`p-[10px] rounded-lg max-w-[300px] break-words  shadow ${
                    message.role === "Bot"
                      ? "text-black bg-white ml-4"
                      : "text-white bg-violet-700 mr-4"
                  }`}
                >
                  {message.Message}
                </div>
              </div>
            ))}
           </>
            <>
            {
              chatTypingEffect &&  <div className={ "my-4 flex justify-start"}
            >
              <div
                className={`p-[10px] rounded-lg max-w-[300px]  shadowtext-black bg-white ml-4`}
              >
               ...
              </div>
            </div> 
            }
            </>
                </div>
                <div className="border-t border-2 p-[5px] mb-[20px]">
                    <form onSubmit={sendMessagehandler}> 
                        <input type="text" ref={MessageRef} placeholder="write your Message here.." className="outline-none w-[90%] py-2 px-3"/>
                        <button ><i className="fa fa-send"></i></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ChatBot