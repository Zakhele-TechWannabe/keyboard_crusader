import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import "@/styles/desktop.css";
import useSound from 'use-sound';  
import Link from "next/link";
import { Flex } from "antd";

const mouseClickUrl = '/assets/sound/mouse-click.mp3';

const Desktop: React.FC = () => {
  const [playMouseClick] = useSound(mouseClickUrl);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const router = useRouter();

  useEffect(() => {

    const openFullscreen = () => {
      const elem = document.documentElement;

      if (elem && elem.requestFullscreen) {
          elem.requestFullscreen();
      } 
  };

  // Open full screen when the component mounts
  openFullscreen();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path: string) => {
    playMouseClick();
    setTimeout(() => {
      router.push(path);
    }, 600); 
  };

  return (
    <div className="desktop-container">
      <div className="desktop-icons">
      
       <Flex>
       <div>
       <div className="desktop-icon" onClick={() => handleNavigation('/visualstudio')}>
          <img src="/images/gameLogo.png" alt="Start Game" />
          <p>Visual Studio</p>
        </div>
        <div className="desktop-icon" onClick={() => handleNavigation('/leaderboard')}>
          <img src="/images/score1.png" alt="Leaderboard" />
          <p>Leaderboard</p>
        </div>
        <div className="desktop-icon" onClick={() => handleNavigation('/settings')}>
          <img src="/images/settings2.png" alt="Settings" />
          <p>Settings</p>
        </div>
        <div className="desktop-icon" onClick={() => handleNavigation('/help')}>
          <img src="/images/help1.png" alt="Help" />
          <p>Help</p>
        </div>
        <div className="desktop-icon" onClick={() => handleNavigation('/')}>
          <img src="/images/exit2.png" alt="Quit Game" />
          <p>Log Out</p>
        </div>
       </div>
       <div>
       <div className="desktop-icon" style={{marginLeft: 50}}>
         <Link href={'https://www.shesha.io/'} target="_blank"><img src="/images/favicon.png" alt="Visual Studio" /></Link> 
          <p>Shesha</p>
        </div>
       </div>
       </Flex>
      </div>

      <div className="taskbar">
        <div className="start-button">
          <img src="/images/windowsLogo.png" alt="Start" />
          <span>Start</span>
        </div>
        <div className="task-icons"></div>
        <div className="time">{currentTime}</div>
      </div>
    </div>
  );
};

export default Desktop;
