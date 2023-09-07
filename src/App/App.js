import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Footer from './sections/Footer';
import Header from './sections/Header';
import EnumPage from './main_content/Enum';
import Main from './main_content/Main';
import Multiple from './main_content/Multiple';
import NewSingle from './main_content/NewSingle';


const App= () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes className="Main-content">
          <Route path="" element={<Main />}/>
          <Route path="/single" element={<NewSingle />}/>
          <Route path="/multiple" element={<Multiple />}/>
          <Route path="/enum" element={<EnumPage />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
