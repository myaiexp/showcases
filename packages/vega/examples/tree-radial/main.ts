// A radial tree: tree lays out angle and radius, linkpath with orient radial draws the edges
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 320,
    padding: 5,
    autosize: 'none',
    signals: [
      { name: 'method', value: 'cluster', bind: { input: 'select', options: ['tidy', 'cluster'] } },
      { name: 'shape', value: 'diagonal', bind: { input: 'select', options: ['line', 'curve', 'diagonal', 'orthogonal'] } },
      { name: 'radius', value: 150, update: 'width / 2 - 10' },
    ],
    data: [
      {
        name: 'tree',
        values: packageTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          // x becomes an angle in radians and y a radius
          { type: 'tree', method: { signal: 'method' }, size: [{ signal: '2 * PI' }, { signal: 'radius' }], separation: false },
          { type: 'formula', as: 'px', expr: 'datum.y * sin(datum.x)' },
          { type: 'formula', as: 'py', expr: '-datum.y * cos(datum.x)' },
        ],
      },
      {
        name: 'links',
        source: 'tree',
        transform: [
          { type: 'treelinks' },
          { type: 'linkpath', orient: 'radial', shape: { signal: 'shape' }, sourceX: 'source.x', sourceY: 'source.y', targetX: 'target.x', targetY: 'target.y' },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: [
      {
        type: 'path',
        from: { data: 'links' },
        encode: { update: { path: { field: 'path' }, stroke: { value: '#888' }, x: { signal: 'width / 2' }, y: { signal: 'height / 2' } } },
      },
      {
        type: 'symbol',
        from: { data: 'tree' },
        encode: {
          enter: { stroke: { value: '#ddd' }, strokeWidth: { value: 0.5 } },
          update: {
            x: { signal: 'datum.px + width / 2' },
            y: { signal: 'datum.py + height / 2' },
            fill: { scale: 'color', field: 'branch' },
            size: { signal: 'datum.children ? 70 : 36' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { method: 'tidy', shape: 'curve' },
    { method: 'cluster', shape: 'orthogonal' },
    { method: 'cluster', shape: 'diagonal' },
    { method: 'tidy', shape: 'line' },
  ], 1800);
  return () => stage.dispose();
};

export default mount;
