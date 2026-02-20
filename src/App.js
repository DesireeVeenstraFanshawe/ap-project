import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home/home.js';
import SignUpIn from './components/SignUpIn/signUpIn.js';
import Details from './components/Details/details.js';
import CitySelect from './components/CitySelect/citySelect.js';
import OwnerPage from './components/OwnerPage/ownerPage.js';
import OwnerDetails from './components/OwnerDetails/OwnerDetails.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/sign-up-in' element={<SignUpIn/>} />
        <Route path='/details' element={<Details/>} />
        <Route path='/city-select' element={<CitySelect/>} />
        <Route path='/owner-page' element={<OwnerPage/>}/>
        <Route path='/owner-details' element={<OwnerDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
