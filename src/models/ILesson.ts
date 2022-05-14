export interface ILesson {
  id: number;
  date: moment.Moment;
  userId: number;
  studentId: number;
  complete: boolean;
  category: string;
  fullName: string;
}
