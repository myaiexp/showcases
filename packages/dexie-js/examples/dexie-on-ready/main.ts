// db.on('ready') one-shot versus sticky subscribers across close and reopen
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'ready', side: 'log' });
  const { lab, log } = d;
  d.say.set('Run something when the database is ready.', "db.on('ready', fn)");
  d.run([
    d.step('Subscribe, then open', 'Both subscribers fire.', "db.on('ready', fn); db.on('ready', fn, true)", async () => {
      await lab.wipe();
      const db = lab.next((x) => {
        x.version(1).stores({ friends: '++id, name' });
        x.on('ready', () => log.add('one-shot ready', 'ok'));
        x.on('ready', () => log.add('sticky ready', 'warn'), true);
      });
      log.add('open()', 'muted');
      await db.open();
    }),
    d.step('Close and reopen', 'Only the sticky one comes back.', 'db.close(); await db.open()', async () => {
      lab.db.close();
      log.add('close(), open()', 'muted');
      await lab.db.open();
    }),
    d.step('Subscribe while open', 'An open database runs it at once.', "db.on('ready', fn)", async () => {
      log.add("subscribing to an open db", 'muted');
      lab.db.on('ready', () => log.add('late ready, immediately', 'ok'));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
