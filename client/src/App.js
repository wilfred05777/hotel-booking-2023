
/// pages
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';

/// packages
import { BrowserRouter, Routes, Route } from "react-router-dom";

/// styles
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/list" element={<List/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
