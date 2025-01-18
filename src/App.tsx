import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import { Home } from './pages/home';

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<>404</>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
