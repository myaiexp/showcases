// rotateAngles: the angles a word may be given when it is laid out
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const SETS: Record<string, number[]> = {
  '[0]': [0],
  '[0, 90]': [0, 90],
  '[-45, 0, 45]': [-45, 0, 45],
  '[0, 30, 60, 90]': [0, 30, 60, 90],
  '[90]': [90],
};
const KEYS = Object.keys(SETS);
const rows = wordRows(3, 40);

const mount: Mount = (el, ctx) =>
  mountLive<{ set: string }>(el, ctx, {
    initial: { set: '[0, 90]' },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ set }) =>
      ({
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        rotateAngles: SETS[set],
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `rotateAngles: ${set}` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ set: KEYS[i % KEYS.length] ?? '[0]' }),
    controls: (bar, live) => {
      select(bar, 'rotateAngles', KEYS, (set) => live.set({ set })).value = '[0, 90]';
    },
  });

export default mount;
