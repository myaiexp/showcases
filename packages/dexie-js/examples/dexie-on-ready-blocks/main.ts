// on('ready') returning a promise holds back every other query until it resolves
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'readyblocks', side: 'log' });
  const { lab, log, stage } = d;
  d.say.set('Prepare the data before anyone reads it.', "db.on('ready', () => promise)");
  d.run([
    d.step('Open, ask at once', 'The query waits for the ready job.', "db.on('ready', ...); await db.tasks.toArray()", async () => {
      await lab.wipe();
      log.clear();
      const db = lab.next((x) => {
        x.version(1).stores({ tasks: '++id, title' });
        x.on('ready', (vip) => {
          log.add('ready job started (slow)', 'warn');
          // Dexie.Promise keeps the job inside the ready window, so its own writes are not blocked.
          return new Dexie.Promise<void>((resolve) => stage.after(900, resolve)).then(() =>
            vip.table('tasks').bulkAdd([{ title: 'Water plants' }, { title: 'Buy milk' }, { title: 'Call Per' }]).then(() => log.add('ready job done: 3 tasks', 'ok')),
          );
        });
      });
      log.add('query sent: tasks.toArray()', 'info');
      const started = performance.now();
      const rows = await db.table('tasks').toArray();
      log.add(`answered after ${Math.round(performance.now() - started)} ms: ${rows.length} rows`, 'ok');
      lab.show('tasks', [ID, 'title']);
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
