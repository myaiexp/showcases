// Tree functions: treePath and treeAncestors light up the nodes between two nodes of a hierarchy
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const nodes = [
  ['A', null], ['B', 'A'], ['C', 'A'], ['D', 'A'], ['E', 'B'], ['F', 'B'], ['G', 'C'], ['H', 'C'],
  ['I', 'D'], ['J', 'E'], ['K', 'E'], ['L', 'G'], ['M', 'H'], ['N', 'H'],
].map(([id, parent]) => ({ id, parent }));
const ids = nodes.map((n) => n.id);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: 8,
    signals: [
      { name: 'src', value: 'J', bind: { input: 'select', options: ids } },
      { name: 'mode', value: 'treePath', bind: { input: 'radio', options: ['treePath', 'treeAncestors'] } },
      // Hover a node to make it the target.
      { name: 'dst', value: 'N', on: [{ events: '@node:mouseover', update: 'datum.id' }] },
      // Both functions return the nodes' data objects; the ids of those are what the marks test.
      {
        name: 'route',
        update: "pluck(mode === 'treePath' ? treePath('tree', src, dst) : treeAncestors('tree', dst), 'id')",
      },
    ],
    data: [
      {
        name: 'tree',
        values: nodes,
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'tree', method: 'tidy', size: [{ signal: 'width' }, { signal: 'height - 20' }] },
        ],
      },
      { name: 'links', source: 'tree', transform: [{ type: 'treelinks' }, { type: 'linkpath', orient: 'vertical', shape: 'line' }] },
    ],
    marks: [
      {
        type: 'path',
        from: { data: 'links' },
        encode: {
          update: {
            path: { field: 'path' },
            stroke: { signal: "indexof(route, datum.source.id) >= 0 && indexof(route, datum.target.id) >= 0 ? 'orange' : '#445'" },
            strokeWidth: { signal: "indexof(route, datum.source.id) >= 0 && indexof(route, datum.target.id) >= 0 ? 3 : 1.5" },
          },
        },
      },
      {
        type: 'symbol',
        name: 'node',
        from: { data: 'tree' },
        encode: {
          update: {
            x: { field: 'x' },
            y: { field: 'y' },
            size: { value: 520 },
            fill: { signal: "datum.id === dst ? '#ffcf87' : indexof(route, datum.id) >= 0 ? 'orange' : '#2f5d8a'" },
            stroke: { signal: "datum.id === src ? '#fff' : 'transparent'" },
            strokeWidth: { value: 2 },
            cursor: { value: 'pointer' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        encode: {
          update: { x: { field: 'x' }, y: { field: 'y' }, align: { value: 'center' }, baseline: { value: 'middle' }, text: { field: 'id' }, fill: { value: '#fff' }, fontSize: { value: 11 }, interactive: { value: false } },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { signal: 'height + 6' },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: { signal: "mode + '(\"tree\", ' + (mode === 'treePath' ? '\"' + src + '\", ' : '') + '\"' + dst + '\") = ' + join(route, ' > ')" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    ['N', 'L', 'I', 'F', 'M', 'B'].map((dst) => ({ dst })),
    1100,
  );
  if (stage.preview) {
    stage.every(4400, (i) => {
      view.signal('mode', i % 2 ? 'treeAncestors' : 'treePath');
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
