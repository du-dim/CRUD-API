import { TUser, TUserDB } from './types/type.js';
import { readJSON } from '../modules/writeRead/readJSON.js';
import { writeJSON } from '../modules/writeRead/writeJSON.js';

class Database {
  data: TUser[];
  constructor() {
    this.data = readJSON;
  }
  create(newUser: TUser) {
    this.data.push(newUser);
    writeJSON(this.data);
  }

  read(id: string) {
    const user = this.data.filter((u) => u.id === id);
    return user[0];
  }

  update(newUser: TUser) {
    const index = this.data.findIndex((u) => u.id === newUser.id);
    this.data[index] = { ...this.data[index], ...newUser };
    writeJSON(this.data);
  }

  delete(id: string) {
    this.data = this.data.filter((u) => u.id !== id);
    writeJSON(this.data);
  }
}

export const usersDB = new Database() as TUserDB;
