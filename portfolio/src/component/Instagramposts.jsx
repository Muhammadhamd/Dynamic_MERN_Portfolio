import react, {useEffect , useState} from "react"
import instafeed from 'instafeed.js';

function InstafeedComponent(){
  const [post , setPost] = useState()
  const feed = new instafeed({
    limit: 3,
    template:`
 
<div class="relative w-full max-w-[400px] overflow-hidden h-[400px] projectbox">
<div class="w-full  h-[400px]  flex flex-col justify-between items-center overflow-hidden ">
<img class="w-full" src="{{image}}" alt="">
</div>
<div class=" absolute w-full bg-[#00000075] p-[20px] text-white bottom-[0px] hoverbox">
<p>{{caption}}</p>
<h1 class="flex items-center font-semibold text-violet-100 gap-[3px]"><a href="{{link}}">Let's check it out <i class="fa fa-arrow-right"></i></a></h1></div></div>`,
target: "instaposth",
accessToken: 'IGQWRPemt5MVVoX1Yzb2p6UzQ1MjJjaFVWV2loSkQwRWVnZAU5PVDJHODktOV9FSmhKOVdnSW93ZAURFeVdzcDV3ekdmeW1samhsSWZAhVktqQWZABX0xNejFlNTNIT0lVeXpMVDZAMVmVMM0RyYm9fcHBxX1F2R0ZArcFUZD',



})
 useEffect(()=>{

feed.run();

 },[])
  return(
    <div className='my-10 md:px-[124px]'>
     <h1 className='font-bold text-[32px] mb-8 border-b-[6px] max-w-[250px] border-violet-700 text-[#BC7AFF]'>Instagram Posts</h1>
    <div className="w-full flex flex-wrap gap-[20px] justify-center" id="instaposth">

    </div>
    </div>

  )
}
export default InstafeedComponent