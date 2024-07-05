import './App.css';
import Login from './Login';
import Dashboard from './dashboard'; // Import the Dashboard component
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  useEffect(() => {
    document.title = 'Make Your Mark';
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Define the route for the Dashboard page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
