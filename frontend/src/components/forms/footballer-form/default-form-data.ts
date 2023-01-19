import {Sex} from '../../../types/sex';
import {Footballer} from '../../../types/footballer';

export const DEFAULT_FORM_DATA: Footballer = {
  name: '',
  surname: '',
  sex: Sex.MALE,
  birthDate: null,
  team: '',
  country: ''
}
