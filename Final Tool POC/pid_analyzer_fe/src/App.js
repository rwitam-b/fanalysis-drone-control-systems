import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Uploader from "./Components/Uploader";
import ViewAnalysis from "./Components/ViewAnalysis";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/" element={<Uploader />} />
          <Route path="/viewAnalysis/:logId" element={<ViewAnalysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
