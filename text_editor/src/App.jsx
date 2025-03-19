// Desc: Main entry point for the application
import './App.css';
import Dashboard from './component/Dashboard.jsx';
import Login from './component/Login.jsx'
import Register from './component/Register.jsx'
import NotFoundPage from './component/NotFoundPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/dash' element={<Dashboard />} />
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
