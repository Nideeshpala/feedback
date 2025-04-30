import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import Register from './Register';
import Feedback_page from './Feedback_page';
import Admin from './Admin';
import Userview from './Userview';

function App() {
  return (
    <div className="App">
        <Header></Header>
      <Routes>
      
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/feedback' element={<Feedback_page></Feedback_page>}></Route>
        <Route path='/admindashboard' element={<Admin></Admin>}></Route>
        <Route path='/userview' element={<Userview></Userview>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
