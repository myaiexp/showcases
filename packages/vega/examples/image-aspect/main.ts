// An image keeps its aspect ratio unless aspect is false, which stretches it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const logo = (fill: string, ink: string): string => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><rect width="100" height="60" rx="8" fill="${fill}"/><circle cx="30" cy="30" r="16" fill="${ink}"/><path d="M52 44L66 14L80 44Z" fill="${ink}"/></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  const spec: Spec = {
    width: 360, height: 200, padding: 5,
    signals: [
      { name: 'w', value: 150, bind: { input: 'range', min: 20, max: 200, step: 1 } },
      { name: 'h', value: 60, bind: { input: 'range', min: 20, max: 200, step: 1 } },
      { name: 'aspect', value: true, bind: { input: 'checkbox' } },
      // With only a width set, aspect true derives the height from the picture.
      { name: 'both', value: true, bind: { input: 'checkbox' } },
    ],
    data: [{ name: 'pics', values: [{ x: 20, y: 20, url: logo('#3b82c4', '#fff') }, { x: 190, y: 20, url: logo('#d97706', '#222') }] }],
    marks: [
      {
        type: 'image',
        from: { data: 'pics' },
        encode: {
          update: {
            url: { field: 'url' },
            x: { field: 'x' }, y: { field: 'y' },
            width: { signal: 'w / 2' },
            // Width and height both set: aspect fits the picture inside that box, no aspect stretches it.
            height: { signal: 'both ? h : null' },
            aspect: { signal: 'aspect' },
          },
          hover: { opacity: { value: 0.6 } },
        },
      },
      { type: 'rect', interactive: false, from: { data: 'pics' }, encode: { update: { x: { field: 'x' }, y: { field: 'y' }, width: { signal: 'w / 2' }, height: { signal: 'both ? h : w / 2 * 0.6' }, stroke: { value: '#667' }, strokeDash: { value: [3, 3] } } } },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [
    { both: false, aspect: true, w: 150, h: 60 },
    { both: true, aspect: true, w: 150, h: 110 },
    { both: true, aspect: false, w: 150, h: 110 },
    { both: true, aspect: false, w: 220, h: 50 },
  ], 1500);
  return () => stage.dispose();
};

export default mount;
