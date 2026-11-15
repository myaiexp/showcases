// Layout offset, titleAnchor, titleBand and headerBand place the headers and titles around a grid
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Header and title groups hang off an origin the layout chooses (see the Headers, Footers and
  // Titles example), so each holds one text drawn around (0, 0).
  const label = (role: string, data: string, text: string, props: Record<string, unknown>) => ({
    type: 'group' as const,
    role,
    from: { data },
    marks: [{ type: 'text' as const, encode: { update: { x: { value: 0 }, y: { value: 0 }, text: { signal: text }, ...props } } }],
  });

  const spec: Spec = {
    padding: 5,

    signals: [
      { name: 'off', value: 6, bind: { input: 'range', min: 0, max: 30, step: 2, name: 'offset' } },
      { name: 'anchor', value: 'start', bind: { input: 'select', options: ['start', 'end'], name: 'titleAnchor' } },
      { name: 'tband', value: 0.5, bind: { input: 'range', min: 0, max: 1, step: 0.25, name: 'titleBand' } },
      { name: 'hband', value: 0.5, bind: { input: 'range', min: 0, max: 1, step: 0.25, name: 'headerBand' } },
    ],

    // offset pushes headers and titles away from the grid. titleAnchor: start puts titles top and
    // left, end puts them bottom and right. titleBand and headerBand slide a title along the
    // whole grid, and a header along its own cell: 0 is the start edge, 1 the far edge.
    layout: {
      columns: 3,
      padding: 6,
      align: 'all',
      offset: { signal: 'off' },
      titleAnchor: { signal: 'anchor' },
      titleBand: { signal: 'tband' },
      headerBand: { signal: 'hband' },
    },

    data: [
      { name: 'cols', values: ['one', 'two', 'three'].map((c) => ({ c })) },
      { name: 'rows', values: ['top', 'bottom'].map((r) => ({ r })) },
      { name: 'one', values: [{ t: 1 }] },
      { name: 'cells', values: [0, 1, 2, 3, 4, 5].map((i) => ({ i })) },
    ],

    marks: [
      label('column-title', 'one', "'column title'", { align: { value: 'center' }, baseline: { value: 'bottom' }, fill: { value: 'orange' } }),
      label('row-title', 'one', "'row title'", { align: { value: 'center' }, baseline: { value: 'bottom' }, angle: { value: -90 }, fill: { value: 'orange' } }),
      label('column-header', 'cols', 'parent.c', { align: { value: 'center' }, baseline: { value: 'bottom' } }),
      label('row-header', 'rows', 'parent.r', { align: { value: 'right' }, baseline: { value: 'middle' } }),
      {
        type: 'group',
        from: { data: 'cells' },
        encode: { update: { width: { value: 80 }, height: { value: 50 }, fill: { value: '#1d2736' }, stroke: { value: 'steelblue' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { off: 20, anchor: 'end', tband: 0, hband: 0 },
      { off: 6, anchor: 'start', tband: 1, hband: 1 },
      { off: 14, anchor: 'start', tband: 0.5, hband: 0.5 },
    ],
    1600,
  );
  return () => stage.dispose();
};

export default mount;
