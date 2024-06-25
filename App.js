import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home.js';
import Todo from './Todo.js';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/Todo' element={<Todo/>}/>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;