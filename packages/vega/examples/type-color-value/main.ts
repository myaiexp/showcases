// ColorValue: colours built channel by channel in RGB, HSL, LAB and HCL
import type { ColorHCL, ColorHSL, ColorLAB, ColorRGB, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const row = (name: string, y: number, color: ColorRGB | ColorHSL | ColorLAB | ColorHCL) => ({
    type: 'symbol' as const,
    from: { data: 'steps' },
    encode: {
      update: {
        x: { signal: '20 + datum.i * 26' },
        y: { value: y },
        size: { value: 520 },
        shape: { value: 'square' },
        // `color` takes one value reference per channel. The space comes from the channel names.
        fill: { color },
      },
    },
    description: name,
  });

  const spec: Spec = {
    width: 420,
    height: 210,
    padding: 5,

    signals: [{ name: 'third', value: 60, bind: { input: 'range', min: 0, max: 100, step: 1, name: 'the fixed channel' } }],

    // A scale can feed a channel too: the hue channel below reads `hue` through the field i.
    scales: [{ name: 'hue', type: 'linear', domain: [0, 15], range: [0, 360] }],

    data: [{ name: 'steps', transform: [{ type: 'sequence', start: 0, stop: 16, as: 'i' }] }],

    marks: [
      // RGB: r from the field, g from the signal (scaled to 0-255), b constant.
      row('rgb', 20, { r: { field: 'i', mult: 17 }, g: { signal: 'third * 2.55' }, b: { value: 120 } }),
      // HSL: h, s, l. The hue goes through a scale; saturation follows the signal.
      row('hsl', 70, { h: { scale: 'hue', field: 'i' }, s: { signal: 'third / 100' }, l: { value: 0.55 } }),
      // LAB: l is luminance, a the green-red axis, b the blue-yellow axis.
      row('lab', 120, { l: { signal: 'third + 10' }, a: { field: 'i', mult: 11, offset: -80 }, b: { value: 40 } }),
      // HCL: hue, chroma, luminance (the polar form of LAB).
      row('hcl', 170, { h: { scale: 'hue', field: 'i' }, c: { signal: 'third' }, l: { value: 65 } }),
      ...['rgb', 'hsl', 'lab', 'hcl'].map((name, k) => ({
        type: 'text' as const,
        encode: { update: { x: { value: 445 }, y: { value: 20 + k * 50 }, baseline: { value: 'middle' as const }, text: { value: name }, fill: { value: '#aaa' }, fontSize: { value: 11 } } },
      })),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'third', [10, 40, 70, 100, 60], 1100);
  return () => stage.dispose();
};

export default mount;
