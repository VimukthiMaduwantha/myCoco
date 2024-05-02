import './App.css';
import NavBarComp from './Components/NavBarComp';
import './Styles/Navbar.css'
import AdminManagement from './View/AdminManagement';
import UserLogin from './View/UserLogin';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlantDetails from './View/PlantDetails';
import DailyTaskManagement from './View/DailyTaskManagement';
import MediumCondition from './View/MediumCondition';
import Home from './View/Home';

function App() {
  return (
    <>
      <NavBarComp />
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/logIn' element={<UserLogin />} />
          <Route exact path='/adminManagement' element={<AdminManagement />} />
          <Route exact path='/plantDetails' element={<PlantDetails />} />
          <Route exact path='/dailyTaskManagement' element={<DailyTaskManagement />} />
          <Route exact path='/mediumCondition' element={<MediumCondition />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;
