import {Footballer, FootballerDict} from '../../../types/footballer';
import {createSlice} from '@reduxjs/toolkit';
import {
  getCountryList,
  getFootballerListAction,
  getTeamListAction
} from '../../../service/async-actions/general-actions';
import {CountryLoc} from '../../../types/country';

interface GeneralState {
  footballerList: Footballer[],
  teamList: string[],
  countryList: CountryLoc,
  errorMessage: string | null
}

const initState: GeneralState = {
  footballerList: [],
  teamList: [],
  countryList: {},
  errorMessage: null
}

const generalSlice = createSlice({
  name: 'general',
  initialState: initState,
  reducers: {
    setFootballerList(state, action) {
      state.footballerList = action.payload;
    },
    setTeamList(state, action) {
      state.teamList = action.payload;
    },
    setCountryList(state, action) {
      state.countryList = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFootballerListAction.fulfilled, (state, action) => {
        state.footballerList = action.payload;
      })
      .addCase(getTeamListAction.fulfilled, (state, action) => {
        state.teamList = action.payload;
      })
      .addCase(getCountryList.fulfilled, (state, action) => {
        state.countryList = action.payload;
      });
  }
});

export const
  {setFootballerList,
  setTeamList,
  setCountryList,
  setError} = generalSlice.actions;

export default generalSlice.reducer;
