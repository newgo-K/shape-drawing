import { useNavigate, useLocation } from "react-router-dom";

import { MENU_TYPE, MenuType } from "../types/menu";
import { DRAW_TYPE, DrawType } from "../types/shape";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setShapeType = (type: DrawType) => {
    const params = new URLSearchParams(location.search);

    params.set("draw", type);
    navigate({ search: params.toString() }, { replace: true });
  };

  const setMenuType = (type: MenuType) => {
    const params = new URLSearchParams(location.search);

    params.set("menu", type);
    navigate({ search: params.toString() });
  };

  return (
    <div>
      <button onClick={() => setShapeType(DRAW_TYPE.RECTANGLE)}>사각형</button>
      <button onClick={() => setShapeType(DRAW_TYPE.CIRCLE)}>원</button>
      <button onClick={() => setMenuType(MENU_TYPE.ALL_CLEAR)}>
        전체 삭제
      </button>
    </div>
  );
};

export default HeaderMenu;
