import { Box, Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import EditVehicle from './pages/EditVehicle';
import ViewVehicle from './pages/ViewVehicle';
import CreateVehicle from './pages/CreateVehicle';

function App() {
  return (
    <Container maxWidth="xl">
      <Box>
        <Header title="Vehicle Management" />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add-vehicle" element={<CreateVehicle />} />
        <Route path="edit-vehicle/:id" element={<EditVehicle />} />
        <Route path="view-vehicle/:id" element={<ViewVehicle />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Container>
  );
}

export default App;
