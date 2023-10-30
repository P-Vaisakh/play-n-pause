import { Route, Routes } from 'react-router-dom';
import './Assets/App.css';
import Header from './Components/Header';
import Landing from './Pages/Landing';
import View from './Pages/View';
import History from './Pages/History';
import Footer from "./Components/Footer";



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/view" element={<View></View>}></Route>
        <Route path="/history" element={<History></History>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
