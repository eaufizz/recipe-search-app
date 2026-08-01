import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
