// Fully styled box plots: jittered points, thin whiskers, translucent fills
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const names = ['Carmelo<br>Anthony', 'Dwyane<br>Wade', 'Deron<br>Williams', 'Brook<br>Lopez', 'Damian<br>Lillard', 'David<br>West', 'Blake<br>Griffin', 'David<br>Lee', 'Demar<br>Derozan'];
const spread = [10, 20, 25, 40, 45, 30, 20, 15, 43];
const colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(44, 160, 101, 0.5)', 'rgba(255, 65, 54, 0.5)', 'rgba(207, 114, 255, 0.5)', 'rgba(200, 160, 0, 0.5)', 'rgba(255, 140, 184, 0.5)', 'rgba(120, 140, 190, 0.5)', 'rgba(222, 223, 0, 0.5)'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const rand = rng(7); // the docs draw Math.random() * mul, 31 points a player

  await Plotly.newPlot(
    stage.div,
    names.map((name, i) => ({
      type: 'box' as const,
      y: Array.from({ length: 31 }, () => rand() * (spread[i] ?? 10)),
      name,
      boxpoints: 'all' as const,
      jitter: 0.5,
      whiskerwidth: 0.2,
      fillcolor: colors[i],
      marker: { size: 2, color: colors[i]?.replace('0.5', '1') },
      line: { width: 1, color: colors[i]?.replace('0.5', '1') },
    })),
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Points Scored by the Top 9 Scoring NBA Players in 2012 (simulated)' },
      yaxis: { autorange: true, showgrid: true, zeroline: true, dtick: 5, gridwidth: 1, zerolinewidth: 2 },
      margin: stage.preview ? { l: 30, r: 10, t: 10, b: 50 } : { l: 40, r: 30, b: 80, t: 100 },
      showlegend: false,
    },
    stage.config,
  );

  return () => stage.dispose();
};

export default mount;
