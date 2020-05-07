import React, { useState, useEffect } from 'react';
import './Timer.css'

const useTimer = (props) => {
  const [timeLeft, setTimeLeft] = React.useState(props.time)
  const [isActive, setIsActive] = React.useState(true)

  React.useEffect(() => {
    let interval = null;
    if(timeLeft > 0 && isActive) {
      interval = setInterval(() => {
        setTimeLeft( timeLeft => timeLeft - 1);
      }, 1000)
    } else if ( timeLeft === 0 && isActive){
        clearInterval(interval)
        toggle()
    } else if (timeLeft === 0 && !isActive && props.gameActive){
      setTimeLeft( timeLeft => 30)
      setIsActive( isActive => true)
    }
    return () => clearInterval(interval)
  }, [timeLeft, isActive])

  function toggle(){
    setIsActive(!isActive)
  }

    return [timeLeft, isActive]
};

export default useTimer;
