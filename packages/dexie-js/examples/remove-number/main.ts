// remove(395) subtracts from a stored balance; a missing balance starts from zero
import Dexie, { add, remove, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Account {
  id: string;
  owner: string;
  balance?: number;
}

const START: Account[] = [
  { id: 'A-1', owner: 'Sara', balance: 1000 },
  { id: 'A-2', owner: 'Per', balance: 250 },
  { id: 'A-3', owner: 'Simon' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Simon\'s account has no balance stored yet.' });
  const db = stage.own(new Dexie(stage.dbName('bank'))) as Dexie & { accounts: EntityTable<Account, 'id'> };
  db.version(1).stores({ accounts: 'id' });

  const say = caption(stage.root);
  const view = tableView(stage, stage.root, {
    table: db.accounts,
    columns: [{ field: 'id', width: '3.6em' }, 'owner', { field: 'balance', width: '5em' }],
  });

  function withdraw(account: Pick<Account, 'id'>) {
    return db.accounts.update(account.id, {
      balance: remove(395),
    });
  }
  function deposit(account: Pick<Account, 'id'>) {
    return db.accounts.update(account.id, {
      balance: add(395),
    });
  }

  const step = (id: string, kind: 'withdraw' | 'deposit', text: string) => ({
    label: `${kind === 'withdraw' ? 'Withdraw' : 'Deposit'} 395 (${id})`,
    run: async () => {
      view.mark([id]);
      say.set(text, `update('${id}', { balance: ${kind === 'withdraw' ? 'remove' : 'add'}(395) })`);
      await (kind === 'withdraw' ? withdraw({ id }) : deposit({ id }));
    },
  });

  tour(
    stage,
    [
      step('A-1', 'withdraw', 'Sara takes out 395.'),
      step('A-2', 'withdraw', 'Per takes out 395: below zero.'),
      step('A-3', 'withdraw', 'No balance yet: 0 − 395.'),
      step('A-2', 'deposit', 'Per pays 395 back with add().'),
    ],
    {
      setup: () => db.accounts.bulkPut(START),
      reset: async () => {
        view.unmark();
        say.set('Start the day over.', 'db.accounts.bulkPut([...])');
        await db.accounts.bulkPut(START);
        await stage.wait(1200);
      },
    },
  );
  say.set('Withdrawals change the balance in place.', 'update(id, { balance: remove(395) })');

  return stage.dispose;
};

export default mount;
