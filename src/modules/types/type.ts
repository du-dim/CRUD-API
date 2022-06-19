export type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type TUserDB = {
  data: TUser[];
  create: (newUser: TUser) => void;
  read: (id: string) => TUser;
  update: (newUser: TUser) => void;
  delete: (id: string) => void;
};
