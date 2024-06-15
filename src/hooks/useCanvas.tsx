import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Shape, DRAW_TYPE, DrawType } from "../types/shape";

type Position = { x: number; y: number };

export const useCanvas = (addShape: (id: number, shape: Shape) => void) => {
  const location = useLocation();

  const canvasRef = useRef<HTMLUListElement | null>(null);

  const [drawType, setDrawType] = useState<DrawType>(DRAW_TYPE.RECTANGLE);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("draw") as DrawType;

    if (type) {
      setDrawType(type);
    }
  }, [location.search]);

  const calculateShape = (start: Position, end: Position): Shape => ({
    type: drawType,
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
    width: Math.abs(start.x - end.x),
    height: Math.abs(start.y - end.y),
  });

  const getMousePosition = (e: React.MouseEvent): Position | null => {
    if (!canvasRef.current) {
      return null;
    }

    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const startPos = getMousePosition(e);

    if (startPos) {
      setStartPos(startPos);
      setDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;

    const curPos = getMousePosition(e);

    if (curPos) {
      setCurrentShape(calculateShape(startPos, curPos));
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!drawing) return;

    const endPos = getMousePosition(e);

    if (endPos) {
      const newShape = calculateShape(startPos, endPos);

      addShape(Date.now(), newShape);
      setDrawing(false);
      setCurrentShape(null);
    }
  };

  useEffect(() => {
    const handleWindowMouseUp = (e: MouseEvent) => {
      if (!drawing) return;

      // 마우스 드래그 중에 캔버스 밖에서
      // mouseup 상태라면 도형 초기화
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const { clientX, clientY } = e;

        if (
          clientX < rect.left ||
          clientX > rect.right ||
          clientY < rect.top ||
          clientY > rect.bottom
        ) {
          setDrawing(false);
          setCurrentShape(null);
        }
      }
    };

    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [drawing]);

  return {
    canvasRef,
    currentShape,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
