import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { deleteVehicle, selectVehicles } from '../../store/vehicles';
import { Vehicle } from '../../types/vehicle';

export const Home = () => {
  const vehicles = useSelector(selectVehicles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editVehicleNavigate = (values: any) => {
    navigate(`edit-vehicle/${values.emailId}`);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const viewVehicleNavigate = (values: any) => {
    navigate(`view-vehicle/${values.emailId}`);
  };

  const columns: readonly Column<object>[] = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: (props) => {
          const avatar = props.value ? props.value : '/avatar.png';
          return <img width={100} src={avatar} />;
        }
      },
      {
        Header: 'Modal',
        accessor: 'Modal'
      },
      {
        Header: 'Milage',
        accessor: 'Milage'
      },
      {
        Header: 'Email',
        accessor: 'emailId'
      },
      {
        Header: 'Actions',
        Cell: (props) => {
          const rowId = props.row.values as Vehicle;
          return (
            <>
              <VisibilityOutlinedIcon color="primary" onClick={() => viewVehicleNavigate(rowId)} />
              <EditIcon color="primary" onClick={() => editVehicleNavigate(rowId)} />
              <DeleteIcon color="error" onClick={() => dispatch(deleteVehicle(rowId))} />
            </>
          );
        }
      }
    ],
    [dispatch, editVehicleNavigate, viewVehicleNavigate]
  );

  const handlerClick = () => {
    navigate('add-vehicle');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '20px 0px' }}>
        <Button text="Add Vehicle" onClick={handlerClick} />
      </Box>
      <Box>
        <Table data={vehicles} columns={columns} />
      </Box>
    </Container>
  );
};
