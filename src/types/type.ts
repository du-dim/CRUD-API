export interface IUsers {
  id: number;
  username: string;
  age: number;
  hobbies: string[];
}

export enum EMethods {
  POST,
  GET,
  PATCH,
  DELETE
}
