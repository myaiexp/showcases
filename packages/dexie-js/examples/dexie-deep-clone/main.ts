// Dexie.deepClone(obj): nested objects are copied too; Dates keep their type
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

type Person = { name: string; born: Date; address: { city: string } };
const fresh = (): Person => ({ name: 'Kalle', born: new Date(1990, 4, 17), address: { city: 'New York' } });

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { trees: ['original', 'deepClone'], log: true });
  const [left, right] = d.trees;
  let orig = fresh();
  let copy: Person | null = null;
  d.say.set('Copy an object all the way down.', 'Dexie.deepClone(obj)');
  d.run(
    [
      d.step('Clone it', 'Every level is copied.', 'const copy = Dexie.deepClone(orig)', () => {
        copy = Dexie.deepClone(orig);
        left!.show(orig);
        right!.show(copy);
      }),
      d.step('Move the copy', 'The original is not touched.', 'copy.address.city = "Paris"', () => {
        copy!.address.city = 'Paris';
        left!.show(orig);
        right!.show(copy!, ['address.city']);
        d.log.add(`orig.address === copy.address: ${orig.address === copy!.address}`, 'ok');
      }),
      d.step('Dates stay dates', 'The copy keeps its type.', 'copy.born instanceof Date', () => {
        d.log.add(`copy.born instanceof Date: ${copy!.born instanceof Date}`, 'ok');
        d.log.add(`same Date object: ${copy!.born === orig.born}`, 'ok');
      }),
    ],
    () => {
      orig = fresh();
      copy = null;
      left!.show(orig);
    },
  );
  return d.stage.dispose;
};

export default mount;
