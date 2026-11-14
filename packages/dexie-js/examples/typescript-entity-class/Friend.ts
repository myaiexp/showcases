// An entity class: rows come back as Friends, with two methods
import { Entity } from 'dexie';
import type AppDB from './AppDB.ts';

export default class Friend extends Entity<AppDB> {
  id!: number;
  name!: string;
  age!: number;

  // A method that reaches the database through this.db, inherited from Entity<AppDB>.
  async birthday() {
    await this.db.friends.update(this.id, (friend) => {
      ++friend.age;
    });
  }

  // Worked out from the stored age whenever it is asked, never stored itself.
  lifeStage(): string {
    return this.age < 18 ? 'child' : this.age < 65 ? 'adult' : 'senior';
  }
}
