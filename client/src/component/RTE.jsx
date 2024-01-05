import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  const onChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    localStorage.setItem('editorContent', JSON.stringify(convertToRaw(contentState)));
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // Custom block styles for H1 and H2
  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'editor-h1';
    } else if (type === 'header-two') {
      return 'editor-h2';
    }
    return null;
  };

  return (
    <div>
      <button onClick={() => toggleBlockType('header-one')}>H1</button>
      <button onClick={() => toggleBlockType('header-two')}>H2</button>
      <button onClick={() => toggleBlockType('unstyled')}>P</button>
      <button onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
      <button onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
      <button onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>

      <div className="editor-container">
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  );
};

export default MyEditor;

// Internal CSS styles
const styles = `
  .editor-h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
  }

  .editor-h2 {
    font-size: 20px;
    color: #555;
    margin-bottom: 14px;
  }

  .editor-container {
    border: 1px solid #ddd;
    padding: 8px;
    minHeight: 100px;
  }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
