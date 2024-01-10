import react, { useContext, useEffect, useRef, useState } from "react";
import Editorcss from "../css/RTE.css";
import JoditEditor from 'jodit-react';
import axios from "axios";
import SubmitBtn from "./submitbtn";

function AddArticle(params) {
  const [title, settitle] = useState("");
  const editor = useRef(null);

    const [articlecontent, setArticleContent] = useState('');
	const [articleModifiedContent, setArticleModifiedContent] = useState('');
  const [Articleimage, setArticleimage] = useState(null);
  const [URLtitle, setURLtitle] = useState("");
  const [Articleimg, setArticleImg] = useState();
  const [content, setContent] = useState("");
    const AddProducthandler = (e) => {
        e.preventDefault();
    
        
    
        const formdata = new FormData();
        formdata.append("Heading", title);
        formdata.append("content", articleModifiedContent);
    
        formdata.append("setUrl", URLtitle);
        formdata.append("image", Articleimg);
        axios
          .post("/post", formdata, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    const RemoveExpression = (textContent) => {
        setArticleContent(textContent)
        setArticleModifiedContent(
          textContent.replace(/&lt;|&gt;|&amp;lt;|&amp;gt;|</g, (match) => {
            switch (match) {
              case '&lt;':
              case '&amp;lt;':
                return '<';
              case '&gt;':
              case '&amp;gt;':
                return '>';
              default:
                return match;
            }
          })
        );
      };
      const RemoveExpressionAgain = (textContent) => {
        setArticleContent(textContent)
        setArticleContent(
          textContent.replace(/&lt;|&gt;|&amp;lt;|&amp;gt;|</g, (match) => {
            switch (match) {
                case '<':
                  return '&lt;';
                case '>':
                  return '&gt;';
                default:
                  return match;
              }
          })
        );
      };
      const EditPostHandler = async(e) =>{
        e.preventDefault()
        try {
        const formdata = new FormData();
        formdata.append("Heading", title);
        formdata.append("content", articleModifiedContent);
    
        formdata.append("setUrl", URLtitle);
        formdata.append("image", Articleimg);
            const res = await axios
            .put(`/editArticle/${new URLSearchParams(window.location.search).get("edit")}`, formdata, {
                withCredentials: true,
              })
        } catch (error) {
            console.log(error)
        }
      }


      useEffect(()=>{
        if (new URLSearchParams(window.location.search).get("edit")?.length) {
            console.log(new URLSearchParams(window.location.search).get("edit"))
          
          axios.get(`/ToEditPost/${new URLSearchParams(window.location.search).get("edit")}`)
          .then((res)=>{
            console.log(res.data)
            setArticleModifiedContent(res.data.content)
            // RemoveExpressionAgain(res.data.content)
            setArticleContent(res.data.content)
            settitle(res.data.heading)
            setURLtitle(res.data.ArticleUrl)
          })
          .catch((error)=>{console.log(error)})
        
        }
      },[new URLSearchParams(window.location.search).get("edit")])
    return(
        <>
        <div className=" max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl">
          <h1 className="text-4xl font-semibold">Add a Article</h1>
          <form onSubmit={new URLSearchParams(window.location.search).get("edit")?.length ? EditPostHandler : AddProducthandler}>
            <div className="flex justify-center h-[80px] my-[10px] w-[40px]">
              <img
                className=" w-full"
                src={Articleimage}
                alt=""
                onClick={(e) => {
                  document.getElementById("inputArticleimage").click();
                }}
              />
              <input
                type="file"
                id="inputArticleimage"
                hidden
                onChange={(e) => {
                  setArticleimage(URL.createObjectURL(e.target.files[0]));
                  setArticleImg(e.target.files[0]);
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-[20px]">
              <input
                type="text"
                value={title}
                className="border px-4 py-3 w-full"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                placeholder="title...."
              />
              <input
                type="text"
                value={URLtitle}
                className="border px-4 py-3 w-full"
                onChange={(e) => {
                  setURLtitle(e.target.value);
                }}
                placeholder="add a unique title for Url"
              />

              {/* <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={content}
                className="border px-4 py-3 w-full"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="add content"
              ></textarea> */}
              <JoditEditor
         
         ref={editor}
         value={articlecontent}
         onChange={newContent => {RemoveExpression(newContent)}}
         
       />
              <div className="w-full">
                <SubmitBtn
                  value={`${new URLSearchParams(window.location.search).get("edit")?.length ? 'EDit Article' : "Upload Article"}`}
                  valueOnUpload="addingg"
                />
              </div>
            </div>
          </form>
        </div>
         
{articleModifiedContent}
        </>
    )
}
export default AddArticle