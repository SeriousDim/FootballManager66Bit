import {Sex} from './sex';

export type Footballer = {
  id?: number
  name: string,
  surname: string,
  sex: Sex,
  birthDate?: Date | string,
  team: string,
  country: string
};

export type TableRowInfo = Footballer | {
  editButton: () => void,
  sex: string,
  birthDate: string,
  country: string
};
