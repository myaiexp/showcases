// on('versionchange'): an old tab is told to let go
import type { Mount } from '@/types.ts';
import { tabDemo } from '../../shared/class-kit.ts';

const V1 = { friends: '++id, name' };
const V2 = { friends: '++id, name, age' };

const mount: Mount = (el, ctx) => {
  const d = tabDemo(el, ctx, 'vchange');
  const { log } = d;
  d.say.set('Two tabs, one database.', "db.on('versionchange', event => ...)");
  d.run([
    d.step('Tab 1 opens (v1)', 'The old version of the app is running.', "new Dexie(name).version(1)", async () => {
      await d.wipe();
      const tab1 = d.tab('Tab 1', 1, V1);
      tab1.on('versionchange', (ev) => void log.add(`Tab 1: asked to go to v${ev.newVersion! / 10}`, 'warn'));
      await tab1.open();
      await tab1.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      log.add('Tab 1: open with 2 friends', 'ok');
    }),
    d.step('Tab 2 upgrades (v2)', 'A newer tab asks for version 2.', "new Dexie(name).version(2).stores(...)", async () => {
      const tab2 = d.tab('Tab 2', 2, V2);
      await tab2.open();
      log.add('Tab 2: upgraded to v2', 'ok');
      log.add('Tab 1: connection closed by Dexie', 'bad');
    }),
    d.step('Tab 1 reloads', 'It starts again, now on v2.', "new Dexie(name).version(2)", async () => {
      const tab1 = d.tab('Tab 1', 2, V2);
      await tab1.open();
      log.add(`Tab 1: back, sees ${await tab1.table('friends').count()} friends`, 'ok');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
