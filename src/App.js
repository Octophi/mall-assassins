import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HostRoomDisplay from './pages/HostWaitingRoom';
import PlayerInputInfoPage from './pages/PlayerInputInfoPage';
import PlayerWaitingPage from './pages/PlayerWaitingPage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/rooms/:roomId/game-master" element={<HostRoomDisplay />} />
          <Route path="/join-room" element={<PlayerInputInfoPage />} />
          <Route path="/rooms/:roomId/:playerName" element={<PlayerWaitingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

