// A failing write in a transaction undoes the writes before it, with no awaits needed
import type { Mount } from '@/types.ts';
import { bank, settle, watch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Two adds fired off together.');
  d.run([
    d.step('One id taken', 'Id 2 is taken: Carol is undone too.', 'put(Carol); add(id 2)  // no await', async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, () => {
        watch(log);
        t.put({ id: 3, name: 'Carol', balance: 20 });
        t.add({ id: 2, name: 'Bob again', balance: 0 });
      }));
    }, 2600),
    d.step('Both new', 'Both ids are free: both saved.', 'put(Carol); put(Dan)  // no await', async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, () => {
        watch(log);
        t.put({ id: 3, name: 'Carol', balance: 20 });
        t.put({ id: 4, name: 'Dan', balance: 5 });
      }));
    }),
  ]);
  return stage.dispose;
};

export default mount;
