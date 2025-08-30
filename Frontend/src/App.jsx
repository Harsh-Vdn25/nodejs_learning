import { useState, useMemo, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Attendancepage from './Attendancepage';
import { Authentication } from './Authentication';
function App() {
  const [isAllowed, setisAllowed] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Authentication setisAllowed={setisAllowed} />} />
        <Route path="/Attendancepage" element={<Attendancepage />} />


      </Routes>
    </>
  )
}

export default App;

