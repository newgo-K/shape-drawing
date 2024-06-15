import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Shape } from "../types/shape";
import { MENU_TYPE } from "../types/menu";

interface ShapesContextType {
  shapes: Map<number, Shape>;
  addShape: (id: number, shape: Shape) => void;
  allClear: () => void;
}

interface ShapesProviderProps {
  children: ReactNode;
}

const ShapesContext = createContext<ShapesContextType | undefined>(undefined);

export const ShapesProvider = ({ children }: ShapesProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [shapes, setShapes] = useState<Map<number, Shape>>(new Map());

  const addShape = (id: number, shape: Shape) => {
    setShapes(new Map(shapes.set(id, shape)));
  };

  const allClear = () => {
    setShapes(new Map());
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const menuType = params.get("menu");

    switch (menuType) {
      case MENU_TYPE.ALL_CLEAR: {
        allClear();
        break;
      }
    }

    params.delete("menu");
    navigate({ search: params.toString() }, { replace: true });
  }, [location.search, navigate]);

  return (
    <ShapesContext.Provider value={{ shapes, addShape, allClear }}>
      {children}
    </ShapesContext.Provider>
  );
};

export const useShapesContext = () => useContext(ShapesContext)!;
