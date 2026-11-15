// pack nests circles: leaves sized by file size, parents wrap them, padding spaces them apart
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300,
    height: 300,
    padding: 5,
    autosize: 'none',
    signals: [{ name: 'padding', value: 4, bind: { input: 'range', min: 0, max: 20, step: 1 } }],
    data: [
      {
        name: 'tree',
        values: packageTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'pack', field: 'size', padding: { signal: 'padding' }, size: [{ signal: 'width' }, { signal: 'height' }] },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: [
      {
        // Sorting by depth draws parents under their children.
        type: 'symbol',
        from: { data: 'tree' },
        sort: { field: 'datum.depth' },
        encode: {
          update: {
            x: { field: 'x' },
            y: { field: 'y' },
            size: { signal: '4 * datum.r * datum.r' },
            fill: { scale: 'color', field: 'branch' },
            fillOpacity: { signal: 'datum.children ? 0.18 : 0.85' },
            stroke: { signal: "datum.children ? '#777' : '#ddd'" },
            strokeWidth: { value: 1 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        encode: {
          enter: { align: { value: 'center' }, baseline: { value: 'middle' }, fill: { value: '#111' }, fontSize: { value: 9 } },
          update: {
            x: { field: 'x' },
            y: { field: 'y' },
            text: { signal: "!datum.children && datum.r > 12 ? datum.name : ''" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'padding', [4, 14, 0, 8], 1600);
  return () => stage.dispose();
};

export default mount;
