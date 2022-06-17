import { IUsers } from '../types/type';

class Database {
  data: IUsers[];
  constructor() {
    this.data = [];
  }
  create(newUser: IUsers) {
    this.data.push(newUser);
  }

  read(id: string) {
    const user = this.data.filter((u) => u.id === id);
    return user;
  }

  update(newUser: IUsers) {
    const index = this.data.findIndex((u) => u.id === newUser.id);
    this.data[index] = { ...this.data[index], ...newUser };
  }

  delete(id: string) {
    this.data = this.data.filter((u) => u.id !== id);
  }
}

export const usersDB = new Database();
