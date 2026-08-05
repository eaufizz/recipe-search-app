import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home.page";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
