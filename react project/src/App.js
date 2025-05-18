
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gym from './gym/Gym';
import Sport from './gym/Sport';
import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/all.min.css';
import '@coreui/coreui/dist/js/coreui.bundle.min.js';

import Header from './Component/Header';
import Sauna from './Sauna/Sauna';
import ReserveSauna from './Sauna/ReserveSauna';
import ShowDialog from './Sauna/ShowDialog';


function App() {
  return (
   <BrowserRouter>
      <Routes>
                <Route path='/' element={<Header><Sport/></Header>}></Route>
                {/* <Route path='/' element={}> */}
               
                <Route path='/show' element={<Header><ShowDialog/></Header>}></Route>
                <Route path='/sauna' element={<Header><Sauna/></Header>}></Route>
                    <Route path='/gym' element={<Header><Gym/></Header>}></Route>  
                <Route path='/reserveSauna' element={<Header><ReserveSauna/></Header>}></Route>

             
      </Routes>

</BrowserRouter>
  );
}

export default App;
