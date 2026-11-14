// The database as a class: its schema, and the Friend class every row is read back as
import { Dexie, type EntityTable } from 'dexie';
import Friend from './Friend.ts';

export default class AppDB extends Dexie {
  friends!: EntityTable<Friend, 'id'>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      friends: '++id, name, age',
    });
    this.friends.mapToClass(Friend);
  }
}
