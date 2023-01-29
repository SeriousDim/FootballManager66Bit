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
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  addFootballerAction,
  addFootballerActionWs,
  getCountryList,
  getTeamListAction
} from '../../../service/async-actions/general-actions';
import {generateCountrySelectItems} from '../../../utils/footballer-utils';
import {toast} from 'react-toastify';
import {DEFAULT_FORM_DATA} from './default-form-data';

export type FootballerFormProps = {
  /** Текст для кнопки отправки */
  submitButtonText: string,
  /** Сообщение при успешной отправке */
  successMessage: string,
  /** Данные по умолчанию для полей формы */
  defaultFormData?: Footballer,
  /**
   * Колбэк при отправке
   * @param f данные футболиста, которые вернет сервер после отправке
   */
  onSubmit?: (f: Footballer) => void
}

/**
 * Форма для создания и редактирования данных
 * о футболисте
 *
 * @param props
 * @constructor
 */
export function FootballerForm(props: FootballerFormProps) {
  const dispatch = useAppDispatch();
  const countryList = useAppSelector((state) => state.general.countryList);
  const teamList = useAppSelector((state) => state.general.teamList);

  // айтемы с данными стран для выпадающего списка
  const [countryItems, setCountryItems] =
    useState<ReturnType<typeof generateCountrySelectItems>>([]);

  const [formData, setFormData] =
    useState<Footballer>(props.defaultFormData || DEFAULT_FORM_DATA);

  useEffect(() => {
    dispatch(getCountryList());
    dispatch(getTeamListAction());
  }, []);

  useEffect(() => {
    // генерируем айтемы, когда загрузится список стран с сервера
    setCountryItems(generateCountrySelectItems(countryList));
  }, [countryList]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
    dispatch(addFootballerAction(formData))
      .then((response) => {
        toast.success(props.successMessage);

        if (props.onSubmit) {
          props?.onSubmit(response.payload as Footballer);
        }
      });
     */
    dispatch(addFootballerActionWs(formData));
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

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
              control={<Radio/>}
              label="М"/>
            <FormControlLabel
              value={Sex.FEMALE}
              control={<Radio/>}
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
          InputLabelProps={{shrink: true}}
          onChange={onFieldChange}
          defaultValue={(formData?.birthDate as string).slice(0, 10)}/>

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