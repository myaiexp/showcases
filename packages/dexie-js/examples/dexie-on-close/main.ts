// on('close') fires for an explicit close() and for a close forced from outside
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { tabDemo } from '../../shared/class-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = tabDemo(el, ctx, 'closeevt');
  const { log } = d;
  d.say.set('Know when the connection ends.', "db.on('close', () => ...)");
  d.run([
    d.step('Open and subscribe', 'A listener waits for the close.', "db.on('close', () => ...)", async () => {
      await d.wipe();
      const db = d.tab('Tab 1', 1, { friends: '++id, name' });
      db.on('close', () => void log.add('close event fired', 'warn'));
      await db.open();
      log.add('opened', 'ok');
    }),
    d.step('close()', 'Closing on purpose fires it.', 'db.close()', async () => {
      log.add('calling close()', 'muted');
      d.get('Tab 1').close();
    }),
    d.step('Deleted from outside', 'Reopened, then deleted by name: it fires again.', 'await Dexie.delete(name)', async () => {
      await d.get('Tab 1').open();
      log.add('reopened', 'ok');
      log.add('Dexie.delete(name) from elsewhere', 'muted');
      await Dexie.delete(d.name);
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
