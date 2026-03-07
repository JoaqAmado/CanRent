import './App.css'
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Property from "./pages/Property/Property.jsx";
import Search from "./pages/Search/Search.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link></Link>
      </nav>


      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/property" element={<Property/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
