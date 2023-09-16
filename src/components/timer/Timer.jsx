import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [open,setOpen] = useState(false)

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };
  const Edit = () =>{
    setOpen(!open)
    if(!open){
        setIsActive(false);
    }else{
        setIsActive(true)
    }
  }

  return (
    <div className='timer container'>
    
      <div>
        
      <h1>{seconds}s</h1>
      <button onClick={toggle}>{isActive ? 'Stop' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={Edit}>Edit</button>
     {
        open &&  <div className="inputBox">
        <input type="number" name="" id="" value={seconds===0?null:seconds} onChange={(e)=>setSeconds(+e.target.value)}/>
      </div>
     }
      </div>
    </div>
  );
}

export default Timer;
