// Dexie.derive().from() for inheritance, Dexie.extend() to merge
import type { Mount } from '@/types.ts';
import { dexieStatics as Dexie, objectDemo } from '../../shared/class-kit.ts';

type Mover = { move(): string };

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { trees: ['obj'], log: true });
  const [tree] = d.trees;
  const log = d.log;
  function Vehicle(this: Mover) {}
  Vehicle.prototype.move = (): string => "Don't know how to move";
  function Car(this: Mover) {}
  Dexie.derive(Car).from(Vehicle).extend({ move: (): string => 'The wheels are rolling' });
  const obj = { a: 1 };
  d.say.set('Classes that inherit, objects that merge.', 'Dexie.derive(Car).from(Vehicle)');
  d.run(
    [
      d.step('A plain Vehicle', 'The base class does not know how.', 'new Vehicle().move()', () => log.add(new (Vehicle as never as new () => Mover)().move(), 'warn')),
      d.step('A Car', 'It inherits from Vehicle, and overrides move.', 'new Car().move()', () => {
        const car = new (Car as never as new () => Mover)();
        log.add(`car instanceof Vehicle: ${car instanceof (Vehicle as never as new () => Mover)}`, 'ok');
        log.add(car.move(), 'ok');
      }),
      d.step('Dexie.extend(obj, obj2)', 'Fields of the second land on the first.', 'Dexie.extend({ a: 1 }, { b: 2 })', () => {
        tree!.show(Dexie.extend(obj, { b: 2 }), ['b']);
      }),
    ],
    () => {
      delete (obj as { b?: number }).b;
      tree!.show(obj);
    },
  );
  return d.stage.dispose;
};

export default mount;
