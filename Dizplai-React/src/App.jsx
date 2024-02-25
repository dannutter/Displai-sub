import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PollView from './Routes/Poll';
import ResultView from './Routes/Results';
import PollListView from './Routes/PollList';


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<PollListView />} />
                <Route path="/poll/:id" element={<PollView />} />
                <Route path="/result/:id" element={<ResultView />} />
                
            </Routes>
        </Router>
  )
}

export default App
