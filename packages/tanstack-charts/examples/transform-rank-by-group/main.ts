// rank by: positions restart in every round, so teams can be followed through a bump chart
import { defineChart, dot, lineY, mountChart, rank } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const draw = normal(rng(31), 70, 12);
const scores = ['Ash', 'Birch', 'Cedar', 'Elm'].flatMap((team) => Array.from({ length: 6 }, (_, round) => ({ team, round: round + 1, score: Math.round(draw()) })));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Place 1 is at the top. Hover a point for the team, round and score.' });

  const places = rank(scores, { value: 'score', by: 'round', order: 'descending' });
  const definition = defineChart({
    marks: [
      lineY(places, { x: 'round', y: 'rank', color: 'team', strokeWidth: 2.5 }),
      dot(places, { x: 'round', y: 'rank', color: 'team', r: 5 }),
    ],
    scales: {
      x: { scale: scaleLinear().domain([1, 6]), axis: { label: 'Round' } },
      y: { scale: scaleLinear().domain([4.4, 0.6]), grid: true, axis: { label: 'Place' } },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Team places by round' }));
  readoutPanel(stage)(tableText(places, ['team', 'round', 'score', 'rank'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
