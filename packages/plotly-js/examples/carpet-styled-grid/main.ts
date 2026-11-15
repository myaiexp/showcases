// A carpet drawn in a single bright colour for its gridlines, minor gridlines and labels
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const inks = { white: '#ffffff', amber: '#f59e0b', cyan: '#22d3ee', rose: '#fb7185' } as const;
const names = Object.keys(inks) as (keyof typeof inks)[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const axis = (prefix: string, suffix: string) => ({
    tickprefix: prefix,
    ticksuffix: suffix,
    smoothing: 1,
    minorgridcount: 9,
    minorgridcolor: inks.white,
    gridcolor: inks.white,
    color: inks.white,
  });

  // The docs draw white on a black page; the page here is already dark, so only the ink changes.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        a: [4, 4, 4, 4.5, 4.5, 4.5, 5, 5, 5, 6, 6, 6],
        b: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
        y: [2, 3.5, 4, 3, 4.5, 5, 5.5, 6.5, 7.5, 8, 8.5, 10],
        aaxis: axis('a = ', 'm'),
        baxis: axis('b = ', 'pa'),
      },
    ],
    { template: stage.template, plot_bgcolor: 'rgba(0,0,0,0.55)' },
    stage.config,
  );

  const ink = (name: keyof typeof inks): void => {
    const c = inks[name];
    void restyle(stage.div, { 'aaxis.gridcolor': c, 'aaxis.minorgridcolor': c, 'aaxis.color': c, 'baxis.gridcolor': c, 'baxis.minorgridcolor': c, 'baxis.color': c });
  };
  if (stage.bar) select(stage.bar, 'ink', names, 'white', ink);
  else stage.every(1100, (i) => ink(pick(names, i)));

  return () => stage.dispose();
};

export default mount;
