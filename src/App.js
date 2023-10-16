import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PlayerInputInfoPage from './pages/PlayerInputInfoPage';
import PlayerWaitingPage from './pages/PlayerWaitingPage';
import HostWaitingRoom from './pages/HostWaitingRoom';
import HostInputInfoPage from './pages/HostInputInfoPage/HostInputInfoPage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/rooms/:roomID/game-master-info" element={<HostInputInfoPage />} />
          <Route path="/rooms/:roomID/:hostID" element={<HostWaitingRoom />} />
          <Route path="/join-room" element={<PlayerInputInfoPage />} />
          <Route path="/rooms/:roomId/:playerName/:playerID" element={<PlayerWaitingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;


