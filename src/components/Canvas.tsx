import { useCanvas } from "../hooks/useCanvas";
import { useShapesContext } from "../context/ShapesContext";

import Shape from "./Shape";

const Canvas = () => {
  const { shapes } = useShapesContext();
  const {
    canvasRef,
    currentShape,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useCanvas();

  return (
    <ul
      className="canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {Array.from(shapes.values()).map((shape, index) => (
        <Shape key={index} shape={shape} />
      ))}
      {currentShape && <Shape shape={currentShape} />}
    </ul>
  );
};

export default Canvas;
