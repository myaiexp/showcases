// Dexie.setByKeyPath(obj, path, value) writes a nested value
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

const fresh = (): Record<string, unknown> => ({ name: 'Kalle', address: { street: 'East 13th Street', city: 'New York' } });

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { trees: ['the object'], log: true });
  const [tree] = d.trees;
  let obj = fresh();
  const write = (path: string, value: unknown, hot: string[]): void => {
    Dexie.setByKeyPath(obj, path, value);
    tree!.show(obj, hot);
    d.log.add(`${path} = ${JSON.stringify(value)}`, 'warn');
  };
  d.say.set('Write into an object with a path.', 'Dexie.setByKeyPath(obj, "address.street", "Elm Street")');
  d.run(
    [
      d.step('Replace a value', 'The street is overwritten.', 'Dexie.setByKeyPath(obj, "address.street", "Elm Street")', () =>
        write('address.street', 'Elm Street', ['address.street']),
      ),
      d.step('Add a new field', 'A missing field at the end is created.', 'Dexie.setByKeyPath(obj, "address.zip", "10003")', () =>
        write('address.zip', '10003', ['address.zip']),
      ),
      d.step('Create new levels', 'Missing levels in the middle are created too.', 'Dexie.setByKeyPath(obj, "phone.home.number", "555-0100")', () =>
        write('phone.home.number', '555-0100', ['phone', 'phone.home', 'phone.home.number']),
      ),
    ],
    () => {
      obj = fresh();
      tree!.show(obj);
    },
  );
  return d.stage.dispose;
};

export default mount;
