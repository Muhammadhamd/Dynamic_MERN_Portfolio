import React, { useState , useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
function CodeSnippet({code ,  darkTheme ,lang}) {
    const [theme, setTheme] = useState(darkTheme); // Initial theme is 'light'
    const [language ,setLang] = useState(lang)
    

 console.log(code)
    //   setLang(lang)
    //   setTheme(darkTheme ? 'dark' :'light'); // Toggle between light and dark themes
    //   useEffect(()=>{

    //   },[lang])
     
    return (
      <div className='my-4'>
        
        {/* {theme === 'light' ? ( */}
          <SyntaxHighlighter  language='javascript' style={dark}>
           {code}
          </SyntaxHighlighter>
        {/* ) : (
          <DarkSyntaxHighlighter language={language} style={docco}>
            {code}
          </DarkSyntaxHighlighter> */}
        {/* )} */}
      </div>
    );
  }
  
  export default CodeSnippet;
  