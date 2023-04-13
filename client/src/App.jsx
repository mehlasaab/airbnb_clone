
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4001';

function App() {
  
  return (

    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
  );
}

export default App
