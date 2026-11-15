// Gradient values: linear and radial gradients with stops, and a scale-based GradientValue
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 120,
    padding: 5,

    signals: [{ name: 'angle', value: 0, bind: { input: 'range', min: 0, max: 360, step: 15, name: 'linear angle (deg)' } }],

    // Gradient coordinates are normalised [0, 1] within each item's bounding box.
    scales: [{ name: 'heat', type: 'linear', domain: [0, 1], range: { scheme: 'viridis' } }],

    data: [{ name: 'tiles', values: [{ x: 0, label: 'linear' }, { x: 1, label: 'rotating' }, { x: 2, label: 'radial' }, { x: 3, label: 'gradient: scale' }] }],

    marks: [
      {
        type: 'rect',
        from: { data: 'tiles' },
        encode: {
          enter: { x: { signal: 'datum.x * 110' }, width: { value: 100 }, y: { value: 0 }, height: { value: 90 }, cornerRadius: { value: 6 } },
          update: {
            fill: [
              // Gradient: three stops, default direction (left to right).
              {
                test: 'datum.x === 0',
                value: { gradient: 'linear', stops: [{ offset: 0, color: 'red' }, { offset: 0.5, color: 'white' }, { offset: 1, color: 'blue' }] },
              },
              // A gradient built by an expression: x1/y1 to x2/y2 turn with the angle signal.
              {
                test: 'datum.x === 1',
                signal:
                  "{gradient: 'linear', x1: 0.5 - cos(angle * PI / 180) / 2, y1: 0.5 - sin(angle * PI / 180) / 2, x2: 0.5 + cos(angle * PI / 180) / 2, y2: 0.5 + sin(angle * PI / 180) / 2, stops: [{offset: 0, color: 'gold'}, {offset: 1, color: 'purple'}]}",
              },
              // Radial: inner circle (x1, y1, r1) to outer circle (x2, y2, r2).
              {
                test: 'datum.x === 2',
                value: {
                  gradient: 'radial',
                  x1: 0.35, y1: 0.35, r1: 0,
                  x2: 0.5, y2: 0.5, r2: 0.6,
                  stops: [{ offset: 0, color: '#fff7b0' }, { offset: 0.5, color: 'orange' }, { offset: 1, color: '#7a1f00' }],
                },
              },
              // GradientValue: the stops come from a continuous colour scale, here bottom to top.
              { gradient: 'heat', start: [0, 1], stop: [0, 0], count: 10 },
            ],
          },
        },
      },
      {
        type: 'text',
        from: { data: 'tiles' },
        encode: {
          enter: { x: { signal: 'datum.x * 110 + 50' }, y: { value: 106 }, align: { value: 'center' }, fontSize: { value: 11 }, text: { field: 'label' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'angle', [45, 90, 180, 270, 315, 0], 800);
  return () => stage.dispose();
};

export default mount;
