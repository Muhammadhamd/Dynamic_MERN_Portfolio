import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const MyEditor = ({ content }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	
	return (
		<>
    <JoditEditor
			ref={editor}
			value={content}
			onChange={newContent => {setContent(newContent)}}
		/>
    
    
	);
};
export default MyEditor
