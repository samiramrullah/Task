import Navbar from "./ShowData/Navbar/Navbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Posts from "./ShowData/Posts";
import Details from "./Details";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/detail/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
