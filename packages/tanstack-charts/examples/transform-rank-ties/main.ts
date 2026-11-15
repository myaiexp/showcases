// rank ties: competition, dense and ordinal on scores that contain ties
import { barX, defineChart, rank, text } from '@tanstack/charts';
import type { RankTies } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const scores = [
  { team: 'Ash', score: 91 },
  { team: 'Birch', score: 88 },
  { team: 'Cedar', score: 88 },
  { team: 'Elm', score: 88 },
  { team: 'Fir', score: 75 },
  { team: 'Maple', score: 75 },
  { team: 'Oak', score: 60 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The number at the end of each bar is its rank.' });
  const show = readoutPanel(stage);

  const build = (ties: RankTies) => {
    const rows = rank(scores, { value: 'score', order: 'descending', ties });
    show(tableText(rows, ['team', 'score', 'rank'], 7));
    return defineChart({
      marks: [
        barX(rows, { x: 'score', y: 'team', fill: '#64748b' }),
        text(rows, { x: 'score', y: 'team', text: (r) => `#${r.rank}`, dx: -14, fill: '#fbbf24' }),
      ],
      scales: {
        x: { scale: scaleLinear().domain([0, 100]), grid: true },
        y: { scale: () => scaleBand<string>().padding(0.2) },
      },
    });
  };
  const states = (['competition', 'dense', 'ordinal'] as const).map((t) => [t, `ties: '${t}'`] as const);
  lab(stage, { label: 'ties', ariaLabel: 'Scores with ranks', states, build, ms: 2200, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
