import {GridColDef} from '@mui/x-data-grid';
import {Button} from '@mui/material';

/**
 * Данные колонок для таблицы с футболистами на
 * странице {@link ListPage}
 */
export const COLUMNS: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Имя',
    minWidth: 150
  },
  {
    field: 'surname',
    headerName: 'Фамилия',
    minWidth: 150
  },
  {
    field: 'sex',
    headerName: 'Пол',
    width: 40
  },
  {
    field: 'birthDate',
    headerName: 'Дата рождения',
    width: 150
  },
  {
    field: 'team',
    headerName: 'Команда',
    minWidth: 150
  },
  {
    field: 'country',
    headerName: 'Страна',
    width: 150
  },
  {
    field: 'editButton',
    headerName: '',
    width: 100,
    renderCell: (params) => {
      return (
        <Button
          onClick={params.value}>
          Изменить
        </Button>
      );
    }
  }
];
