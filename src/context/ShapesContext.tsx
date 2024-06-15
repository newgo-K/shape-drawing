import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Shape } from "../types/shape";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

interface ShapesContextType {
  shapes: Map<number, Shape>;
  addShape: (shape: Shape) => void;
  allClear: () => void;
}

interface ShapesProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "shapes";

const ShapesContext = createContext<ShapesContextType | undefined>(undefined);

export const ShapesProvider = ({ children }: ShapesProviderProps) => {
  const [shapes, setShapes] = useState<Map<number, Shape>>(() =>
    getLocalStorageItem(STORAGE_KEY)
  );

  useEffect(() => {
    setLocalStorageItem(STORAGE_KEY, shapes);
  }, [shapes]);

  const addShape = (shape: Shape) => {
    const newShape = { ...shape, id: Date.now() };

    setShapes(new Map(shapes.set(newShape.id, newShape)));
  };

  const allClear = () => {
    setShapes(new Map());
  };

  return (
    <ShapesContext.Provider value={{ shapes, addShape, allClear }}>
      {children}
    </ShapesContext.Provider>
  );
};

export const useShapesContext = () => useContext(ShapesContext)!;
