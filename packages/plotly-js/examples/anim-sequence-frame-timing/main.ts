// Plotly.animate over named frames, with arrays of frame and transition options, one entry per frame
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  await Plotly.newPlot(
    stage.div,
    [{ x: [0, 0], y: [-1, 1], line: { width: 6, color: '#f59e0b' } }],
    { template: stage.template, xaxis: { range: [-Math.PI, Math.PI] }, yaxis: { range: [-1.3, 1.3] } },
    stage.config,
  );
  await Plotly.addFrames(stage.div, [
    { data: [{ x: [1, -1], y: [0, 0] }], name: 'frame1' },
    { data: [{ x: [0, 0], y: [-1, 1] }], name: 'frame2' },
  ]);

  const start = (): void => {
    void Plotly.animate(stage.div, ['frame1', 'frame2'], {
      frame: [{ duration: 1500 }, { duration: 500 }],
      transition: [{ duration: 800, easing: 'elastic-in' }, { duration: 100, easing: 'cubic-in' }],
      mode: 'afterall',
    } as never).catch(() => {});
  };
  if (stage.bar) button(stage.bar, 'Start animation', start);
  if (stage.preview) {
    start();
    stage.every(3600, start);
  }

  return () => stage.dispose();
};

export default mount;
