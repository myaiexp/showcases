// Two filled radar traces over the same categories, translucent, with a legend to toggle them
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const theta = ['A', 'B', 'C', 'D', 'E', 'A'];
const a = [39, 28, 8, 7, 28, 39];
const b = [1.5, 10, 39, 31, 15, 1.5];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatterpolar', r: a, theta, fill: 'toself', name: 'Group A' },
      { type: 'scatterpolar', r: b, theta, fill: 'toself', name: 'Group B' },
    ],
    { template: stage.template, polar: { radialaxis: { visible: true, range: [0, 50] } }, showlegend: !stage.preview },
    stage.config,
  );

  // Group B morphs between its own values and Group A's; click a legend entry to hide a group.
  const mix = (t: number): void => void restyle(stage.div, { r: [b.map((v, i) => v + ((a[(i + 2) % 5] ?? 0) - v) * t)] }, [1]);
  if (stage.bar) slider(stage.bar, 'Group B towards shifted A', [0, 1, 0.05], 0, mix);
  else stage.every(100, (i) => mix(0.5 + 0.5 * Math.sin(i / 9)));

  return () => stage.dispose();
};

export default mount;
