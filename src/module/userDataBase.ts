import { TUser, TUserDB } from './types/type.js';

class Database {
  data: TUser[];
  constructor() {
    this.data = [];
  }
  create(newUser: TUser) {
    this.data.push(newUser);
  }

  read(id: string) {
    const user = this.data.filter((u) => u.id === id);
    return user[0];
  }

  update(newUser: TUser) {
    const index = this.data.findIndex((u) => u.id === newUser.id);
    this.data[index] = { ...this.data[index], ...newUser };
  }

  delete(id: string) {
    this.data = this.data.filter((u) => u.id !== id);
  }
}

export const usersDB = new Database() as TUserDB;
