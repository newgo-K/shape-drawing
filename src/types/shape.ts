export const DRAW_TYPE = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
} as const;

export type DrawType = (typeof DRAW_TYPE)[keyof typeof DRAW_TYPE];

export interface Shape {
  type: DrawType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
}
