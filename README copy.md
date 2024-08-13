Keyboard Crusaders
Keyboard Crusaders is an educational and fun web-based game designed to help users learn and practice keyboard shortcuts. The game presents users with tasks that can be accomplished using keyboard shortcuts, and players must input the correct shortcut to proceed. The game is themed around a medieval crusader who must master the art of keyboard shortcuts to progress through various levels.

Table of Contents
Installation
Usage
Features
Game Levels
API Endpoints
Technologies Used
Screenshots
Contributing
License
Installation
Prerequisites
Node.js (v14.x or later)
npm (v6.x or later)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/keyboard-crusaders.git
cd keyboard-crusaders
Install dependencies:

bash
Copy code
npm install
Initialize the SQLite database:

bash
Copy code
node backend/initializeDb.js
Start the backend server:

bash
Copy code
node backend/server.js
Start the frontend development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 to play the game.

Usage
Gameplay
Objective: Master various keyboard shortcuts to help your crusader progress through different levels of the game.
Controls: Use your keyboard to input the required shortcuts as prompted.
Levels: The game consists of multiple levels, each focusing on a different aspect of keyboard shortcuts.
API Usage
The backend API is hosted on http://localhost:5000. It provides several endpoints for managing users, attempts, and actions within the game.

Features
Interactive Tutorial: A Level 0 tutorial introduces players to the game and teaches basic keyboard shortcuts.
Dynamic Levels: Levels range from basic navigation to advanced editing and debugging, with each level designed to reinforce the use of shortcuts.
Leaderboard: A leaderboard tracks player performance, showing stats like overall score, time spent, and accuracy.
Customizable Interface: The game mimics the look and feel of Visual Studio, providing an immersive learning environment.
Game Levels
Level 0: Create a Project
Level 1: Basic Navigation
Level 2: Editing and Refactoring
Level 3: Debugging
Level 4: Advanced Editing
Level 5: Customization and Productivity
API Endpoints
/api/addUser
Method: POST
Description: Adds a new user to the database.
Request Body: { "username": "string" }
/api/addAttempt
Method: POST
Description: Records an attempt by a user.
Request Body: { "user_id": "number", "attempt_type": "string", "start_time": "string", "end_time": "string", "success": "boolean", "score": "number", "level_id": "number" }
/api/addAction
Method: POST
Description: Records an action within an attempt.
Request Body: { "attempt_id": "number", "action_type": "string", "timestamp": "string", "details": "string" }
Technologies Used
Frontend: Next.js, React, Three.js
Backend: Express, Node.js
Database: SQLite
Styling: CSS, TailwindCSS
Deployment: Netlify (for frontend), Custom Server (for backend)
Screenshots
Add screenshots or gifs of your game here.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.