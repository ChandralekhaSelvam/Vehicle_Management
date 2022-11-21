import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, VehicleState } from '../types/vehicle';
import { RootState } from '.';

const initialState: VehicleState = {
  vehicleList: []
};

export const vehicleActions = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicleList = [...state.vehicleList, action.payload];
    },
    deleteVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicleList = state.vehicleList.filter(({ emailId }) => emailId !== action.payload.emailId);
    },
    viewVehicleList: (state, action: PayloadAction<Vehicle>) => {
      state.vehicleList = state.vehicleList.map((vehicle) => {
        console.log(action.payload);
        if (vehicle.emailId === action.payload.emailId) {
          return { ...vehicle, ...action.payload };
        }
        return vehicle;
      });
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const newVehicle = state.vehicleList.map((vehicle) => {
        console.log(action.payload);
        if (vehicle.emailId === action.payload.emailId) {
          return { ...vehicle, ...action.payload };
        }
        return vehicle;
      });
      state.vehicleList = [...newVehicle];
    }
  }
});

export const selectVehicles = (state: RootState) => state.vehicles.vehicleList;

export const { addVehicle, deleteVehicle, updateVehicle, viewVehicleList } = vehicleActions.actions;
export default vehicleActions.reducer;
