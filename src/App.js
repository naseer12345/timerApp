import { useEffect, useState } from 'react';
import './App.css';

function SettingUpTimer({ showTimerDiv, setShowTimerDiv, timerMinutes, setTimerMinutes, timerSeconds, setTimerSeconds }) {

  return (
    <div className='timerdiv'>
      <input type="number" placeholder="Minutes." onChange={(e) => setTimerMinutes(Number(e.target.value))}></input>
      <input type="number" placeholder="Seconds" onChange={(e) => setTimerSeconds(Number(e.target.value))}></input>
      <button onClick={() => setShowTimerDiv(!showTimerDiv)}>finish</button>
    </div>
  );
}

function App() {
  const [condition, setCondition] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showTimerDiv, setShowTimerDiv] = useState(false);
  const [timerStatus, setTimerStatus] = useState("No timer has been setup");

  useEffect(() => {
    if (!condition) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            return 0; 
          }
          return prevSeconds + 1; 
        });
      }, 1000);
      if (seconds>0){
      if (minutes === timerMinutes && seconds === timerSeconds) {
        setTimerStatus("Timer finished!");
        
          window.open('https://www.youtube.com/watch?v=BBJa32lCaaY', '_blank');
        
        
      }
    }
      
      return () => clearInterval(interval);
    }
  }, [condition, seconds]);

  useEffect(() => {
    if (seconds === 0 && minutes < 59) {
      setMinutes(prevMinutes => prevMinutes + 1);
    } else if (seconds === 0 && minutes === 59) {
      setMinutes(0);
      setHours(prevHours => prevHours + 1);
    }
  }, [seconds]);

  return (
    <div className='main'>
      <div className="App">
      <p>This website is not currently optamized for mobile or small screen devices i know it looks kinda shit, sorry.</p>

        <h1 className='timer'>{hours}.{minutes}.{seconds}</h1>
        <div className='buttonsdiv'>
          <button onClick={() => setCondition(!condition)}>{condition ? 'start' : 'stop'}</button>
          <button onClick={() => {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
          }}>Reset</button>
          <button onClick={() => setShowTimerDiv(!showTimerDiv)}>Set Timer</button>
        </div>
        {showTimerDiv ? <SettingUpTimer showTimerDiv={showTimerDiv} setShowTimerDiv={setShowTimerDiv} timerMinutes={timerMinutes} setTimerMinutes={setTimerMinutes} timerSeconds={timerSeconds} setTimerSeconds={setTimerSeconds} /> : <h1>{timerStatus}</h1>}
      </div>
    </div>
  );
}

export default App;
