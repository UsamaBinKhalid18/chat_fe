import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import ActivateAccount from './pages/ActivateAccount';
import { Home } from './pages/home';
import PasswordReset from './pages/PasswordReset';
import PricingPlans from './pages/PricingPlans';
import RequestPasswordReset from './pages/RequestPasswordReset';
import Support from './pages/Support';

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/support' element={<Support />} />
          <Route path='/pricing' element={<PricingPlans />} />
          <Route path='*' element={<>404</>} />
        </Route>
        <Route path='/activate/:uid/:token' element={<ActivateAccount />} />
        <Route path='/password-reset' element={<RequestPasswordReset />} />
        <Route path='/password-reset/:uid/:token' element={<PasswordReset />} />
      </Routes>
    </>
  );
}

export default App;
