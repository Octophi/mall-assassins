import logo from './logo.svg';
import './App.css';

// 1. import `ChakraProvider` component for prebuilt Chakra components
import { ChakraProvider } from '@chakra-ui/react'
import LandingPage from './LandingPage'

function App() {
  return (
    <ChakraProvider>
      <LandingPage />
    </ChakraProvider>
  );
}

export default App;
