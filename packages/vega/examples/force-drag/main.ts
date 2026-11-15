// Dragging a node pins it with fx and fy; the rest of the graph keeps settling around it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { ringGraph } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const graph = ringGraph(28, 4);

  const spec: Spec = {
    width: 400,
    height: 250,
    padding: 0,
    autosize: 'none',
    signals: [
      // 0: idle, 1: hovering a node, 2: dragging it
      {
        name: 'fix',
        value: 0,
        on: [
          { events: 'symbol:mouseout[!event.buttons], window:mouseup', update: '0' },
          { events: 'symbol:mouseover', update: 'fix || 1' },
          { events: '[symbol:mousedown, window:mouseup] > window:mousemove!', update: '2', force: true },
        ],
      },
      { name: 'node', value: null, on: [{ events: 'symbol:mouseover', update: 'fix === 1 ? item() : node' }] },
      // Restart the simulation while a node is being dragged.
      { name: 'restart', value: false, on: [{ events: { signal: 'fix' }, update: 'fix > 1' }] },
    ],
    data: [
      { name: 'node-data', values: graph.nodes },
      { name: 'links', values: graph.links },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category10' } }],
    marks: [
      {
        name: 'nodes',
        type: 'symbol',
        zindex: 1,
        from: { data: 'node-data' },
        on: [
          // While dragging, pin the node to the pointer; on release, free it again.
          { trigger: 'fix', modify: 'node', values: 'fix === 1 ? {fx: node.x, fy: node.y} : {fx: x(), fy: y()}' },
          { trigger: '!fix', modify: 'node', values: '{fx: null, fy: null}' },
        ],
        encode: {
          enter: { fill: { scale: 'color', field: 'group' }, stroke: { value: '#ddd' } },
          update: { size: { value: 160 }, cursor: { value: 'pointer' } },
        },
        transform: [
          {
            type: 'force',
            restart: { signal: 'restart' },
            forces: [
              { force: 'center', x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
              { force: 'collide', radius: 7 },
              { force: 'nbody', strength: -30 },
              { force: 'link', links: 'links', distance: 40 },
            ],
          },
        ],
      },
      {
        type: 'path',
        from: { data: 'links' },
        interactive: false,
        encode: { update: { stroke: { value: '#888' } } },
        transform: [
          { type: 'linkpath', sourceX: 'datum.source.x', sourceY: 'datum.source.y', targetX: 'datum.target.x', targetY: 'datum.target.y' },
        ],
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: the pretend pointer grabs a node, pulls it across the view and lets go.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    type Item = { x: number; y: number };
    const items = (): Item[] => {
      const root = (view.scenegraph() as unknown as { root: unknown }).root as { items: { items: { name?: string; items: Item[] }[] }[] };
      return root.items[0]?.items.find((m) => m.name === 'nodes')?.items ?? [];
    };
    stage.every(3200, async (i) => {
      const list = items();
      const it = list[(i * 7) % Math.max(1, list.length)];
      if (!it) return;
      const to: [number, number] = i % 2 ? [90, 60] : [310, 190];
      await ghost.drag([it.x, it.y], to, 1200, 20);
      ghost.out();
    });
  }
  return () => stage.dispose();
};

export default mount;
