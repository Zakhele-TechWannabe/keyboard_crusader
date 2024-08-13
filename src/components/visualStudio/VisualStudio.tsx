import React, { useEffect, useState } from "react";
import "../../styles/visualStudio.css";
import {
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  BugOutlined,
  BuildOutlined,
  FileAddOutlined,
  BulbOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { PlaySquareIcon } from "lucide-react";
import { Drawer, Flex, message, Modal, Popconfirm, Popover, Switch } from "antd";
import { Instructions } from "../instructions";
import { useRouter } from "next/navigation";
import Completion from "../completion/completion";
import Tasks from "../tasks/tasks";

interface Task {
  task: string;
  hint: string;
  code: string;
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}

const VisualStudio: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(true);
  const [hint, setHint] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [task2ModalOpen, setTask2ModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [volume, setVolume] = useState(0.5); // Initialize volume state
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // Only initialize `localStorage` and `Audio` on the client side
  const userId = typeof window !== "undefined" ? localStorage.getItem('user') : null;
  const settings = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('gameSettings') || '{}') : {};
  const soundEffectsEnabled = settings.sound ?? true;
  const backgroundMusicEnabled = settings.music ?? true;
  const backgroundMusicVolume = settings.volume ?? 0.5;

  // Audio instances, only defined if `window` is available
  let keySound: HTMLAudioElement | undefined;
  let correctSound: HTMLAudioElement | undefined;
  let incorrectSound: HTMLAudioElement | undefined;
  let backgroundSound: HTMLAudioElement | undefined;

  if (typeof window !== "undefined") {
    keySound = new Audio('/assets/sound/keyboard.mp3');
    correctSound = new Audio('/assets/sound/correct.mp3');
    incorrectSound = new Audio('/assets/sound/incorrect.mp3');
    backgroundSound = new Audio('/assets/sound/pursuer.mp3');

    keySound.volume = backgroundMusicVolume;
    correctSound.volume = backgroundMusicVolume;
    incorrectSound.volume = backgroundMusicVolume;
    backgroundSound.volume = backgroundMusicVolume;
  }

  useEffect(() => {
    if (backgroundSound && backgroundMusicEnabled) {
      backgroundSound.loop = true;
      backgroundSound.play();
    } else if (backgroundSound) {
      backgroundSound.pause();
    }

    return () => {
      if (backgroundSound) {
        backgroundSound.pause();
        backgroundSound.currentTime = 0; // Reset the sound
      }
    };
  }, [backgroundMusicVolume, backgroundMusicEnabled]);

  const [playerLevel, setPlayerLevel] = useState<number>(() => {
    const storedLevel = typeof window !== "undefined" ? localStorage.getItem('playerLevel') : null;
    return storedLevel ? parseInt(storedLevel, 10) : 1;
  });

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem('theme') : 'dark';
    setIsDarkMode(savedTheme === 'dark');

    const fetchTasks = async () => {
      try {
        const response = await fetch(`https://keyboard-crusader-backend.onrender.com/api/getTasksByLevel?level_id=${playerLevel}`);
        const data = await response.json();
        
        if (data.tasks && data.tasks.length > 0) {
          setTasks(data.tasks);
          setCode(data.tasks[0].code || "");
          setTaskIndex(0);
        } else {
          console.error('No tasks found in the response');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();

    const openFullscreen = () => {
      const elem = document.documentElement;
      if (elem && elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    };

    openFullscreen();
  }, [playerLevel]);

  const handleNextLevel = () => {
    const nextLevel = playerLevel + 1;
    setPlayerLevel(nextLevel);
    if (typeof window !== "undefined") {
      localStorage.setItem('playerLevel', nextLevel.toString());
    }
    setTaskIndex(0);
    setModalOpen(false);
  };

  const logAttempt = async (success: boolean, score: number) => {
    if (!userId) return;
    try {
      const response = await fetch('https://keyboard-crusader-backend.onrender.com/api/addAttempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          attempt_type: 'story-line',
          start_time: new Date().toISOString(),
          end_time: new Date().toISOString(),
          success,
          score,
          level_id: playerLevel,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Attempt logged:', data);
      } else {
        console.error('Failed to log attempt');
      }
    } catch (error) {
      console.error('Error logging attempt:', error);
    }
  };

  const logAction = async (actionType: string, details: string) => {
    try {
      const response = await fetch('https://keyboard-crusader-backend.onrender.com/api/addAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attempt_id: 1,
          action_type: actionType,
          timestamp: new Date().toISOString(),
          details,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Action logged:', data);
      } else {
        console.error('Failed to log action');
      }
    } catch (error) {
      console.error('Error logging action:', error);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    logAction('code_edit', 'User edited the code');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault(); // Prevent browser shortcuts from interfering
  
    if (soundEffectsEnabled && keySound) {
      keySound.play();
    }

    if (timeoutId) {
      clearTimeout(timeoutId); // Cancel the previous timeout if a new key is pressed
    }

    const newTimeoutId = setTimeout(() => {
      checkTaskCompletion(e);
    }, 300); // Wait for 300ms before checking for task completion

    setTimeoutId(newTimeoutId);
  };

  const checkTaskCompletion = (e: KeyboardEvent) => {
    let taskCompleted = false;
    const currentTask = tasks[taskIndex];
  
    if (
      e.key.toLowerCase() === currentTask?.key.toLowerCase() &&
      e.ctrlKey === !!currentTask?.ctrl &&
      e.shiftKey === !!currentTask?.shift &&
      e.altKey === !!currentTask?.alt
    ) {
      taskCompleted = true;
    }

    if (taskCompleted) {
      handleTaskCompletion();
    } else {
      //handleTaskFailure();
    }
  };

  const handleTaskCompletion = () => {
    if (soundEffectsEnabled && correctSound) {
      correctSound.play(); 
    }

    if (taskIndex < tasks.length - 1) {
      setCode(tasks[taskIndex + 1].code);
      setScore((prev) => prev + 100);
      message.success('Task Completed!');
      logAttempt(true, score + 100);
      setTaskIndex((prev) => prev + 1);
      setOpen(true);
    } else {
      setScore((prev) => prev + 100);
      setModalOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    }
  };

  const navigate = (path: string) =>{
    router.push(path);
  }

  const vsContainerStyle = open ? "vs-container-open" : "vs-container";

  const handleTask2ModalOk = () => {
    setTask2ModalOpen(false);
    message.success('New item added successfully!');
  };

  const toggleTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    let newTheme = savedTheme === "dark" ? "light" : "dark";
    if (newTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={vsContainerStyle} style={isDarkMode ? styles.dark : styles.light}>
      {/* Main Toolbar */}
      <div className="vs-toolbar" style={isDarkMode ? styles.dark : styles.light}>
        <div className="vs-toolbar-left" style={isDarkMode ? styles.dark : styles.light}>
          <button>File</button>
          <button>Edit</button>
          <button>View</button>
          <button>Project</button>
          <button>Build</button>
          <button>Debug</button>
          <button>Extensions</button>
          <button>Help</button>
        </div>
        <div className="vs-toolbar-right" style={isDarkMode ? styles.dark : styles.light}>
          <Switch
            style={isDarkMode ? styles.toggledark : styles.togglelight}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <div className="vs-profile" onClick={() => setOpen(true)}>
            {
              open ? (<>
              </>) : (<>
                <PlayCircleOutlined style={{ color: "green", padding: "0 3px" }} />
                <span className="vs-profile-name">Resume</span>
              </>)
            }
          </div>
        </div>
      </div>

      {/* Second Toolbar with Icons */}
      <div className="vs-toolbar" style={isDarkMode ? styles.dark : styles.light}>
        <button>
          <SaveOutlined style={{ color: 'lightblue' }} /> Save
        </button>
        <button style={{ display: 'flex', alignItems: 'center' }}>
          <PlaySquareIcon style={{ color: 'lightgreen' }} /> IIS Express
        </button>
        <button>
          <UndoOutlined style={{ color: 'orange' }} /> Undo
        </button>
        <button>
          <RedoOutlined style={{ color: 'orange' }} /> Redo
        </button>
        <button>
          <BugOutlined style={{ color: 'red' }} /> Debug
        </button>
        <button>
          <BuildOutlined style={{ color: 'purple' }} /> Build
        </button>
        <button title="addFile">
          <FileAddOutlined style={{ color: 'lightblue' }} />
        </button>
      </div>

      <div className="vs-content" style={isDarkMode ? styles.dark : styles.light}>
        <div className="vs-project-explorer" style={isDarkMode ? styles.dark : styles.light}>
          <h3>Project Explorer</h3>
          <ul>
            <li>Solution `MyProject`</li>
            <ul>
              <li>MyProject</li>
              <ul>
                <li>Program.cs</li>
                <li>App.xaml</li>
              </ul>
            </ul>
          </ul>
        </div>

        <div className="vs-code-editor" style={isDarkMode ? styles.dark : styles.light}>
          <textarea title="textArea" value={code} onChange={handleCodeChange} className="vs-textarea" style={isDarkMode ? styles.dark : styles.light} />
        </div>
      </div>
      <div className="vs-status-bar">
        <div>Ln 1, Col 1</div>
        <div style={{ fontSize: 20 }}>Score: {score}</div>
        <div>No Errors</div>
        <Popover
          title="Hint"
          open={hint}
          content={tasks[taskIndex]?.hint}
        >
          <button onMouseOver={() => setHint(true)} onMouseLeave={() => setHint(false)}>
            Hint <BulbOutlined style={{ color: 'yellow' }} />
          </button>
        </Popover>
      </div>
      <Modal title='DevOps' open={modalOpen} width='80%' onCancel={()=> setModalOpen(false)} onOk={handleNextLevel} okText={'Next Item'}>
        <Completion/>
      </Modal>
      <Tasks
        visible={task2ModalOpen}
        onOk={handleTask2ModalOk}
        onCancel={() => setTask2ModalOpen(false)}
      />
      <Drawer closable={false} onClose={() => setOpen(false)} open={open} style={{ backgroundColor: '#003366' }}>
        <Instructions task={tasks[taskIndex]?.task} />
        <Flex align="right" justify="flex-end" style={{ bottom: 5, position: 'absolute', right: 5 }}>
          <button
            style={{ width: 60, backgroundColor: 'yellow', borderRadius: 5, border: '1px solid white', margin: '0px 5px' }}
            onClick={() => setOpen(false)}
          >
            Pause
          </button>
          <Popconfirm
            title="Quit Game"
            onConfirm={() => navigate('/desktop')}
            description="Are you sure you want to quit?"
          >
            <button
              style={{ width: 60, backgroundColor: 'red', borderRadius: 5, border: '1px solid white', color: '#fff' }}
            >
              Quit
            </button>
          </Popconfirm>
        </Flex>
      </Drawer>
    </div>
  );
};

export default VisualStudio;

const styles = {
  dark: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4"
  },
  light: {
    backgroundColor: "#ffffff",
    color: "#000"
  },
  toggledark: {
    padding: "0px",
    backgroundColor: "#000",
    color: "#fff"
  },
  togglelight: {
    padding: "0px",
    backgroundColor: "#fff",
    color: "#000"
  }
};
