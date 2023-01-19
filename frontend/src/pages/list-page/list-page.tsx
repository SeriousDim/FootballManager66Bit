import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Fragment, useEffect, useState} from 'react';
import {getCountryList, getFootballerListAction} from '../../service/async-actions/general-actions';
import {Footballer, FootballerDict, TableRow} from '../../types/footballer';
import {getTableRows, transformFootballerToTableRow} from '../../utils/footballer-utils';
import {COLUMNS} from './grid-columns';
import {Box, Button, Dialog} from '@mui/material';
import {FootballerForm} from '../../components/forms/footballer-form/footballer-form';

export function ListPage() {
  const dispatch = useAppDispatch();

  const footballers = useAppSelector((state) => state.general.footballerList);
  const countryList = useAppSelector((state) => state.general.countryList);

  const onRowEdit = (f: Footballer) => {
    setEditingFootballer(f);
    setOpenedModal(true);
  };

  const [editingFootballer, setEditingFootballer] = useState<Footballer>();
  const [openedModal, setOpenedModal] = useState(false);
  const [tableRows, setTableRows] =
    useState<{[index: number]: TableRow}>([]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getFootballerListAction());
      dispatch(getCountryList());
    }

    return;
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (footballers.length > 0 &&
          Object.keys(countryList).length > 0) {
        const footballerDict: FootballerDict = {};

        footballers.map((item) => {
          if (item.id) {
            footballerDict[item.id] = item;
          }
        });

        setTableRows(
          getTableRows(
            footballerDict,
            countryList,
            onRowEdit
            ));
      }
    }

    return;
  }, [footballers, countryList]);

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
          submitButtonText={"Изменить"}
          successMessage={"Информация изменена"}
          defaultFormData={editingFootballer}
          onSubmit={(changedData) => {
            setOpenedModal(false);
            if (changedData.id) {
              tableRows[changedData.id] =
                transformFootballerToTableRow(changedData, countryList, onRowEdit);
              setTableRows(tableRows);
            }
          }}/>
        <Button
          onClick={() => setOpenedModal(false)}>
            Отмена
        </Button>
      </Dialog>
    </Fragment>

  );
}
