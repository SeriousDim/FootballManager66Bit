import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Footballer} from '../../../types/footballer';
import {Sex} from '../../../types/sex';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {addFootballerAction, getCountryList, getTeamListAction} from '../../../service/async-actions/general-actions';
import {countriesToSelectItems} from '../../../utils/footballer-utils';
import {api} from '../../../store/store';
import {toast} from 'react-toastify';
import {DEFAULT_FORM_DATA} from './default-form-data';

export type FootballerFormProps = {
  submitButtonText: string,
  successMessage: string,
  defaultFormData?: Footballer,
  onSubmit?: (f: Footballer) => void
}

export function FootballerForm(props:FootballerFormProps) {
  const dispatch = useAppDispatch();
  const countryList = useAppSelector((state) => state.general.countryList);
  const teamList = useAppSelector((state) => state.general.teamList);
  const [countryItems, setCountryItems] = useState<ReturnType<typeof countriesToSelectItems>>([]);

  const [formData, setFormData] = useState<Footballer>(props.defaultFormData || DEFAULT_FORM_DATA);

  useEffect(() => {
    dispatch(getCountryList());
    dispatch(getTeamListAction());

    return;
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setCountryItems(countriesToSelectItems(countryList));
    }

    return;
  }, [countryList]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addFootballerAction(formData))
      .then((response) => {
        toast.success(props.successMessage)

        if (props.onSubmit) {
          props?.onSubmit(response.payload as Footballer);
        }
      });

    console.log(formData);
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1},
      }} onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            name="name"
            label="Имя"
            variant="outlined"
            size="small"
            required
            onChange={onFieldChange}
            value={formData.name}/>
          <TextField
            name="surname"
            label="Фамилия"
            variant="outlined"
            size="small"
            required
            onChange={onFieldChange}
            value={formData.surname}/>

          <Box
            sx={{m: 2, textAlign: 'left'}}>
            <FormLabel>
              Пол
            </FormLabel>
            <RadioGroup
              name="sex"
              row
              value={formData.sex}
              onChange={onFieldChange}>
              <FormControlLabel
                value={Sex.MALE}
                control={<Radio />}
                label="М"/>
              <FormControlLabel
                value={Sex.FEMALE}
                control={<Radio />}
                label="Ж"/>
            </RadioGroup>
          </Box>

          <TextField
            name="birthDate"
            label="Дата рождения"
            type="date"
            variant="outlined"
            size="small"
            required
            InputLabelProps={{ shrink: true }}
            onChange={onFieldChange}
            value={formData.birthDate}/>

          <Autocomplete
            sx={{width: 227}}
            freeSolo
            options={teamList}
            onInputChange={(event, newValue) => {
              setFormData({...formData, team: newValue});
            }}
            inputValue={formData.team}
            renderInput={(params) => (
              <TextField
                {...params}
                name="team"
                label="Команда"
                variant="outlined"
                size="small"
                required
                >
              </TextField>
            )}/>

          <TextField
            name="country"
            label="Страна"
            variant="outlined"
            size="small"
            select
            required
            onChange={onFieldChange}
            value={formData.country}>
            {
              countryItems.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}>
                  {item.label}
                </MenuItem>
              ))
            }
          </TextField>
          <Button type="submit">
            {props.submitButtonText}
          </Button>
        </FormControl>
    </Box>
  );
}