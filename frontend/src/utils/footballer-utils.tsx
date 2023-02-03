import {Footballer, TableRowInfo} from '../types/footballer';
import {CountryLoc} from '../types/country';

/**
 * Генерирует данные строк таблицы из данных о футболистах
 * @param footballers
 * @param countriesList
 * @param onEdit функция, вызываемая при редактировании футболиста
 * @return объект: ключ - id футболиста, значение - объект строки таблицы
 */
export function generateTableRows(
  footballers: Footballer[], countriesList: CountryLoc, onEdit: (f: Footballer) => void) {
  const result: { [index: number]: ReturnType<typeof generateTableRow> } = {};

  Object.values(footballers).map((item) => {
    if (item.id) {
      result[item.id] = generateTableRow(item, countriesList, onEdit);
    }
  });

  return result;
}

/**
 * Генерирует данные строки таблицы из данных о футболисте
 * @param f
 * @param countriesList
 * @param onEdit функция, вызываемая при редактировании футболиста
 * @return объект строки таблицы
 */
export function generateTableRow(
  f: Footballer,
  countriesList: CountryLoc,
  onEdit: (f: Omit<Footballer, 'id'>) => void)
  : TableRowInfo {
  return {
    ...f,
    sex: f?.sex === 'MALE' ? 'М' : 'Ж',
    birthDate: f?.birthDate ? new Date(f?.birthDate)?.toLocaleDateString() : '',
    country: countriesList[f?.country] || '',
    editButton: () => onEdit(f)
  };
}

/**
 * Генерирует айтемы для выпадающего списка стран
 * @param countries
 */
export function generateCountrySelectItems(countries: CountryLoc) {
  return Object.keys(countries).map((key) => {
    return {
      value: key,
      label: countries[key]
    };
  });
}
