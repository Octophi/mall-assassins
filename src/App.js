import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HostRoomDisplay from './components/HostRoomDisplay';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/rooms/:roomId" element={<HostRoomDisplay />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

