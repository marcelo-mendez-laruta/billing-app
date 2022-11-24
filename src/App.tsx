import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ClientPage } from './pages/client';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage WelcomeMessage={"Hola Bienvenidos a React Store"} />} />
          <Route path="/client" element={<ClientPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
