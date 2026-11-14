// Dexie.shallowClone(obj): top-level fields are copied, nested objects are shared
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

type Person = { name: string; address: { city: string } };
const fresh = (): Person => ({ name: 'Kalle', address: { city: 'New York' } });

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { trees: ['original', 'shallowClone'] });
  const [left, right] = d.trees;
  let orig = fresh();
  let copy: Person | null = null;
  const draw = (hot: string[] = [], tone: 'warn' | 'bad' = 'warn'): void => {
    left!.show(orig, hot, tone);
    if (copy) right!.show(copy, hot, 'warn');
  };
  d.say.set('Copy an object the quick way.', 'Dexie.shallowClone(obj)');
  d.run(
    [
      d.step('Clone it', 'The copy looks identical.', 'const copy = Dexie.shallowClone(orig)', () => {
        copy = Dexie.shallowClone(orig);
        draw();
      }),
      d.step('Rename the copy', 'A top-level change stays in the copy.', 'copy.name = "Olle"', () => {
        copy!.name = 'Olle';
        right!.show(copy!, ['name']);
      }),
      d.step('Move the copy', 'A nested change leaks into the original!', 'copy.address.city = "Paris"', () => {
        copy!.address.city = 'Paris';
        draw(['address.city'], 'bad');
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
