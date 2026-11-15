// Any HTML input type can be bound: color, text, date and number, with extra attributes
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 130,
    padding: 5,

    // Extra properties such as `placeholder`, `min` and `max` become attributes of the
    // generated element. Every non-range value arrives as the input's string value.
    signals: [
      { name: 'swatch', value: '#ff8800', bind: { input: 'color', name: 'Swatch' } },
      { name: 'label', value: 'Hello Vega', bind: { input: 'text', name: 'Label', placeholder: 'type a label' } },
      { name: 'day', value: '2026-11-15', bind: { input: 'date', name: 'Date' } },
      // min, max and step are missing from the Bind type for non-range inputs; cast, they still reach the input.
      { name: 'size', value: '40', bind: { input: 'number', name: 'Size', min: 10, max: 60, step: 5 } as { input: string } },
    ],

    marks: [
      {
        type: 'rect',
        encode: {
          update: {
            x: { value: 10 },
            y: { value: 10 },
            width: { signal: 'toNumber(size) * 2' },
            height: { signal: 'toNumber(size) * 2' },
            fill: { signal: 'swatch' },
            cornerRadius: { value: 8 },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 180 },
            y: { value: 24 },
            text: { signal: 'label' },
            fontSize: { value: 22 },
            fill: { signal: 'swatch' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 180 },
            y: { value: 60 },
            text: { signal: "timeFormat(toDate(day), '%A, %e %B %Y')" },
            fill: { value: '#ddd' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { swatch: '#33cc99', label: 'Colour pickers', day: '2026-12-24', size: '55' },
      { swatch: '#cc66ff', label: 'Text inputs', day: '2027-01-01', size: '25' },
      { swatch: '#ff8800', label: 'Hello Vega', day: '2026-11-15', size: '40' },
    ],
    1400,
  );
  return () => stage.dispose();
};

export default mount;
