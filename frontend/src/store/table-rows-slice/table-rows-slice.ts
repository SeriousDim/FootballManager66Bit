import {TableRowInfo} from '../../types/footballer';
import {createSlice} from '@reduxjs/toolkit';

interface TableRowsState {
  rows: {[index: number]: TableRowInfo}
}

const initState: TableRowsState = {
  rows: {}
};

const tableRowSlice = createSlice({
  name: 'tableRowSlice',
  initialState: initState,
  reducers: {
    setRowsInfo(state, action) {
      state.rows = action.payload;
    },
    insertRowInfo(state, action) {
      const info = action.payload;
      if (info.id) {
        state.rows[info.id] = info;
      }
    }
  }
});

export const {setRowsInfo, insertRowInfo} = tableRowSlice.actions;

export default tableRowSlice.reducer;
