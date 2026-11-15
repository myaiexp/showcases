// Cyclical schemes rainbow and sinebow on colour wheels that wrap without a seam
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300, height: 300, padding: 5,
    signals: [{ name: 'shift', value: 0, bind: { input: 'range', min: 0, max: 119, step: 1, name: 'rotate colours' } }],
    data: [{ name: 'wedges', transform: [{ type: 'sequence', start: 0, stop: 120, as: 'n' }] }],
    scales: [
      { name: 'rainbow', type: 'linear', domain: [0, 1], range: { scheme: 'rainbow' } },
      { name: 'sinebow', type: 'linear', domain: [0, 1], range: { scheme: 'sinebow' } },
    ],
    marks: [
      {
        type: 'arc', from: { data: 'wedges' },
        encode: { update: {
          x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, innerRadius: { value: 108 }, outerRadius: { value: 148 },
          startAngle: { signal: 'datum.n * PI / 60' }, endAngle: { signal: '(datum.n + 1) * PI / 60 + 0.01' },
          fill: { signal: "scale('rainbow', ((datum.n + shift) % 120) / 120)" },
        } },
      },
      {
        type: 'arc', from: { data: 'wedges' },
        encode: { update: {
          x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, innerRadius: { value: 56 }, outerRadius: { value: 96 },
          startAngle: { signal: 'datum.n * PI / 60' }, endAngle: { signal: '(datum.n + 1) * PI / 60 + 0.01' },
          fill: { signal: "scale('sinebow', ((datum.n + shift) % 120) / 120)" },
        } },
      },
      { type: 'text', encode: { update: { x: { signal: 'width / 2' }, y: { signal: 'height / 2 - 6' }, align: { value: 'center' }, text: { value: 'rainbow' }, fill: { value: '#ddd' } } } },
      { type: 'text', encode: { update: { x: { signal: 'width / 2' }, y: { signal: 'height / 2 + 10' }, align: { value: 'center' }, text: { value: 'sinebow (inner)' }, fill: { value: '#aaa' }, fontSize: { value: 10 } } } },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) stage.every(90, (i) => view.signal('shift', (i * 2) % 120).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;
