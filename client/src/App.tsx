import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <ChakraProvider>
      <MainContainer />
    </ChakraProvider>
  );
}

export default App;
