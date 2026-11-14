// Catch only to log, then rethrow, and the transaction still aborts
import type { Mount } from '@/types.ts';
import { bank, settle, watch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Log the failure, but keep it a failure.');
  const run = (how: 'swallow' | 'throw' | 'reject'): Promise<unknown> =>
    db.transaction('rw', t, () => {
      watch(log);
      return Promise.all([
        t.put({ id: 3, name: 'Carol', balance: 20 }),
        t.add({ id: 2, name: 'Bob again', balance: 0 }).catch((e: unknown) => {
          log.add('logged the failure', 'warn');
          if (how === 'throw') throw e;
          return how === 'reject' ? Promise.reject(e) : undefined;
        }),
      ]);
    });
  d.run([
    d.step('Log only', 'Logged only: counts as handled.', '.catch(e => log(e))', async () => {
      log.clear();
      await settle(log, run('swallow'));
    }, 2600),
    d.step('Log + throw', 'Logged, then rethrown: aborts.', '.catch(e => { log(e); throw e })', async () => {
      log.clear();
      await settle(log, run('throw'));
    }, 2600),
    d.step('Log + reject', 'Or return a rejected promise.', 'return Promise.reject(e)', async () => {
      log.clear();
      await settle(log, run('reject'));
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
