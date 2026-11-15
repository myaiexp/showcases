// Compare objects: sort by one or several fields, with signals for the field and order
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const ROWS = [
  { name: 'ash', group: 'tree', size: 40 },
  { name: 'fern', group: 'plant', size: 15 },
  { name: 'oak', group: 'tree', size: 85 },
  { name: 'moss', group: 'plant', size: 5 },
  { name: 'elm', group: 'tree', size: 60 },
  { name: 'rose', group: 'plant', size: 30 },
  { name: 'pine', group: 'tree', size: 70 },
  { name: 'iris', group: 'plant', size: 22 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Both charts run the same rows through collect + window: collect sorts by a Compare object,
  // and the row_number it feeds puts each bar in its sorted slot.
  const bars = (data: string, y: number) => ({
    type: 'rect' as const,
    from: { data },
    encode: {
      update: {
        x: { signal: '(datum.rank - 1) * 52 + 4' },
        width: { value: 46 },
        y2: { value: y + 80 },
        y: { signal: `${y + 80} - datum.size * 0.8` },
        fill: { signal: "datum.group === 'tree' ? '#2ecc71' : '#ff9f43'" },
      },
    },
  });
  const labels = (data: string, y: number) => ({
    type: 'text' as const,
    from: { data },
    encode: {
      update: {
        x: { signal: '(datum.rank - 1) * 52 + 27' },
        y: { value: y + 92 },
        align: { value: 'center' as const },
        fontSize: { value: 10 },
        text: { field: 'name' },
      },
    },
  });

  const spec: Spec = {
    width: 420,
    height: 240,
    padding: 5,

    signals: [
      { name: 'sortField', value: 'size', bind: { input: 'select', options: ['name', 'group', 'size'] } },
      { name: 'sortOrder', value: 'ascending', bind: { input: 'select', options: ['ascending', 'descending'] } },
    ],

    data: [
      { name: 'table', values: ROWS },
      {
        name: 'byChoice',
        source: 'table',
        transform: [
          // A Compare cannot be one signal, but its field and order can each be a signal.
          { type: 'collect', sort: { field: { signal: 'sortField' }, order: { signal: 'sortOrder' } } },
          { type: 'window', ops: ['row_number'], as: ['rank'] },
        ],
      },
      {
        name: 'byGroupThenSize',
        source: 'table',
        transform: [
          // Several fields, each with its own order: groups ascending, sizes descending within.
          { type: 'collect', sort: { field: ['group', 'size'], order: ['ascending', 'descending'] } },
          { type: 'window', ops: ['row_number'], as: ['rank'] },
        ],
      },
    ],

    marks: [
      line("'sort by ' + sortField + ', ' + sortOrder", 0),
      bars('byChoice', 20),
      labels('byChoice', 20),
      line("'sort by [group, size], [ascending, descending]'", 120),
      bars('byGroupThenSize', 140),
      labels('byGroupThenSize', 140),
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { sortField: 'name', sortOrder: 'ascending' },
      { sortField: 'size', sortOrder: 'descending' },
      { sortField: 'group', sortOrder: 'ascending' },
      { sortField: 'size', sortOrder: 'ascending' },
    ],
    1400,
  );
  return () => stage.dispose();
};

export default mount;
