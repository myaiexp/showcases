// Dexie.vip(): a timer call inside on("ready") would deadlock without it
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'vip', side: 'log' });
  const { lab, log, stage } = d;
  const none = (): void => undefined;
  const attempt = async (useVip: boolean): Promise<void> => {
    await lab.wipe();
    log.clear();
    const db = lab.next((x) => {
      x.version(1).stores({ friends: '++id, name' });
      x.on('ready', () => {
        log.add('ready job: waiting on a timer', 'info');
        return new Dexie.Promise<void>((resolve) => {
          // A plain timer leaves Dexie's zone, so the VIP pass is lost here.
          stage.after(400, () => {
            log.add(useVip ? 'timer: saving inside Dexie.vip()' : 'timer: saving without vip()', 'warn');
            const save = (): PromiseLike<unknown> => x.table('friends').put({ id: 1, name: 'Urban' });
            (useVip ? Dexie.vip(save) : save()).then(() => {
              log.add('saved: ready job can finish', 'ok');
              resolve();
            }, none);
          });
        });
      });
    });
    const opened = db.open().then(() => 'open' as const, () => 'refused' as const);
    const outcome = await Promise.race([opened, stage.wait(1500).then(() => 'stuck' as const)]);
    if (outcome === 'stuck') {
      log.add('still waiting: deadlock. Closing it.', 'bad');
      db.close();
    } else lab.show('friends', [ID, 'name']);
  };
  d.say.set('A ready job that calls the database later.', 'Dexie.vip(() => db.friends.put(...))');
  d.run([
    d.step('Without vip()', 'The save waits for ready; ready waits for the save.', 'setTimeout(() => db.friends.put(...))', () => attempt(false), 3200),
    d.step('With vip()', 'The save is let through.', 'setTimeout(() => Dexie.vip(() => db.friends.put(...)))', () => attempt(true), 2600),
  ]);
  return stage.dispose;
};

export default mount;
