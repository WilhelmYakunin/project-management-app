import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
    modalType: string,
}

const modalFromsSlice = createSlice({
    name: 'modal',
    initialState: {
      modalType: 'unset',
    },
    reducers: {
      openModal: (state, action) => {
        const { type } = action.payload
        state.modalType = type
      },
      closeModal: (state) => {
        state.modalType = 'unset';
      },
    },
  });
  
  export const {
    openModal,
    closeModal,
  } = modalFromsSlice.actions;
  
  export default modalFromsSlice.reducer;