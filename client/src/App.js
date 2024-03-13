import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Game from './pages/Game';
// import NotFound from './Components/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/game' element={<Game/>}></Route>
    </Routes>
  );
}

export default App;
