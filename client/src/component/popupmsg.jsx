import React, { useState, useEffect } from 'react';

function PopUpMsg({ message, status }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Automatically hide the pop-up after 3 seconds
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 ${visible ? 'block' : 'hidden'}`}>
      <div className={`bg-white max-w-300px rounded-10px shadow-xl p-10`}>
        <h1
          className={`${
            status === 401 || status === 400 || status === 402 || status === 403
              ? 'text-yellow'
              : (status === 200 || status === 201 || status === 300)
              ? 'text-black'
              : status === 404
              ? 'text-red'
              : ''
          }`}
        >
          {message}
        </h1>
      </div>
    </div>
  );
}

export default PopUpMsg;
