// Plotly.react sees new points only through a new array or a changed datarevision
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const log = stage.preview ? null : readout(el);

  let y = [3, 4, 3.5, 5];
  let datarevision = 0;
  const draw = (): Promise<unknown> =>
    // react takes the same arguments as newPlot; called again it diffs against the last call.
    Plotly.react(
      stage.div,
      [{ y, mode: 'lines+markers', line: { shape: 'spline' } }],
      { template: stage.template, datarevision, xaxis: { range: [-0.5, 14.5] }, yaxis: { range: [0, 8] } },
      stage.config,
    );
  await draw();

  const next = (): number => Math.round((y[y.length - 1]! + (Math.random() - 0.5) * 2.5) * 10) / 10;
  const say = (msg: string): void => {
    if (log) log.textContent = `${msg}\nthe array holds ${y.length} points, the plot shows ${(stage.div.data[0] as { y?: unknown[] } | undefined)?.y?.length ?? 0} drawn`;
  };

  if (stage.bar) {
    button(stage.bar, 'push in place (ignored)', () => {
      y.push(next());
      void draw().then(() => say('y.push(): same array object and same datarevision, so react skips the data'));
    });
    button(stage.bar, 'new array', () => {
      y = [...y, next()];
      void draw().then(() => say('y = [...y, v]: a new array object, so react redraws'));
    });
    button(stage.bar, 'bump datarevision', () => {
      datarevision++;
      void draw().then(() => say(`layout.datarevision = ${datarevision}: everything is re-read`));
    });
    button(stage.bar, 'reset', () => {
      y = [3, 4, 3.5, 5];
      void draw().then(() => say('reset'));
    });
    say('try "push in place" first: nothing moves until a new array or datarevision');
  }

  // Cards grow the line immutably, and start over at 15 points.
  if (stage.preview) stage.every(700, () => {
    y = y.length >= 15 ? [3, 4, 3.5, 5] : [...y, next()];
    void draw();
  });

  return () => stage.dispose();
};

export default mount;
