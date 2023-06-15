import './App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './main_content/Main';
import Single from './main_content/Single';
import Multiple from './main_content/Multiple';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EnumPage from './main_content/Enum';


const App= () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="" element={<Main />}/>
          <Route path="/single" element={<Single />}/>
          <Route path="/multiple" element={<Multiple />}/>
          <Route path="/enum" element={<EnumPage />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
