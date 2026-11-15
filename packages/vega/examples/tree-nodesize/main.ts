// size squeezes the tree into a box; nodeSize fixes the room each node gets, so the tree grows
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = packageTree();
  const GAP = 40;

  const spec: Spec = {
    width: 640,
    height: 150,
    padding: { top: 25, left: 10, right: 10, bottom: 5 },
    autosize: 'none',
    signals: [
      { name: 'nodeW', value: 14, bind: { input: 'range', min: 6, max: 26, step: 1 } },
      { name: 'nodeH', value: 45, bind: { input: 'range', min: 20, max: 70, step: 1 } },
    ],
    data: [
      {
        name: 'boxed',
        values: rows.map((r) => ({ ...r })),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'tree', size: [300, 120] },
        ],
      },
      { name: 'boxedLinks', source: 'boxed', transform: [{ type: 'treelinks' }, { type: 'linkpath', shape: 'diagonal' }] },
      {
        name: 'spaced',
        values: rows.map((r) => ({ ...r })),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'tree', nodeSize: [{ signal: 'nodeW' }, { signal: 'nodeH' }] },
          // nodeSize lays the root at x = 0, so measure the spread to shift it into view.
          { type: 'extent', field: 'x', signal: 'xext' },
        ],
      },
      { name: 'spacedLinks', source: 'spaced', transform: [{ type: 'treelinks' }, { type: 'linkpath', shape: 'diagonal' }] },
    ],
    marks: [
      { type: 'text', encode: { enter: { x: { value: 150 }, y: { value: -10 }, text: { value: 'size: [300, 120]' }, align: { value: 'center' }, fill: { value: '#ddd' } } } },
      { type: 'text', encode: { enter: { x: { value: 300 + GAP + 150 }, y: { value: -10 }, text: { value: 'nodeSize: [nodeW, nodeH]' }, align: { value: 'center' }, fill: { value: '#ddd' } } } },
      { type: 'path', from: { data: 'boxedLinks' }, encode: { update: { path: { field: 'path' }, stroke: { value: '#888' } } } },
      {
        type: 'symbol',
        from: { data: 'boxed' },
        encode: { enter: { fill: { value: 'steelblue' }, size: { value: 40 } }, update: { x: { field: 'x' }, y: { field: 'y' } } },
      },
      {
        type: 'path',
        from: { data: 'spacedLinks' },
        encode: { update: { path: { field: 'path' }, stroke: { value: '#888' }, x: { signal: `${300 + GAP} - xext[0]` }, y: { value: 0 } } },
      },
      {
        type: 'symbol',
        from: { data: 'spaced' },
        encode: {
          enter: { fill: { value: 'orange' }, size: { value: 40 } },
          update: { x: { signal: `datum.x - xext[0] + ${300 + GAP}` }, y: { field: 'y' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ nodeW: 8, nodeH: 30 }, { nodeW: 22, nodeH: 60 }, { nodeW: 14, nodeH: 45 }], 1900);
  return () => stage.dispose();
};

export default mount;
