import moment from 'moment';

export interface INotification {
  id: number;
  text: string;
  date: moment.Moment;
  complete: boolean;
}

export interface IOption {
  currency: string;
  notification: boolean;
  notifyMinutes: number;
  notifyVolume: number;
  rateWithBalance: number;
  rateWithoutBalance: number;
  deletedStudents: number;
  monthLessons: number;
  totalLessons: number;
  monthIncome: number;
  totalIncome: number;
  weekIncome: number;
  notificationsArr: INotification[];
}
