import react from "react"



function PopUpMessage({message , theme}){

    return (
        <div className={`rounded-full shadow-lg py-4 px-8 mb-[30px]  font-semibold max-[400px]:text-[18px] max-[420px]:px-6 max-[400px]:py-3 text-xl ${theme ? 'text-white bg-gray-800' : 'text-[#5333F2] bg-white'}`}>{message}</div>
    )
}


export default PopUpMessage