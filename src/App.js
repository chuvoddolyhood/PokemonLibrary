import './App.css';
import List from './components/List';
import { Route, Routes } from 'react-router-dom'
import Pokemon from './components/Pokemon';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/pokemon/:id' element={<Pokemon />} />
      </Routes>
    </div >
  );
}

export default App;
