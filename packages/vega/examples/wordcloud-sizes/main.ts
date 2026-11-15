// fontSizeRange scales each word's count to a size range with a square root scale
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { words } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    padding: 0,
    autosize: 'none',
    signals: [
      { name: 'minSize', value: 10, bind: { input: 'range', min: 6, max: 30, step: 1 } },
      { name: 'maxSize', value: 44, bind: { input: 'range', min: 20, max: 70, step: 1 } },
    ],
    data: [
      {
        name: 'table',
        values: words(5, 40),
        transform: [
          {
            type: 'wordcloud',
            size: [{ signal: 'width' }, { signal: 'height' }],
            text: { field: 'text' },
            font: 'Helvetica Neue, Arial',
            fontSize: { field: 'count' },
            fontSizeRange: [{ signal: 'minSize' }, { signal: 'maxSize' }],
            padding: 2,
          },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: { data: 'table', field: 'text' }, range: { scheme: 'tableau20' } }],
    marks: [
      {
        type: 'text',
        from: { data: 'table' },
        encode: {
          enter: {
            text: { field: 'text' },
            // The layout assumes centered, alphabetic-baseline text.
            align: { value: 'center' },
            baseline: { value: 'alphabetic' },
            fill: { scale: 'color', field: 'text' },
            font: { value: 'Helvetica Neue, Arial' },
          },
          update: { x: { field: 'x' }, y: { field: 'y' }, fontSize: { field: 'fontSize' } },
          hover: { fillOpacity: { value: 0.5 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ minSize: 8, maxSize: 30 }, { minSize: 14, maxSize: 60 }, { minSize: 10, maxSize: 44 }], 2000);
  return () => stage.dispose();
};

export default mount;
