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
accessToken: process.env.Instatoken,
// 'IGQWROVFREUEpHbmxMQmZAJNGJJMGFlZAkRRNHFjOXNGallGVGJJRXlPb2J5ZAzNBVXN0UXdvUUlkQ216eW96ejQ4dWpTWWpvalFuMTMtSUMtemtkSGU2V3p2eHl4V3pEanV4Ukx3MmVNbm5Jcnp6TlEzMFpMYTlJbGMZD'


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