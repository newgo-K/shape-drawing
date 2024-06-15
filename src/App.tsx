import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeaderMenu from "./components/HeaderMenu";
import Canvas from "./components/Canvas";
import { ShapesProvider } from "./context/ShapesContext";

const App = () => {
  return (
    <div className="container">
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<Canvas />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <ShapesProvider>
      <App />
    </ShapesProvider>
  </Router>
);

export default AppWrapper;
