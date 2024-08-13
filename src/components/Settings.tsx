import React, { useState, useEffect } from 'react';
import './../styles/settings.css'; 
import BackButton from './backButton';

const Settings = () => {
    const defaultSettings = {
        sound: true,
        music: true,
        volume: 0.1,  // Default volume level
    };

    const loadSettings = () => {
        try {
            const savedSettings = localStorage.getItem('gameSettings');
            return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
        } catch (error) {
            console.error('Error loading settings from localStorage:', error);
            return defaultSettings;
        }
    };

    const [settings, setSettings] = useState(loadSettings());

    useEffect(() => {
        try {
            localStorage.setItem('gameSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings to localStorage:', error);
        }
    }, [settings]);

    const handleToggle = (key: string) => {
        setSettings((prevSettings: typeof settings) => ({
            ...prevSettings,
            [key]: !prevSettings[key],
        }));
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(event.target.value);  // Correctly parse as float
        setSettings((prevSettings: typeof settings) => ({
            ...prevSettings,
            volume,
        }));
    };

    return (
        <div className="page-container">
            <div style={{padding: '20px'}}>
                <BackButton/>
            </div>
            <div className="settings-container">
                <h1>Game Settings</h1>

                <div className="setting-item">
                    <label htmlFor="sound-toggle">Sound Effects:</label>
                    <input
                        type="checkbox"
                        id="sound-toggle"
                        checked={settings.sound}
                        onChange={() => handleToggle('sound')}
                    />
                </div>

                <div className="setting-item">
                    <label htmlFor="music-toggle">Background Music:</label>
                    <input
                        type="checkbox"
                        id="music-toggle"
                        checked={settings.music}
                        onChange={() => handleToggle('music')}
                    />
                </div>

                <div className="setting-item">
                    <label htmlFor="volume-slider">Volume Level:</label>
                    <input
                        type="range"
                        id="volume-slider"
                        min="0.1"
                        max="0.5"
                        step="0.1"  // Ensures the slider increments by 0.1
                        value={settings.volume}
                        onChange={handleVolumeChange}
                    />
                    <span>{settings.volume}</span>
                </div>
            </div>
        </div>
    );
};

export default Settings;
