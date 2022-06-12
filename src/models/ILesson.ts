export interface ILesson {
  id: number;
  date: moment.Moment;
  userId: number;
  studentId: number;
  complete: boolean;
  fullName: string;
  disciplineId: number;
}
