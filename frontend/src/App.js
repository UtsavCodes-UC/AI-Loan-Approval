import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import Models from "./pages/Models";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' 
          element={
            <ProtectedRoute>
            <Dashboard/>
            </ProtectedRoute>
          }
        />
        <Route path='/predict' 
          element={
            <ProtectedRoute>
            <Predict/>
            </ProtectedRoute>
          }
        />
        <Route path='/history' 
          element={
            <ProtectedRoute>
            <History/>
            </ProtectedRoute>
          }
        />
        <Route path='/analytics' 
          element={
            <ProtectedRoute>
            <Analytics/>
            </ProtectedRoute>
          }
        />
        <Route path='/models' 
          element={
            <ProtectedRoute>
            <Models/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
