import { Route, Routes, useNavigate } from 'react-router-dom';
import { GameProvider } from './pages/GameContext';
import Home from './pages/Home';
import Game from './pages/Game';
import Settings from './pages/Settings';
import CategorySelect from './pages/CategorySelect';
import Load from './pages/Load';
import Results from './pages/Results';
import NotFound from './components/NotFound';

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/categories' element={<CategorySelect />}></Route>
        <Route path='/load' element={<Load />}></Route>
        <Route path='/game' element={<Game />}></Route>
        <Route path='/results' element={<Results />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
