import {DataGrid} from '@mui/x-data-grid';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Fragment, useEffect, useState} from 'react';
import {getCountryList, getFootballerListAction} from '../../service/async-actions/general-actions';
import {Footballer, TableRowInfo} from '../../types/footballer';
import {generateTableRows, generateTableRow} from '../../utils/footballer-utils';
import {COLUMNS} from './grid-columns';
import {Box, Button, Dialog} from '@mui/material';
import {FootballerForm} from '../../components/forms/footballer-form/footballer-form';

/**
 * Страница с актуальным списком футболистов
 * @constructor
 */
export function ListPage() {
  // === dispatch & selectors ===
  const dispatch = useAppDispatch();

  const footballers = useAppSelector((state) => state.general.footballerList);
  const countryList = useAppSelector((state) => state.general.countryList);
  const [tableRows, setTableRows] = useState<{[index: number]: TableRowInfo}>({});

  // === states ===
  const [editingFootballer, setEditingFootballer] = useState<Footballer>();
  const [openedModal, setOpenedModal] = useState(false);

  // === functions ===
  /* Функция, вызываемая при редактировании
   * информации о футболисте */
  const onRowEdit = (f: Footballer) => {
    setEditingFootballer(f);
    setOpenedModal(true);
  };

  /* Функция, вызываемая при отправке
   * */
  const onChangeFormSubmit = (changedData: Footballer) => {
    setOpenedModal(false);
    if (changedData.id) {
      tableRows[changedData.id] =
        generateTableRow(changedData, countryList, onRowEdit);
      setTableRows(tableRows);
      setEditingFootballer(undefined);
    }
  };

  // === useEffects ===
  useEffect(() => {
    dispatch(getFootballerListAction());
    dispatch(getCountryList());
  }, []);

  useEffect(() => {
    if (footballers.length > 0 &&
      Object.keys(countryList).length > 0) {
      setTableRows(generateTableRows(
        footballers,
        countryList,
        onRowEdit
      ));
    }
  }, [JSON.stringify(footballers), countryList]);

  return (
    <Fragment>
      <Box sx={{mt: 6, height: 700, width: '100%'}}>
        <DataGrid
          rows={Object.values(tableRows)}
          columns={COLUMNS}
        />
      </Box>
      <Dialog
        open={openedModal}>
        <FootballerForm
          submitButtonText={'Изменить'}
          successMessage={'Информация изменена'}
          defaultFormData={editingFootballer}
          onSubmit={onChangeFormSubmit}/>
        <Button
          onClick={() => setOpenedModal(false)}>
            Отмена
        </Button>
      </Dialog>
    </Fragment>
  );
}
