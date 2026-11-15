// Group roles turn groups into the headers, footers and titles around a grid of cells
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/cards.ts';

const COLS = ['Q1', 'Q2', 'Q3'];
const ROWS = ['North', 'South'];
const rand = rng(11);
const CELLS = ROWS.flatMap((r) => COLS.map((c) => ({ r, c, v: Math.round(20 + rand() * 80) })));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // A header, footer or title group has no size of its own: the layout moves its origin to the
  // grid edge (a column header's origin is at the top of the cell, over its left edge), and its
  // text hangs off that origin. Hence the text offsets and baselines below.
  const label = (role: string, data: string, text: string, x: number, y: number, props: Record<string, unknown>) => ({
    type: 'group' as const,
    role,
    from: { data },
    marks: [
      {
        type: 'text' as const,
        encode: { update: { x: { value: x }, y: { value: y }, text: { signal: text }, ...props } },
      },
    ],
  });

  const spec: Spec = {
    padding: 5,

    // One header or footer group per row or column, one title for the whole axis.
    // columns and padding place the cells; offset moves the headers, footers and titles
    // away from the grid edge, and each is told its role below.
    layout: { columns: 3, padding: 6, align: 'all', offset: { columnTitle: 8, rowTitle: 8, columnHeader: 4, rowHeader: 4, columnFooter: 4, rowFooter: 4 } },

    data: [
      { name: 'cols', values: COLS.map((c) => ({ c, total: CELLS.filter((d) => d.c === c).reduce((a, d) => a + d.v, 0) })) },
      { name: 'rows', values: ROWS.map((r) => ({ r, total: CELLS.filter((d) => d.r === r).reduce((a, d) => a + d.v, 0) })) },
      { name: 'one', values: [{ t: 1 }] },
      { name: 'cells', values: CELLS },
    ],

    marks: [
      label('column-title', 'one', "'Quarter'", 0, 0, { align: { value: 'center' }, baseline: { value: 'bottom' }, fontWeight: { value: 'bold' } }),
      label('row-title', 'one', "'Region'", 0, 0, { align: { value: 'center' }, baseline: { value: 'bottom' }, angle: { value: -90 }, fontWeight: { value: 'bold' } }),
      label('column-header', 'cols', 'parent.c', 45, 0, { align: { value: 'center' }, baseline: { value: 'bottom' } }),
      label('row-header', 'rows', 'parent.r', 0, 30, { align: { value: 'right' }, baseline: { value: 'middle' } }),
      label('column-footer', 'cols', "'total ' + parent.total", 45, 0, { align: { value: 'center' }, baseline: { value: 'top' }, fill: { value: '#889' }, fontSize: { value: 10 } }),
      label('row-footer', 'rows', "parent.total", 0, 30, { align: { value: 'left' }, baseline: { value: 'middle' }, fill: { value: '#889' }, fontSize: { value: 10 } }),
      {
        type: 'group',
        from: { data: 'cells' },
        encode: { update: { width: { value: 90 }, height: { value: 60 }, fill: { value: '#1d2736' }, stroke: { value: 'steelblue' } } },
        marks: [
          {
            type: 'rect',
            encode: { update: { x: { value: 6 }, width: { signal: 'parent.v * 0.78' }, y: { value: 20 }, height: { value: 20 }, fill: { value: 'steelblue' } } },
          },
          // A child mark without `from` gets its own empty datum: the group's row is `parent`.
          { type: 'text', encode: { update: { x: { value: 6 }, y: { value: 8 }, baseline: { value: 'middle' }, fontSize: { value: 11 }, text: { signal: 'parent.v' } } } },
        ],
      },
    ],
  };

  await stage.render(spec);
  if (stage.preview) stage.every(60_000, () => undefined);
  return () => stage.dispose();
};

export default mount;
