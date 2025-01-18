import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<></>} />
        </Route>
        <Route path='*' element={<>404</>} />
      </Routes>
    </>
  );
}

export default App;
