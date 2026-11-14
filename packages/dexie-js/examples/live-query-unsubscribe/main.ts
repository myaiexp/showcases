// Two subscribers to one live query; after unsubscribe() one of them stops hearing changes
import Dexie, { liveQuery, type EntityTable, type Subscription } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Score {
  id: number;
  player: string;
  points: number;
}

const PLAYERS = ['Sara', 'Per', 'Simon', 'Elna', 'Kate'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Unsubscribe B, then add more scores.' });
  const db = stage.own(new Dexie(stage.dbName('scores'))) as Dexie & { scores: EntityTable<Score, 'id'> };
  db.version(1).stores({ scores: '++id, points' });

  const say = caption(stage.root);
  const [left, a, b] = columns(stage.root, 4, 3, 3);
  tableView(stage, left!, { table: db.scores, columns: ['player', { field: 'points', width: '3.4em' }] });
  const panelA = resultPanel(a!, 'A: top 3');
  const panelB = resultPanel(b!, 'B: top 3');

  // The live query both subscribers share: the three best scores.
  const topThree = liveQuery(() => db.scores.orderBy('points').reverse().limit(3).toArray());
  const show = (panel: typeof panelA) => (rows: Score[]) => panel.list(rows.map((s) => `${s.player} ${s.points}`));
  const subA = topThree.subscribe({ next: show(panelA), error: stage.fail });
  let subB: Subscription = topThree.subscribe({ next: show(panelB), error: stage.fail });
  stage.onDispose(() => {
    subA.unsubscribe();
    subB.unsubscribe();
  });

  let n = 0;
  const addScore = {
    label: 'Add a score',
    run: async () => {
      const player = PLAYERS[n++ % PLAYERS.length]!;
      const points = 10 + Math.floor(Math.random() * 90);
      say.set(`${player} scores ${points}.`, `db.scores.add({ player: '${player}', points: ${points} })`);
      await db.scores.add({ player, points } as Score);
    },
    hold: 1300,
  };

  tour(
    stage,
    [
      addScore,
      addScore,
      {
        label: 'Unsubscribe B',
        run: () => {
          say.set('B unsubscribes: it hears nothing more.', 'subscription.unsubscribe()');
          subB.unsubscribe();
          b!.style.opacity = '0.4';
        },
      },
      addScore,
      addScore,
    ],
    {
      reset: async () => {
        say.set('Start over: B subscribes again.', 'topThree.subscribe(...)');
        await db.scores.clear();
        subB = topThree.subscribe({ next: show(panelB), error: stage.fail });
        b!.style.opacity = '1';
        await stage.wait(1200);
      },
    },
  );
  say.set('Two subscribers to the same top 3.', "liveQuery(() => db.scores.orderBy('points').reverse().limit(3).toArray())");

  return stage.dispose;
};

export default mount;
