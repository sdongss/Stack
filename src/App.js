import './App.css';
import {Routes,Route,BrowserRouter as Router,} from 'react-router-dom'
import StartUp from './pages/StartUp';
import Stack from './pages/Stack';
function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<StartUp></StartUp>}></Route>
    <Route path="/stack" element={<Stack></Stack>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
