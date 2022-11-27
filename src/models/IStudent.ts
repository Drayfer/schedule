import { IDiscipline } from './IDiscipline';

export interface IStudent {
  id: number;
  name: string;
  surname: string;
  email: string;
  skype: string;
  note: string;
  showBalance: boolean;
  balance: number;
  break: boolean;
  color: string;
  createdDate: Date;
  phone: string;
  parent: string;
  birthday: Date;
  disciplines: IDiscipline[];
}
