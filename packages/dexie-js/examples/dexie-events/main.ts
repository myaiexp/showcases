// Dexie.Events(ctx, ...names): named events with fire() and listeners
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

type CarEvents = ((name: string, listener: () => void) => void) & Record<'move' | 'stop' | 'crash', { fire(): void }>;
const makeEvents = Dexie.Events as unknown as (ctx: object, ...names: string[]) => CarEvents;

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { log: true });
  const { log } = d;
  const car: { on: CarEvents } = { on: null as never };
  const build = (): void => {
    car.on = makeEvents(car, 'move', 'stop', 'crash');
    car.on('move', () => log.add('listener 1: it is moving!', 'ok'));
    car.on('stop', () => log.add('listener 1: it stopped', 'info'));
    car.on('crash', () => log.add('listener 1: crash!', 'bad'));
  };
  d.say.set('A car that announces what it does.', 'car.on = Dexie.Events(car, "move", "stop", "crash")');
  d.run(
    [
      d.step('move', 'The move event fires.', 'car.on.move.fire()', () => car.on.move.fire()),
      d.step('Add a second listener', 'Several can listen to one event.', 'car.on("move", fn)', () => {
        car.on('move', () => log.add('listener 2: wheels rolling', 'warn'));
        log.add('(listener 2 subscribed)', 'muted');
      }),
      d.step('move again', 'Now both hear it.', 'car.on.move.fire()', () => car.on.move.fire()),
      d.step('crash', 'Another event, another listener.', 'car.on.crash.fire()', () => car.on.crash.fire()),
    ],
    build,
  );
  return d.stage.dispose;
};

export default mount;
