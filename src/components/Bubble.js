import { useEffect } from "react";

const Bubble = ({ id, isSelected, size, xLeft, yTop, onClick, onKeyDown }) => {
  useEffect(() => {
    // Focus on created bubble
    document.getElementById(id).focus();
  }, [id]);

  const getDistanceBySize = (distance, size) => {
    return parseInt(distance) - parseInt(size) / 2;
  };

  return (
    <div
      className={`bubble${isSelected ? " selected" : ""}`}
      id={id}
      style={{
        width: size,
        height: size,
        left: getDistanceBySize(xLeft, size),
        top: getDistanceBySize(yTop, size),
      }}
      onKeyDown={onKeyDown}
      tabIndex={isSelected ? 0 : -1}
      onClick={onClick}
    />
  );
};

export default Bubble;
