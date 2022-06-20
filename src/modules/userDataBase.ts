import { TUser, TUserDB } from './types/type.js';
import { readJSON } from '../modules/writeRead/readJSON.js';
import { writeJSON } from '../modules/writeRead/writeJSON.js';

class Database {
  data: TUser[];
  constructor() {
    this.data = readJSON;
  }
  async create(newUser: TUser) {
    this.data.push(newUser);
    await writeJSON(this.data);
  }

  read(id: string) {
    const user = this.data.filter((u) => u.id === id);
    return user[0];
  }

  async update(newUser: TUser) {
    const index = this.data.findIndex((u) => u.id === newUser.id);
    this.data[index] = { ...this.data[index], ...newUser };
    await writeJSON(this.data);
  }

  async delete(id: string) {
    this.data = this.data.filter((u) => u.id !== id);
    await writeJSON(this.data);
  }
}

export const usersDB = new Database() as TUserDB;
