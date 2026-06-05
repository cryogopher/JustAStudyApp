import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //Timer states
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(20);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreakMode, setIsBreakMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 2. The Core Countdown Engine
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      //include code here that fades out all the buttons

      interval = setInterval(() => {
        //increment down everys second
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } 

        //upon end
        else if (seconds === 0) {
          if (minutes === 0) {
            //swap modes when time runs out
            setIsActive(false);
            if (!isBreakMode) {
              setIsBreakMode(true);
              setMinutes(5); // Switch to a 5-minute break
              setSeconds(0);
            } 
            else {
              setIsBreakMode(false);
              setMinutes(45); // Switch back to 45-minute focus
              setSeconds(0);
            }
          }
          //count down minutes once seconds are all done
          else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }


    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreakMode]);

  //methods for toggling states
  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    //let user set later
    setIsActive(false);
    setMinutes(isBreakMode ? 5 : 45);
    setSeconds(0);
  };

  //Helper to keep digits looking clean (e.g., "05" instead of "5")
  const formatTime = (num: number) => String(num).padStart(2, "0");

  return (
    <div className={`app-container ${isBreakMode ? "break-theme" : "study-theme"}`}>
      {/*options overlay bc it goes before the rest of the site */}
      <div className={`options-overlay ${isMenuOpen ? "menu-active" : ""}`}>
        <div className="menu-card">
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>×</button>
          
          <h3>Configuration</h3>
          <div className="menu-divider"></div>
          
          <div className="settings-content">
            <p className="placeholder-text">Background Photo Upload coming next...</p>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className={`mode-indicator ${isActive ? "faded-out" : ""}`}>
          {isBreakMode ? "" : ""} {/*space to put text ie "break mode*/}
        </div>

        <div className={`timerDisplay ${isActive ? "timerFadeIn" : ""}`}>
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>

        {/*fade buttons */}
        {/*options button*/}
        <button className="control-btn options-action"  onClick={() => setIsMenuOpen(true)}>
            <svg viewBox="0 0 24 24" className="options-icon">
              <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.47,5.34 14.86,5.08L14.47,2.42C14.43,2.18 14.22,2 13.97,2H9.97C9.72,2 9.51,2.18 9.47,2.42L9.08,5.08C8.47,5.34 7.9,5.66 7.38,6.05L4.89,5.05C4.67,4.96 4.4,5.05 4.27,5.27L2.27,8.73C2.15,8.95 2.2,9.22 2.39,9.37L4.5,11C4.46,11.34 4.43,11.67 4.43,12C4.43,12.33 4.46,12.65 4.5,12.97L2.39,14.63C2.2,14.78 2.15,15.05 2.27,15.27L4.27,18.73C4.4,18.95 4.67,19.04 4.89,18.95L7.38,17.95C7.9,18.34 8.47,18.66 9.08,18.92L9.47,21.58C9.51,21.82 9.72,22 9.97,22H13.97C14.22,22 14.43,21.82 14.47,21.58L14.86,18.92C15.47,18.66 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
            </svg>
          </button>

        {/*pause/start button*/}
        <div className={`controls ${isActive ? "faded-out" : ""}`}>
          <button className="control-btn main-action" onClick={toggleTimer}>
            {isActive ? "pause" : "start"}
          </button>

        {/*reset button*/}
          <button className="control-btn reset-action" onClick={resetTimer}>
            <svg viewBox="0 0 24 24" className="reset-icon">
              <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
            </svg>
          </button>
        </div>
      </div>

      {/*fade text */}
      <div className={`branding ${isActive ? "faded-out" : ""}`}>
        JustAStudyApp <span className="author">by Daniel L.</span>
      </div>
    </div>
  );
}

export default App;
//npm run tauri dev 