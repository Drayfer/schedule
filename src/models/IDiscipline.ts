import { IStudent } from './IStudent';
export interface IDiscipline {
  id: number;
  title: string;
  color: string;
  students: IStudent[];
  deletedAt?: Date;
}
