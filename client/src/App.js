import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
// import NotFound from './Components/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
    </Routes>
  );
}

export default App;
