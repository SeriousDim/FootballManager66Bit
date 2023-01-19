import {Footballer, FootballerDict} from '../types/footballer';
import {CountryLoc} from '../types/country';
import {MenuItem} from '@mui/material';

export function getTableRows(
  array: FootballerDict, countriesList: CountryLoc, onEdit: (f: Footballer) => void){
  const result: {[index: number]: ReturnType<typeof transformFootballerToTableRow>} = {};

  Object.values(array).map((item) => {
    if (item.id) {
      result[item.id] = transformFootballerToTableRow(item, countriesList, onEdit);
    }
  });

  return result;
}

export function transformFootballerToTableRow(
  f: Footballer, countriesList: CountryLoc, onEdit: (f: Footballer) => void) {
  return {
    ...f,
    sex: f?.sex === 'MALE' ? 'М' : 'Ж',
    birthDate: f?.birthDate ? new Date(f?.birthDate)?.toLocaleDateString() : '',
    country: countriesList[f?.country],
    editButton: () => onEdit(f)
  }
}

export function countriesToSelectItems(countries: CountryLoc) {
  return Object.keys(countries).map((key) => {
    return {
      value: key,
      label: countries[key]
    }
  });
}
