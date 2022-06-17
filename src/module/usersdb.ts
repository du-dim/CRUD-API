import { IUsers } from '../types/type';

class Database {
  data: IUsers[];
  constructor() {
    this.data = [];
  }
  write(newUser: IUsers) {
    this.data.push(newUser);
  }

  read(id: string) {
    const user = this.data.filter((u) => u.id === id);
    return user;
  }
}

export const usersDB = new Database();
