import { createSlice } from '@reduxjs/toolkit';
export const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
      choosen : {},
      doctor:[]
    },
    reducers: {
      select: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }     
  }
    
});

//Acciones que modificarán RDX
export const { select } = doctorSlice.actions;

//Estado del que leeremos RDX
export const doctorData = (state) => state.doctor;

export default doctorSlice.reducer;