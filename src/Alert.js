import React from 'react'
import { useAppContext } from './context';

function Alert() {
    const { err_message } = useAppContext();
    const handleClick = e => {
        document.getElementById("alrt").style.display="none";
    }
    
  return (
    <div className='alert' id="alrt">
        <button onClick={handleClick}>X</button>
        <p>{err_message}</p>
    </div>
  )
}

export default Alert