// Transaction examples: a two-account bank, transaction event logging, outcome helpers
import Dexie, { type Table, type Transaction } from 'dexie';
import type { MountContext } from '@/types.ts';
import { attempt, demo, ID_COL, type Demo, type DemoOptions } from './demo.ts';
import type { Log } from './panels.ts';
import type { Column } from './table-view.ts';

export const BALANCE_COL: Column = { field: 'balance', width: '4.4em' };
export const ACCOUNT_COLS: readonly Column[] = [ID_COL, { field: 'name' }, BALANCE_COL];
export const ACCOUNTS = [
  { id: 1, name: 'Alice', balance: 100 },
  { id: 2, name: 'Bob', balance: 50 },
];

/** A demo with an `accounts` table (Alice 100, Bob 50) and an event log beside the grid. */
export function bank(el: HTMLElement, ctx: MountContext, o: Partial<DemoOptions> = {}): Demo {
  return demo(el, ctx, {
    table: 'accounts',
    stores: 'id, name',
    seed: ACCOUNTS,
    columns: ACCOUNT_COLS,
    side: 'log',
    hint: 'Press the steps in any order. Reset puts the accounts back.',
    ...o,
  });
}

/** The error as one short phrase: a plain Error shows its message, a Dexie error its name. */
export function why(e: unknown): string {
  const err = e as Error | undefined;
  return !err ? 'unknown' : err.name === 'Error' ? err.message : err.name;
}

/** Logs the transaction's complete / abort / error events as they fire. */
export function watch(log: Log, tx: Transaction = Dexie.currentTransaction): void {
  tx.on('complete', () => log.add('on complete: saved', 'ok'));
  tx.on('abort', () => log.add('on abort: rolled back', 'bad'));
  tx.on('error', (e: unknown) => log.add(`on error: ${why(e)}`, 'warn'));
}

/** Awaits a transaction promise; logs the verdict (without events) and returns the error if any. */
export async function settle<T>(log: Log, p: PromiseLike<T>, ok = 'committed: saved'): Promise<Error | undefined> {
  const r = await attempt(p);
  if (r.error) log.add(`rejected: ${why(r.error)}`, 'bad');
  else log.add(ok, 'ok');
  return r.error;
}

/** Moves money Alice -> Bob in two writes; `fail` throws between them. Meant to run in a transaction. */
export async function transfer(t: Table, log: Log, amount: number, o: { fail?: boolean } = {}): Promise<void> {
  const a = await t.get(1);
  await t.update(1, { balance: a.balance - amount });
  log.add(`Alice -${amount}`);
  if (o.fail) throw new Error("Bob's account is closed");
  const b = await t.get(2);
  await t.update(2, { balance: b.balance + amount });
  log.add(`Bob +${amount}`);
}

/** All the money in the table. */
export async function total(t: Table): Promise<number> {
  return (await t.toArray()).reduce((sum: number, r: { balance: number }) => sum + r.balance, 0);
}

/** Milliseconds since this was called, as "120ms". */
export function stopwatch(): () => string {
  const t0 = performance.now();
  return () => `${Math.round(performance.now() - t0)}ms`;
}
