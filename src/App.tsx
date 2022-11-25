import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ClientPage } from './pages/client';

function App() {
  return (
    <div className="container is-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage WelcomeMessage={"Hello and welcome to Billing App"} />} />
          <Route path="/client" element={<ClientPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
