// Dotbin: bin positions for stacking dots in a Wilkinson dot plot
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { gaussRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 180,
    padding: 5,
    signals: [
      { name: 'step', value: 3, bind: { input: 'range', min: 1, max: 10, step: 0.5 } },
      { name: 'smooth', value: false, bind: { input: 'checkbox' } },
      // Dot diameter in pixels: one bin step along the x scale.
      { name: 'dotW', update: "width * dotbins.step / 100" },
    ],
    data: [
      { name: 'obs', values: [...gaussRows(51, 40, 35, 9), ...gaussRows(52, 30, 65, 7)] },
      {
        name: 'dots',
        source: 'obs',
        transform: [
          { type: 'dotbin', field: 'v', step: { signal: 'step' }, smooth: { signal: 'smooth' }, as: 'bin', signal: 'dotbins' },
          { type: 'formula', expr: '1', as: 'one' },
          // Stacking the bins by 1 each gives every dot its row: y0 to y1.
          { type: 'stack', field: 'one', groupby: ['bin'], as: ['y0', 'y1'] },
        ],
      },
    ],
    scales: [{ name: 'x', type: 'linear', domain: [0, 100], range: 'width' }],
    axes: [{ orient: 'bottom', scale: 'x' }],
    title: { text: { signal: "'step ' + step + ', smooth ' + smooth" }, color: '#ddd' },
    marks: [
      {
        type: 'symbol',
        from: { data: 'dots' },
        encode: {
          update: {
            x: { scale: 'x', field: 'bin' },
            y: { signal: 'height - (datum.y0 + 0.5) * dotW' },
            size: { signal: '(dotW * 0.9) * (dotW * 0.9)' },
            fill: { value: 'steelblue' },
            stroke: { value: '#cfe' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const steps: [number, boolean][] = [[3, false], [5, false], [8, false], [2, false], [3, true]];
    stage.every(1400, async (i) => {
      const [s, sm] = steps[i % steps.length]!;
      view.signal('step', s).signal('smooth', sm);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
