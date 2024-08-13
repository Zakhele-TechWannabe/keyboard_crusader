import React from 'react';
import './styles/help.css';
import BackButton from '@/components/backButton';

const Help: React.FC = () => {
    return (
        <>
        <div style={{padding: '20px'}}>
        <BackButton/>
        </div>
        <div className="help-container">
            <h1 className="help-title">How to Play Keyboard Crusader</h1>
            <p className="help-paragraph">
                Welcome to <strong>Keyboard Crusader</strong>! This game is designed to help you master keyboard shortcuts by challenging you to complete various tasks using only your keyboard. The more efficiently you complete the tasks, the higher your score!
            </p>

            <h2 className="help-subtitle">Getting Started</h2>
            <ul className="help-list">
                <li>
                    <strong>1. Choose Your Mode:</strong> Select a game mode that suits your level of expertise. Whether you are a beginner or an advanced user, there is a challenge waiting for you.
                </li>
                <li>
                    <strong>2. Start the Game:</strong> Once you have selected your mode, you will be presented with a series of tasks. These tasks will require you to navigate, edit, and manage files using only keyboard shortcuts.
                </li>
            </ul>

            <h2 className="help-subtitle">How to Play</h2>
            <ol className="help-list">
                <li>
                    <strong>Read the Instructions:</strong> Before each task begins, you will be given specific instructions on what needs to be done. Pay close attention!
                </li>
                <li>
                    <strong>Use Keyboard Shortcuts:</strong> Complete the task using only the keyboard. No mouse allowed! You will need to rely on your knowledge of shortcuts to navigate and execute commands.
                </li>
                <li>
                    <strong>Time and Score:</strong> Your performance will be timed, and you will receive a score based on how quickly and accurately you complete the task. The faster and more precise you are, the higher your score!
                </li>
                <li>
                    <strong>Progress Through Levels:</strong> As you advance through the game, the tasks will become more challenging. Mastering each level will require you to become more proficient with a wider range of keyboard shortcuts.
                </li>
            </ol>

            <h2 className="help-subtitle">Tips for Success</h2>
            <ul className="help-tips">
                <li>
                    <strong>Practice Makes Perfect:</strong> The more you play, the better you will get at remembering and using keyboard shortcuts. Do not be afraid to repeat levels to improve your score.
                </li>
                <li>
                    <strong>Stay Calm:</strong> Some tasks may be challenging, but staying calm and focused will help you complete them more effectively.
                </li>
                <li>
                    <strong>Explore Different Shortcuts:</strong> Try out different keyboard shortcuts to see which ones work best for you. Some tasks may have more than one shortcut that can be used.
                </li>
            </ul>

            <p className="help-paragraph">
                Ready to become a Keyboard Crusader? Put your skills to the test and see how well you can complete the challenges. Good luck!
            </p>
        </div>
        </>
    );
};

export default Help;
