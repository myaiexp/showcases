// Event functions: xy, x, y, item and group read the pointer from inside a group's own handler
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const dots = [
  { name: 'alpha', x: 50, y: 40 },
  { name: 'beta', x: 150, y: 90 },
  { name: 'gamma', x: 240, y: 50 },
  { name: 'delta', x: 100, y: 130 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 190,
    padding: 8,
    data: [{ name: 'dots', values: dots }],
    marks: [
      {
        type: 'group',
        name: 'panel',
        encode: {
          enter: { x: { value: 150 }, y: { value: 10 }, width: { value: 290 }, height: { value: 170 }, fill: { value: '#1c2230' }, stroke: { value: '#3a4150' } },
        },
        // Streams defined inside a group see only events inside it (source "scope").
        signals: [
          {
            name: 'seen',
            value: { view: [0, 0], local: [0, 0], kind: 'none', who: '-' },
            on: [
              {
                events: 'mousemove',
                update:
                  "{view: [round(x()), round(y())], local: [round(xy(group())[0]), round(xy(group())[1])], kind: item() && item().mark ? item().mark.marktype : 'root', who: item().datum && item().datum.name ? item().datum.name : '-'}",
              },
            ],
          },
          { name: 'pt', value: [0, 0], on: [{ events: 'mousemove', update: 'xy(group())' }] },
        ],
        marks: [
          {
            type: 'symbol',
            from: { data: 'dots' },
            encode: {
              update: {
                x: { field: 'x' },
                y: { field: 'y' },
                size: { value: 420 },
                fill: { signal: "seen.who === datum.name ? 'orange' : 'steelblue'" },
              },
            },
          },
          {
            type: 'rule',
            encode: { update: { x: { signal: 'pt[0]' }, y: { value: 0 }, y2: { value: 170 }, stroke: { value: '#666' } } },
          },
          {
            type: 'rule',
            encode: { update: { x: { value: 0 }, x2: { value: 290 }, y: { signal: 'pt[1]' }, stroke: { value: '#666' } } },
          },
        ...(
          [
            ['x(), y()  (data rectangle)', 'seen.view'],
            ['xy(group())  (panel space)', 'seen.local'],
            ['item().mark.marktype', 'seen.kind'],
            ['item().datum.name', 'seen.who'],
          ] as const
        ).flatMap(([label, expr], i) => [
          { type: 'text' as const, encode: { enter: { x: { value: -142 }, y: { value: 20 + i * 44 }, text: { value: label }, fill: { value: '#a6acb8' }, fontSize: { value: 10.5 } } } },
          { type: 'text' as const, encode: { update: { x: { value: -142 }, y: { value: 36 + i * 44 }, text: { signal: `"" + ${expr}` }, fill: { value: '#ffb454' }, fontSize: { value: 13 } } } },
        ]),
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const path: [number, number][] = [[200, 50], [300, 100], [390, 60], [250, 140], [350, 150]];
    stage.every(800, (i) => {
      const p = path[i % path.length] ?? [200, 50];
      ghost.move(p[0], p[1]);
    });
  }
  return () => stage.dispose();
};

export default mount;
