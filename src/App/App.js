import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import EnumPage from "./main_content/Enum";
import Main from "./main_content/Main";
import Multiple from "./main_content/Multiple";
import NewSingle from "./main_content/NewSingle";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path=""
            element={
              <div className="Main-content">
                <Main />
              </div>
            }
          />
          <Route
            path="/single"
            element={
              <div className="Main-content">
                <NewSingle/>
              </div>
            }
          />
          <Route
            path="/multiple"
            element={
              <div className="Main-content">
                <Multiple />
              </div>
            }
          />
          <Route
            path="/enum"
            element={
              <div className="Main-content">
                <EnumPage />
              </div>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
