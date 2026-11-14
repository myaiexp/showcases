// A mode ending in "?" joins the running transaction only when it fits, else starts its own
import type { Mount } from '@/types.ts';
import { attempt } from '../../shared/demo.ts';
import { bank, settle, why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('A helper that adds 5 to Alice.');
  const bump = (mode: 'rw' | 'rw?'): Promise<unknown> =>
    db.transaction(mode, t, async (tx) => {
      log.add(tx.parent ? 'helper joined the caller' : 'helper has its own transaction');
      const a = await t.get(1);
      await t.update(1, { balance: a.balance + 5 });
    });
  const call = (outer: 'r' | 'rw', mode: 'rw' | 'rw?'): Promise<unknown> => {
    log.clear();
    let inner: Promise<{ error?: Error }> | undefined;
    const p = db.transaction(outer, t, async () => {
      log.add(`caller is '${outer}'`, 'muted');
      await t.get(1);
      inner = attempt(bump(mode));
    });
    return settle(log, p, 'caller finished').then(async () => {
      const r = await inner;
      if (r?.error) log.add(`helper failed: ${why(r.error)}`, 'bad');
      else log.add('helper saved', 'ok');
    });
  };
  d.run([
    d.step("'rw' in 'r'", "'rw' does not fit a read-only caller.", "transaction('rw', ...)", () => call('r', 'rw'), 2800),
    d.step("'rw?' in 'r'", "'rw?' starts its own instead.", "transaction('rw?', ...)", () => call('r', 'rw?'), 2800),
    d.step("'rw?' in 'rw'", "'rw?' fits, so it joins the caller.", "transaction('rw?', ...)", () => call('rw', 'rw?'), 2800),
  ]);
  return stage.dispose;
};

export default mount;
