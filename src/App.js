import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PlayerInputInfoPage from './pages/PlayerInputInfoPage';
import PlayerWaitingPage from './pages/PlayerWaitingPage';
import HostWaitingRoom from './pages/HostWaitingRoom/HostWaitingRoom';
import HostInputInfoPage from './pages/HostInputInfoPage/HostInputInfoPage';
import GameMasterBoard from './pages/GameMasterBoard';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/rooms/:roomID/game-master-info" element={<HostInputInfoPage />} />
          <Route path="/rooms/:roomID/:hostID" element={<HostWaitingRoom />} />
          <Route path="/join-room" element={<PlayerInputInfoPage />} />
          <Route path="/rooms/:roomId/:playerName/:playerID" element={<PlayerWaitingPage />} />
          <Route path="/game-master-board" element={<GameMasterBoard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;



