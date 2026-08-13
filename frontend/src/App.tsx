import { HashRouter, Route, Routes } from 'react-router';
import HomePage from './pages/Home.page';
import Header from './components/Header';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
