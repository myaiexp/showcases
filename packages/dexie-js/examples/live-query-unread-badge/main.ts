// An inbox badge that is a live count of unread messages
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';
import './style.css';

interface Message {
  id: number;
  from: string;
  unread: 0 | 1; // a number, not a boolean: booleans can't be indexed
}

const SENDERS = ['Sara', 'Per', 'Kate', 'Simon'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const db = stage.own(new Dexie(stage.dbName('mail'))) as Dexie & { messages: EntityTable<Message, 'id'> };
  db.version(1).stores({ messages: '++id, unread' });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  tableView(stage, left!, {
    table: db.messages,
    columns: ['from', { field: 'unread', width: '4em', format: (v) => (v ? '● new' : 'read') }],
  });
  const inbox = document.createElement('div');
  inbox.className = 'inbox';
  inbox.textContent = 'Inbox';
  const badge = document.createElement('span');
  badge.className = 'badge';
  inbox.append(badge);
  right!.append(inbox);

  // The badge is nothing but a live count.
  const sub = liveQuery(() => db.messages.where('unread').equals(1).count()).subscribe({
    next: (n) => {
      badge.textContent = String(n);
      badge.dataset.zero = String(n === 0);
      badge.animate([{ transform: 'scale(1.5)' }, { transform: 'none' }], { duration: 350 });
    },
    error: stage.fail,
  });
  stage.onDispose(() => sub.unsubscribe());

  let n = 0;
  const receive = {
    label: 'A message arrives',
    run: async () => {
      const from = SENDERS[n++ % SENDERS.length]!;
      say.set(`New message from ${from}.`, `db.messages.add({ from: '${from}', unread: 1 })`);
      await db.messages.add({ from, unread: 1 } as Message);
    },
    hold: 1200,
  };
  tour(
    stage,
    [
      receive,
      receive,
      receive,
      {
        label: 'Read the oldest',
        run: async () => {
          const oldest = await db.messages.where('unread').equals(1).first();
          if (!oldest) return;
          say.set(`Open ${oldest.from}'s message.`, `db.messages.update(${oldest.id}, { unread: 0 })`);
          await db.messages.update(oldest.id, { unread: 0 });
        },
      },
      {
        label: 'Mark all read',
        run: async () => {
          say.set('Mark all as read.', "db.messages.where('unread').equals(1).modify({ unread: 0 })");
          await db.messages.where('unread').equals(1).modify({ unread: 0 });
        },
      },
    ],
    { reset: () => db.messages.clear() },
  );
  say.set('The badge counts unread messages, live.', "liveQuery(() => db.messages.where('unread').equals(1).count())");

  return stage.dispose;
};

export default mount;
