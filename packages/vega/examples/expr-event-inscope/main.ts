// Event functions: inScope tells a handler inside a group whether the item under the pointer is its own
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const inside = [0, 1, 2].map((i) => ({ i, x: 40 + i * 70, y: 70 }));
  const outside = [0, 1, 2].map((i) => ({ i, x: 40 + i * 70, y: 200 }));

  const spec: Spec = {
    width: 260,
    height: 240,
    padding: 8,
    data: [
      { name: 'inside', values: inside },
      { name: 'outside', values: outside },
    ],
    marks: [
      {
        type: 'group',
        encode: { enter: { x: { value: 0 }, y: { value: 0 }, width: { value: 260 }, height: { value: 130 }, fill: { value: '#1c2230' }, stroke: { value: '#3a4150' } } },
        signals: [
          // The handler lives in this group but listens to the whole view, so inScope can say
          // whether the item under the pointer belongs to the group.
          {
            name: 'mine',
            value: 'move over the circles',
            on: [
              {
                events: { source: 'view', type: 'mousemove' },
                update: "item() && item().mark && item().mark.marktype === 'symbol' ? (inScope(item()) ? 'inside this group' : 'outside this group') : 'move over the circles'",
              },
            ],
          },
        ],
        marks: [
          {
            type: 'symbol',
            from: { data: 'inside' },
            encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { value: 900 }, fill: { value: 'steelblue' } } },
          },
          {
            type: 'text',
            encode: {
              update: { x: { value: 8 }, y: { value: 16 }, text: { signal: "'inScope(item()): ' + mine" }, fill: { signal: "mine === 'inside this group' ? 'orange' : '#ddd'" }, fontSize: { value: 12 } },
            },
          },
        ],
      },
      {
        type: 'symbol',
        from: { data: 'outside' },
        encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { value: 900 }, fill: { value: '#d977c9' } } },
      },
      {
        type: 'text',
        encode: { enter: { x: { value: 0 }, y: { value: 150 }, text: { value: 'circles outside the group:' }, fill: { value: '#a6acb8' }, fontSize: { value: 11 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const stops = [...inside, ...outside];
    stage.every(800, (i) => {
      const p = stops[i % stops.length];
      if (p) ghost.move(p.x, p.y);
    });
  }
  return () => stage.dispose();
};

export default mount;
