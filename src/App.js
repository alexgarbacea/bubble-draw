import { useState } from "react";
import "./App.css";
import Bubble from "./components/Bubble";

function App() {
  const [bubbles, setBubbles] = useState([]);
  const [selectedBubble, setSelectedBubble] = useState(null);

  const handleKeyDown = (event) => {
    if (bubbles.length === 0) return;
    const selectedBubbleIndex = bubbles.findIndex(
      (bubble) => bubble.id === selectedBubble.id
    );
    if (selectedBubbleIndex === null) return;
    const newBubbles = [...bubbles];
    switch (event.key) {
      case "ArrowUp":
        newBubbles[selectedBubbleIndex].size += 5;
        setBubbles(newBubbles);
        break;
      case "ArrowDown":
        newBubbles[selectedBubbleIndex].size -= 5;
        setBubbles(newBubbles);
        break;
      default:
        break;
    }
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleBubbleClick = (id) => {
    const bubble = bubbles.find((b) => b.id === id);
    setSelectedBubble(bubble);
  };

  const handleEmptySpaceClick = (event) => {
    const size = getRandomInt(50, 150);
    const newBubble = {
      id: bubbles.length + 1,
      size,
      xLeft: event.clientX,
      yTop: event.clientY,
    };
    setSelectedBubble(newBubble);
    setBubbles([...bubbles, newBubble]);
  };

  const handleThemeChange = () => {
    const currentTheme = document.documentElement.getAttribute("display-theme");
    document.documentElement.setAttribute(
      "display-theme",
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const bubblesList = bubbles.map((bubble) => (
    <Bubble
      key={bubble.id + bubble.xLeft + bubble.yTop}
      id={bubble.id}
      isSelected={bubble === selectedBubble}
      size={bubble.size}
      xLeft={bubble.xLeft}
      yTop={bubble.yTop}
      onClick={() => handleBubbleClick(bubble.id)}
      onKeyDown={handleKeyDown}
    />
  ));

  return (
    <>
      <div className={`App`}>
        <div className="controls">
          <button onClick={handleThemeChange}>Switch Theme</button>
        </div>
      </div>
      <section className="bubble-board" onClick={handleEmptySpaceClick} />
      <section className="bubbles">{bubblesList}</section>
    </>
  );
}

export default App;
