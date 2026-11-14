// Two-grid scene: an accounts table next to an audit-log table, for "this write survives" examples
import Dexie, { type Table } from 'dexie';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { attempt } from './demo.ts';
import { caption, columns, type Caption } from './panels.ts';
import { createStage, type Stage } from './stage.ts';
import { tableView, type TableView } from './table-view.ts';
import { tour, type Step } from './tour.ts';
import { ACCOUNTS, why } from './tx-kit.ts';

export interface Audit {
  stage: Stage;
  db: Dexie;
  accounts: Table;
  logs: Table;
  say: Caption;
  accountsView: TableView;
  logsView: TableView;
  /** Puts accounts back and empties the audit log. */
  reset(): Promise<void>;
  /** Runs `p`, then says how it ended; the grids show what survived. */
  verdict(p: PromiseLike<unknown>, okText: string, failText: string): Promise<void>;
  step(label: string, text: string, code: string, fn: () => unknown, hold?: number): Step;
  run(steps: readonly Step[]): void;
}

export function audit(el: HTMLElement, ctx: MountContext): Audit {
  const stage = createStage(el, ctx, { hint: 'Press the steps in any order. Reset puts everything back.' });
  const db = stage.own(new Dexie(stage.dbName('audit')));
  db.version(1).stores({ accounts: 'id, name', logs: '++id, text' });
  const accounts = db.table('accounts');
  const logs = db.table('logs');
  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 5, 4);
  const accountsView = tableView(stage, left!, {
    table: accounts,
    columns: [{ field: 'id', width: '2.2em' }, 'name', { field: 'balance', width: '3.6em' }],
  });
  const logsView = tableView(stage, right!, {
    table: logs,
    columns: [{ field: 'id', width: '2.2em' }, 'text'],
  });

  const reset = (): Promise<void> =>
    db.transaction('rw', accounts, logs, async () => {
      await Promise.all([accounts.clear(), logs.clear()]);
      await accounts.bulkPut(ACCOUNTS);
    });

  return {
    stage,
    db,
    accounts,
    logs,
    say,
    accountsView,
    logsView,
    reset,
    async verdict(p, okText, failText) {
      const r = await attempt(p);
      say.set(r.error ? `${failText} (${why(r.error)})` : okText);
    },
    step(label, text, code, fn, hold) {
      return {
        label,
        hold,
        run: async () => {
          say.set(text, code);
          await fn();
        },
      };
    },
    run(steps) {
      tour(stage, steps, {
        setup: reset,
        reset: async () => {
          say.set('Starting over.');
          await reset();
          await stage.wait(900);
        },
      });
      if (!stage.preview) button(stage, 'Reset', reset);
    },
  };
}
