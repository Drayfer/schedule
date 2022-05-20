export interface IUser {
  email: string;
  name: string;
  token: string;
  id: number;
  activate: boolean;
  expToken: Date;
  lessonsHistory: number;
}
