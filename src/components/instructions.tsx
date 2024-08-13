import React, { useEffect } from "react";

export const Instructions = ({ task }: { task: string }) => {
  return (
    <div style={styles.bubble}>
      <p style={styles.text}>{task}</p>
    </div>
  );
};

const styles = {
  bubble: {
    maxWidth: "70%",
    padding: "15px 20px",
    backgroundColor: "#f2f2f2",
    borderRadius: "20px",
    position: "relative" as "relative",
    margin: "20px",
    border: "2px solid #333",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
    animation: "pulse 1.5s infinite",
    fontFamily: "'Press Start 2P', cursive",
  },
  text: {
    margin: 0,
    color: "#333",
    fontSize: "16px",
  },
  // Adding the tail of the speech bubble
  tail: {
    content: '""',
    position: "absolute" as "absolute",
    bottom: "-20px",
    left: "30px",
    width: "0",
    height: "0",
    borderTop: "20px solid #f2f2f2",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "none",
  },
};

// Adding animation to the component
const keyframes = `
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
`;

useEffect(() => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
}, []);
