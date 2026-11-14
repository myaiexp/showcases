// on('blocked'): an upgrade waits while another tab refuses
import type { Mount } from '@/types.ts';
import { tabDemo } from '../../shared/class-kit.ts';

const V1 = { friends: '++id, name' };
const V2 = { friends: '++id, name, age' };

const mount: Mount = (el, ctx) => {
  const d = tabDemo(el, ctx, 'blocked');
  const { log, stage } = d;
  let pending: Promise<unknown> = Promise.resolve();
  d.say.set('An upgrade that has to wait.', "db.on('blocked', () => ...)");
  d.run([
    d.step('Tab 1 opens (v1)', 'This tab will refuse to move.', "db.on('versionchange', () => false)", async () => {
      await d.wipe();
      const tab1 = d.tab('Tab 1', 1, V1);
      tab1.on('versionchange', () => {
        log.add('Tab 1: asked to upgrade. No.', 'warn');
        return false; // keeps the connection open and Dexie's default close off
      });
      await tab1.open();
      log.add('Tab 1: open, will not give way', 'ok');
    }),
    d.step('Tab 2 asks for v2', 'Its upgrade cannot start: blocked.', "db.on('blocked', () => ...)", async () => {
      const tab2 = d.tab('Tab 2', 2, V2);
      tab2.on('blocked', () => void log.add('Tab 2: blocked! Close other tabs.', 'bad'));
      pending = tab2.open().catch(() => undefined);
      await stage.wait(900);
    }),
    d.step('Tab 1 lets go', 'The waiting upgrade goes through.', 'db.close()', async () => {
      log.add('Tab 1: closing', 'muted');
      d.get('Tab 1').close();
      await pending;
      log.add('Tab 2: upgraded to v2', 'ok');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
