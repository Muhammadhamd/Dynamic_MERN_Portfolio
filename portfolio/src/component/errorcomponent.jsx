import react,{useEffect , useState} from "react"

function Errormsg({note , isError}){

   const [networkCheck , setNetworkCheck] = useState(window.navigator.onLine)
  

   useEffect(() => {
    const handleOnlineStatusChange = () => {
      setNetworkCheck(window.navigator.onLine);
      console.log("fasfd",networkCheck)
    };

    // Add event listeners for online/offline status changes
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    // Cleanup: remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []); 
      return(
  <>
  { isError &&
    
    <div className="absolute w-full bg-white flex justify-center items-center h-[100vh]">
      <div>
          <h1 className="2xl font-bold">{note}</h1>
          <h3></h3>
      </div>
    </div>
  
  }
  </>
        
      )
  }
  export default Errormsg