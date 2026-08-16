import { HashRouter } from 'react-router';
import { Header } from './components/Header';

import { BottomNavigation } from './components/BottomNavigation';

function App() {
  return (
    <HashRouter>
      <Header ingredientCount={0} />
      <BottomNavigation />
    </HashRouter>
  );
}

export default App;
