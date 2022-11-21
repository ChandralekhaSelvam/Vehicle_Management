/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
// import ReactImageUploading from 'react-images-uploading';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button as MuiButton,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { viewVehicleList, selectVehicles } from '../../store/vehicles';
import { Vehicle, VehicleState } from '../../types/vehicle';
// import Table from '../../components/Table';

export const ViewVehicle = () => {
  const { id } = useParams();
  const vehicles = useSelector(selectVehicles);
  const [isSelected, setIsSelected] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let vehicle: { Modal: any; avatar?: string | undefined; Milage: any; Make: any; emailId: any };
  const val = Object.values(vehicles)

  const onClick = (values: Vehicle) => {
    const updatedVehicle = { ...values };
    dispatch(viewVehicleList(updatedVehicle));
    navigate('/');
  };

  return (
    <Container>
      <Box sx={{ padding: '20px 0px' }}>
        <Typography variant="h6">View Vehicle</Typography>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Modal</TableCell>
              <TableCell>Milage</TableCell>
              <TableCell>EmailId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { isSelected && vehicles.map((vehicle) => (
              <TableRow key={vehicle.emailId}>
                <TableCell>{vehicle.Make}</TableCell>
                <TableCell>{vehicle.Milage}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.Modal}</TableCell>
                <TableCell>{vehicle.emailId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};
