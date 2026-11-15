// A contour trace coloured by a hand-written six-stop colorscale, stops shifting in cards
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
import { basicZ } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const colors = ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)'];
const stops = [0, 0.25, 0.45, 0.65, 0.85, 1];

/** The docs' stops, with the colours rotated by `k` places. */
function scale(k: number): [number, string][] {
  return stops.map((s, i) => [s, colors[(i + k) % colors.length] ?? colors[0] ?? ''] as [number, string]);
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  let k = 0;

  await Plotly.newPlot(
    stage.div,
    [{ z: basicZ, type: 'contour', colorscale: scale(0) }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Custom contour plot colorscale' } },
    stage.config,
  );

  const rotate = (): void => {
    k += 1;
    void restyle(stage.div, { colorscale: [scale(k)] }, [0]);
  };
  if (stage.bar) button(stage.bar, 'Rotate the colours', rotate);
  else stage.every(1100, rotate);

  return () => stage.dispose();
};

export default mount;
