import { CSSProperties } from "react";

import { DRAW_TYPE, Shape as ShapeType } from "../types/shape";

const Shape = ({ shape }: { shape: ShapeType }) => {
  const { type, x, y, width, height } = shape;

  const style: CSSProperties = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: "1px solid black",
    borderRadius: type === DRAW_TYPE.RECTANGLE ? "0%" : "50%",
  };

  return <li style={style} />;
};

export default Shape;
