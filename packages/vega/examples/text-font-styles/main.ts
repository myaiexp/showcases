// font, fontWeight (names, numbers), fontStyle and fontSize on a label column
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360, height: 270, padding: 5,
    signals: [
      { name: 'font', value: 'sans-serif', bind: { input: 'select', options: ['sans-serif', 'serif', 'monospace'] } },
      { name: 'fontStyle', value: 'normal', bind: { input: 'select', options: ['normal', 'italic'] } },
      { name: 'fontSize', value: 20, bind: { input: 'range', min: 10, max: 30, step: 1 } },
    ],
    data: [{ name: 'weights', values: [100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => ({ w })) }],
    marks: [{
      type: 'text',
      from: { data: 'weights' },
      encode: {
        enter: { fill: { value: '#ddd' } },
        update: {
          x: { value: 10 }, y: { signal: '24 + (datum.w / 100 - 1) * 29' },
          text: { signal: "'weight ' + datum.w + ': the quick brown fox'" },
          fontWeight: { field: 'w' }, font: { signal: 'font' },
          fontStyle: { signal: 'fontStyle' }, fontSize: { signal: 'fontSize' },
        },
        hover: { fill: { value: 'orange' } },
      },
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ font: 'sans-serif', fontStyle: 'normal', fontSize: 20 }, { font: 'serif', fontStyle: 'italic', fontSize: 22 }, { font: 'monospace', fontStyle: 'normal', fontSize: 17 }, { font: 'serif', fontStyle: 'normal', fontSize: 24 }], 1400);
  return () => stage.dispose();
};

export default mount;
