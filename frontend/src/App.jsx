import './App.css';
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Property from "./pages/Property/Property.jsx";
import Search from "./pages/Search/Search.jsx";
import Saved from "./pages/Saved/Saved.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { SavedProvider } from "./context/SavedContext.jsx";

import NavBar from "./components/NavBar/NavBar.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <SavedProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/property/:id" element={<Property />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </SavedProvider>
  );
}

export default App;
