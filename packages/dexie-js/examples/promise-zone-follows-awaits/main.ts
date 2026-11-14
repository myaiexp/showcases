// A value set on the Promise zone follows every await, but not a timer callback
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { newZone, zone } from '../../shared/zone-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, t, log } = d;
  d.say.set('Who am I serving? Ask the zone.');
  const who = (): string => String(zone().customer ?? '(nobody)');
  const flow = (name: string, indent: string): Promise<void> =>
    newZone(async () => {
      zone().customer = name;
      log.add(`${indent}set: ${who()}`);
      await t.get(1);
      log.add(`${indent}after db call: ${who()}`);
      await stage.wait(name === 'Ada' ? 50 : 90);
      log.add(`${indent}after timer: ${who()}`);
    });
  d.run([
    d.step('One flow', 'The value survives awaits.', 'Dexie.Promise.newPSD(fn)', async () => {
      log.clear();
      log.add(`outside: ${who()}`, 'muted');
      await flow('Ada', '');
      log.add(`outside again: ${who()}`, 'muted');
    }, 2800),
    d.step('Two flows', 'Two flows, two separate values.', 'newPSD(fn); newPSD(fn)', async () => {
      log.clear();
      await Promise.all([flow('Ada', 'A '), flow('Ben', 'B ')]);
    }, 2800),
    d.step('Timer callback', 'A plain timer callback loses it.', 'setTimeout(() => zone.customer)', async () => {
      log.clear();
      await newZone(async () => {
        zone().customer = 'Ada';
        log.add(`set: ${who()}`);
        stage.after(30, () => log.add(`in timer callback: ${who()}`, 'warn'));
        await stage.wait(80);
        log.add(`after timer: ${who()}`);
      });
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
