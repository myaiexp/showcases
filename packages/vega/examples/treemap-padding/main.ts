// paddingInner separates siblings, paddingOuter frames children, paddingTop leaves room for a header
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 280,
    padding: 5,
    autosize: 'none',
    signals: [
      { name: 'inner', value: 2, bind: { input: 'range', min: 0, max: 12, step: 1 } },
      { name: 'outer', value: 3, bind: { input: 'range', min: 0, max: 14, step: 1 } },
      // paddingTop overrides paddingOuter on the top edge only.
      { name: 'top', value: 16, bind: { input: 'range', min: 0, max: 30, step: 1 } },
    ],
    data: [
      {
        name: 'tree',
        values: packageTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          {
            type: 'treemap',
            field: 'size',
            paddingInner: { signal: 'inner' },
            paddingOuter: { signal: 'outer' },
            paddingTop: { signal: 'top' },
            size: [{ signal: 'width' }, { signal: 'height' }],
          },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: [
      {
        type: 'rect',
        from: { data: 'tree' },
        sort: { field: 'datum.depth' },
        encode: {
          update: {
            x: { field: 'x0' },
            x2: { field: 'x1' },
            y: { field: 'y0' },
            y2: { field: 'y1' },
            fill: { scale: 'color', field: 'branch' },
            fillOpacity: { signal: 'datum.depth == 0 ? 0.15 : datum.depth == 1 ? 0.35 : 0.9' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        interactive: false,
        encode: {
          enter: { fontSize: { value: 10 }, fill: { value: '#eee' } },
          update: {
            x: { signal: 'datum.x0 + 4' },
            y: { signal: 'datum.y0 + 11' },
            text: { signal: "datum.depth == 1 || (datum.depth == 2 && datum.x1 - datum.x0 > 40 && datum.y1 - datum.y0 > 14) ? datum.name : ''" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { inner: 2, outer: 3, top: 16 },
    { inner: 10, outer: 3, top: 16 },
    { inner: 2, outer: 12, top: 4 },
    { inner: 0, outer: 0, top: 0 },
  ], 1600);
  return () => stage.dispose();
};

export default mount;
