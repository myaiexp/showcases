// FAQ: a radar angle axis label as rich text: an icon, a bold name and a coloured value
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const KEYS = ['Speed', 'Power', 'Range', 'Armor', 'Magic', 'Luck'];
// An icon drawn as an SVG data URL, so nothing is fetched.
const ICON =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#ffd666"/></svg>');

const mount: Mount = (el, ctx) => {
  const rand = seeded(9);
  let scores = KEYS.map((key) => ({ key, value: Math.round(30 + rand() * 70) }));
  const spec = {
    type: 'radar',
    data: [{ id: 'stats', values: scores }],
    categoryField: 'key',
    valueField: 'value',
    area: { visible: true, style: { fillOpacity: 0.2 } },
    axes: [
      {
        orient: 'angle',
        label: {
          visible: true,
          // Returning { type: 'rich', text: [...] } replaces the plain string.
          formatMethod: (value: string) => ({
            type: 'rich',
            text: [
              { image: ICON, width: 12, height: 12 },
              { text: ` ${value} `, fontSize: ctx.preview ? 11 : 14, fill: '#ffffff', fontWeight: 'bold' },
              { text: `${scores.find((v) => v.key === value)?.value ?? ''}`, fontSize: ctx.preview ? 11 : 14, fill: '#69b1ff', fontWeight: 'bold' },
            ],
          }),
        },
      },
      { orient: 'radius', grid: { smooth: false } },
    ],
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  let alive = true;
  const stop = every(2000, () => {
    if (!alive) return;
    scores = KEYS.map((key) => ({ key, value: Math.round(30 + rand() * 70) }));
    void vchart.updateData('stats', scores);
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
