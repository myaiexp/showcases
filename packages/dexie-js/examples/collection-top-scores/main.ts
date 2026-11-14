// collection.reverse() + limit(): a leaderboard of the highest scores
import type { Mount } from '@/types.ts';
import { numberField } from '../../shared/controls.ts';
import { demo } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const scores = [
  { id: 1, player: 'Mia', score: 420 },
  { id: 2, player: 'Eva', score: 880 },
  { id: 3, player: 'Ada', score: 610 },
  { id: 4, player: 'Leo', score: 730 },
  { id: 5, player: 'Zoe', score: 530 },
  { id: 6, player: 'Tom', score: 150 },
  { id: 7, player: 'Jon', score: 90 },
];

const mount: Mount = (el, ctx) => {
  const columns = [{ field: 'id', width: '2.2em' }, 'player', { field: 'score', width: '3.4em' }];
  const d = demo(el, ctx, { table: 'scores', stores: 'id, player, score', seed: scores, columns });
  const { t, say } = d;
  const howMany = numberField(d.stage, 'how many', 5, 1, 7);
  const n = () => Math.max(1, Number(howMany.value) || 5);
  const rank = (r: Record<string, unknown>) => `${r.player} ${r.score}`;
  say.set('Seven scores, in play order.', "stores: 'id, player, score'");
  d.run([
    d.step('Lowest first', 'By score, lowest first.', "orderBy('score')", async () =>
      pick(d, await t.orderBy('score').toArray(), rank),
    ),
    {
      label: 'Top scores',
      run: async () => {
        d.view.unmark();
        say.set(`Top ${n()}: biggest first, keep ${n()}.`, `orderBy('score').reverse().limit(${n()})`);
        pick(d, await t.orderBy('score').reverse().limit(n()).toArray(), rank);
      },
    },
    d.step('Lowest 3', 'And the bottom three.', "orderBy('score').limit(3)", async () =>
      pick(d, await t.orderBy('score').limit(3).toArray(), rank),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
