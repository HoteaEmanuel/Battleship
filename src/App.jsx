import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import RootLayout from './pages/RootLayout';
import Settings from './pages/Settings';
import GameRules from './pages/GameRules';
import { Toaster } from 'sonner';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Toaster richColors position='top-right'/>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new-game" element={<Game />}></Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/game-rules" element={<GameRules />} />
        </Route>
      </Routes>

      {/* </RootLayout> */}
    </BrowserRouter>
  );
}

export default App;
