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

export type FootballerDict = {[index: number]: Footballer};

export type TableRow = Footballer | {editButton: () => void};
