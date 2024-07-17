import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import DandH from './pages/DandH';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Clients } from './clients/Clients';
import { Procedures } from './clients/Procedures';
import { Procedure } from './clients/Procedure';
import { TestForModa } from './modals/TestForModa';

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />
        <Routes>
          <Route exact path='/' element={<DandH/>}/>
          <Route exact path='/clients' element={<Clients/>}/>
          <Route exact path='/procedures' element={<Procedures/>}/>
          <Route exact path='/procedure/:id' element={<Procedure/>}/>
          <Route exact path='/test' element={<TestForModa/>}/>

        </Routes>

      </Router>


    </div>
  );
}

export default App;
