import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Scenarios from './pages/Scenarios';
import ScriptGenerator from './pages/ScriptGenerator';
import Tips from './pages/Tips';
import Tools from './pages/Tools';
import SuccessStories from './pages/SuccessStories';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AnxietyCheck from './pages/AnxietyCheck';
import Emergency from './pages/Emergency';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/scenarios" element={<Scenarios />} />
                            <Route path="/scenarios/:id" element={<Scenarios />} />
                            <Route path="/generate" element={<ScriptGenerator />} />
                            <Route path="/tips" element={<Tips />} />
                            <Route path="/tools" element={<Tools />} />
                            <Route path="/stories" element={<SuccessStories />} />
                            <Route path="/anxiety-check" element={<AnxietyCheck />} />
                            <Route path="/emergency" element={<Emergency />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
