// A wind rose from four barpolar traces, one per wind-speed band, overlaid
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const theta = ['North', 'N-E', 'East', 'S-E', 'South', 'S-W', 'West', 'N-W'];
const bands = [
  { name: '11-14 m/s', r: [77.5, 72.5, 70.0, 45.0, 22.5, 42.5, 40.0, 62.5], color: 'rgb(106,81,163)' },
  { name: '8-11 m/s', r: [57.5, 50.0, 45.0, 35.0, 20.0, 22.5, 37.5, 55.0], color: 'rgb(158,154,200)' },
  { name: '5-8 m/s', r: [40.0, 30.0, 30.0, 35.0, 7.5, 7.5, 32.5, 40.0], color: 'rgb(203,201,226)' },
  { name: '< 5 m/s', r: [20.0, 7.5, 15.0, 22.5, 2.5, 2.5, 12.5, 22.5], color: 'rgb(242,240,247)' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const small = stage.preview;

  await Plotly.newPlot(
    stage.div,
    bands.map((b) => ({ type: 'barpolar' as const, r: b.r, theta, name: b.name, marker: { color: b.color } })),
    {
      template: stage.template,
      title: { text: small ? '' : 'Wind speed distribution in Laurel, NE' },
      font: { size: small ? 9 : 14 },
      showlegend: !small,
      // 'overlay' draws each band from the centre, so the longest sits behind the shorter ones.
      polar: {
        barmode: 'overlay',
        bargap: 0,
        radialaxis: { ticksuffix: '%', angle: 45, dtick: 20 },
        angularaxis: { direction: 'clockwise' },
      },
    },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'polar.barmode', ['overlay', 'stack'] as const, 'overlay', (v) => void Plotly.relayout(stage.div, { 'polar.barmode': v }).catch(() => {}));
  else {
    // Cards: the gusts breathe.
    stage.every(150, (i) => {
      const k = 1 + 0.25 * Math.sin(i / 7);
      void restyle(stage.div, { r: bands.map((b, n) => b.r.map((v, j) => v * (1 + (k - 1) * (1 + Math.sin(j + n))))) }, [0, 1, 2, 3]);
    });
  }

  return () => stage.dispose();
};

export default mount;
