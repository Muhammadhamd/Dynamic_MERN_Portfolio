import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/context";

function WarningModal({ onConfirm, message, showModal }) {
  const { state, dispatch } = useContext(GlobalContext);
  const {openModal , setOpenModal} = useState(showModal)
  console.log("fafaf")
  useEffect(()=>{

  },[openModal])
  return (
    <>
      {openModal && (
        <div className={`max-w-[300px] left-0 right-0 absolute rounded shadow top-[30px] mx-[auto] p-[20px] ${state?.theme ? "bg-gray-800" : "bg-white"}`}>
          <h1>Are you sure {message}</h1>
          <div className="mt-[5px]">
            <button onClick={onConfirm} className="text-white bg-[#ff000094] mr-[10px] rounded shadow px-4 py-2">
              Sure!
            </button>
            <button onClick={setOpenModal(false)} className="text-white bg-violet-500 rounded shadow px-4 py-2">
              No!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WarningModal;
