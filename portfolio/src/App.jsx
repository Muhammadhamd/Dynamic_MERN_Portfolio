import react from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from "./component/adminlogin";
import PostPage from './component/post.jsx'
import Home from "./home";
function App(){

  return(
    <Router>
     
      <Routes>
        <Route exact path='/' element={<Home />} />
         <Route path='/admin' element={<Adminlogin />} />
         <Route path='/post/:postId' element={<PostPage />} />
      </Routes>
    </Router>
  )
}
export default App