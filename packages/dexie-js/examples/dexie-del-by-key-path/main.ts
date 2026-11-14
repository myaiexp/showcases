// Dexie.delByKeyPath(obj, path) removes a nested property
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

const fresh = (): object => ({ name: 'Kalle', address: { street: 'East 13th Street', city: 'New York' } });

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { trees: ['the object'], log: true });
  const [tree] = d.trees;
  let obj = fresh();
  const remove = async (path: string, doomed: string[]): Promise<void> => {
    tree!.show(obj, doomed, 'bad');
    await d.stage.wait(800);
    Dexie.delByKeyPath(obj, path);
    tree!.show(obj);
    d.log.add(`removed ${path}`, 'bad');
  };
  d.say.set('Remove a field with a path.', 'Dexie.delByKeyPath(obj, "address.street")');
  d.run(
    [
      d.step('Remove the street', 'One nested field goes.', 'Dexie.delByKeyPath(obj, "address.street")', () => remove('address.street', ['address.street'])),
      d.step('Remove the address', 'Naming a level removes everything under it.', 'Dexie.delByKeyPath(obj, "address")', () => remove('address', ['address', 'address.city'])),
    ],
    () => {
      obj = fresh();
      tree!.show(obj);
    },
  );
  return d.stage.dispose;
};

export default mount;
