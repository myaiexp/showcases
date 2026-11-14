// finally() runs after success and failure alike, and leaves the outcome as it was
import type { Mount } from '@/types.ts';
import { attempt, demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, t, log } = d;
  d.say.set('Show a spinner, always hide it.');
  const run = async (row: { id: number; name: string; age: number }): Promise<void> => {
    log.clear();
    log.add('spinner on', 'muted');
    const p = t
      .add(row)
      .then((k: unknown) => log.add(`then: saved as ${k}`, 'ok'))
      .catch((e: Error) => {
        log.add(`catch: ${why(e)}`, 'bad');
        throw e;
      })
      .finally(() => log.add('finally: spinner off', 'warn'));
    const r = await attempt(p);
    log.add(r.error ? `outcome: still rejected` : 'outcome: still resolved', 'muted');
  };
  d.run([
    d.step('add() works', 'It works: then, then finally.', 'add(...).then().finally(fn)', () => run({ id: 8, name: 'Hedda', age: 66 })),
    d.step('add() fails', 'It fails: catch, then finally.', 'add(...).catch().finally(fn)', () => run({ id: 2, name: 'Twin', age: 1 })),
  ]);
  return stage.dispose;
};

export default mount;
