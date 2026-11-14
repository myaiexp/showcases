// funnel3d: a funnel of 3D trapezoid blocks; face picks which faces are drawn, isTransform adds the bridges
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { INIT_3D, register3d } from '../../shared/chart3d.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DATA = [
  { name: 'Step1', value: 100 }, { name: 'Step2', value: 80 }, { name: 'Step3', value: 60 },
  { name: 'Step4', value: 40 }, { name: 'Step5', value: 20 },
];
// face: [front, back, left, right, top, bottom]-style booleans, as in the 3D funnel guide.
const FACES: Record<string, boolean[] | undefined> = {
  'default (all faces)': undefined,
  'two faces': [false, false, true, false, true, false],
  'no top': [true, true, true, true, false, true],
};
const KEYS = Object.keys(FACES);

const mount: Mount = (el, ctx) => {
  register3d('funnel3d');
  const stop = mountLive<{ faces: string; transform: boolean }>(el, ctx, {
    initial: { faces: KEYS[1] ?? '', transform: false },
    mode: 'rebuild',
    previewMs: 2600,
    chart: { height: 440, init: { ...INIT_3D, options3d: { enable: true, alpha: 0.1, beta: 0.3 } } },
    build: ({ faces, transform }) =>
      ({
        padding: { top: 60 },
        type: 'funnel3d',
        categoryField: 'name',
        valueField: 'value',
        data: [{ id: 'funnel', values: DATA }],
        funnel3d: { style: { face: FACES[faces] } },
        isTransform: transform,
        label: { visible: true, support3d: true },
        maxSize: ctx.preview ? 200 : 400,
        minSize: 50,
        legends: { visible: !ctx.preview, orient: 'bottom' },
      }) as unknown as ISpec,
    step: (_s, i) => ({ faces: KEYS[i % KEYS.length] ?? '', transform: i % 2 === 1 }),
    controls: (bar, live) => {
      select(bar, 'funnel3d.style.face', KEYS, (faces) => live.set({ faces })).value = KEYS[1] ?? '';
      select(bar, 'isTransform', ['false', 'true'], (v) => live.set({ transform: v === 'true' }));
    },
  });
  return () => {
    stop();
  };
};

export default mount;
