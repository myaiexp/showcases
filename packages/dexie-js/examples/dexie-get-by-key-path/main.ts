// Dexie.getByKeyPath(obj, path) reads a nested value from a dotted path
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

const fresh = (): object => ({ name: 'Kalle', address: { street: 'East 13th Street', city: 'New York' } });

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { trees: ['the object'], log: true });
  const [tree] = d.trees;
  const obj = fresh();
  const read = (path: string | string[], hot: string): void => {
    tree!.show(obj, [hot], 'ok');
    d.log.add(`${JSON.stringify(path)} -> ${JSON.stringify(Dexie.getByKeyPath(obj, path))}`, 'ok');
  };
  d.say.set('Reach into an object with a path.', 'Dexie.getByKeyPath(obj, "address.city")');
  d.run(
    [
      d.step('"name"', 'A top-level field.', 'Dexie.getByKeyPath(obj, "name")', () => read('name', 'name')),
      d.step('"address.street"', 'A dot goes one level in.', 'Dexie.getByKeyPath(obj, "address.street")', () => read('address.street', 'address.street')),
      d.step('["address", "city"]', 'The path can also be an array.', 'Dexie.getByKeyPath(obj, ["address", "city"])', () => read(['address', 'city'], 'address.city')),
      d.step('"address.zip"', 'A path that is not there gives undefined.', 'Dexie.getByKeyPath(obj, "address.zip")', () => read('address.zip', 'address')),
    ],
    () => tree!.show(obj),
  );
  return d.stage.dispose;
};

export default mount;
