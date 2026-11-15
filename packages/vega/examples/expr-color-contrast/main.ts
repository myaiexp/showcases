// Color functions: luminance and contrast pick light or dark text for each swatch and grade it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const W = 100;

  const spec: Spec = {
    width: 440,
    height: 210,
    padding: 8,
    signals: [{ name: 'light', value: 55, bind: { input: 'range', min: 15, max: 92, step: 1 } }],
    data: [
      {
        name: 'cells',
        transform: [
          { type: 'sequence', start: 0, stop: 8, as: 'i' },
          { type: 'formula', as: 'bg', expr: '"" + hcl(datum.i * 45, 50, light)' },
          { type: 'formula', as: 'lum', expr: 'luminance(datum.bg)' },
          // Whichever of the two text colours has the higher contrast against the swatch.
          { type: 'formula', as: 'dark', expr: 'contrast(datum.bg, "#1b1b1b")' },
          { type: 'formula', as: 'pale', expr: 'contrast(datum.bg, "#ffffff")' },
          { type: 'formula', as: 'ink', expr: 'datum.dark > datum.pale ? "#1b1b1b" : "#ffffff"' },
          { type: 'formula', as: 'ratio', expr: 'max(datum.dark, datum.pale)' },
        ],
      },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'cells' },
        encode: {
          update: {
            x: { signal: `datum.i % 4 * ${W + 10}` },
            y: { signal: 'floor(datum.i / 4) * 100' },
            width: { value: W },
            height: { value: 90 },
            cornerRadius: { value: 6 },
            fill: { field: 'bg' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'cells' },
        encode: {
          update: {
            x: { signal: `datum.i % 4 * ${W + 10} + ${W / 2}` },
            y: { signal: 'floor(datum.i / 4) * 100 + 30' },
            align: { value: 'center' },
            text: { value: 'Aa' },
            fill: { field: 'ink' },
            fontSize: { value: 28 },
            fontWeight: { value: 'bold' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'cells' },
        encode: {
          update: {
            x: { signal: `datum.i % 4 * ${W + 10} + ${W / 2}` },
            y: { signal: 'floor(datum.i / 4) * 100 + 58' },
            align: { value: 'center' },
            text: { signal: "format(datum.ratio, '.1f') + ':1  ' + (datum.ratio >= 7 ? 'AAA' : datum.ratio >= 4.5 ? 'AA' : 'fails AA')" },
            fill: { field: 'ink' },
            fontSize: { value: 11 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'cells' },
        encode: {
          update: {
            x: { signal: `datum.i % 4 * ${W + 10} + ${W / 2}` },
            y: { signal: 'floor(datum.i / 4) * 100 + 76' },
            align: { value: 'center' },
            text: { signal: "'luminance ' + format(datum.lum, '.3f')" },
            fill: { field: 'ink' },
            fontSize: { value: 10 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'light', [55, 30, 78, 45, 90, 20, 65], 1000);
  return () => stage.dispose();
};

export default mount;
