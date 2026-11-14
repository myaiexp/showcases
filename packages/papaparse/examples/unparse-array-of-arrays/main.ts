// A scoreboard grid becomes CSV text, and follows every edit in the grid
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { editableGrid } from '../../shared/unparse-kit.ts';

// Each inner array is one row of the grid: the first row holds the column titles.
const BOARDS: { name: string; grid: (string | number)[][] }[] = [
  { name: 'League table', grid: [['Team', 'Won', 'Points'], ['Reds', 7, 23], ['Blues', 5, 17]] },
  { name: 'Quiz night', grid: [['Player', 'Round 1', 'Total'], ['Ada', 8, 19], ['Chen', 6, 17]] },
  { name: 'Golf', grid: [['Name', 'Holes', 'Score'], ['Ivo', 18, 71], ['Hana', 18, 69]] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change a score in the grid: the CSV text follows on every keystroke.' });
  const f = flow(stage, {
    from: 'A grid of values',
    via: stage.preview ? 'Papa.unparse' : 'Papa.unparse(grid)',
    to: 'CSV text',
  });

  const unparse = (grid: readonly (readonly unknown[])[], name: string): void => {
    // An array of arrays: every inner array becomes one line of text.
    const csv = Papa.unparse(grid as unknown[][]);
    f.to.show(csvView(csv));
    stage.say(`${name}: ${grid.length} rows become ${grid.length} lines of text.`, 'ok');
  };

  if (stage.preview) {
    stage.cycle(BOARDS, 3200, ({ name, grid }) => {
      f.from.show(dataTable(grid, { numbered: false }));
      unparse(grid, name);
      revealRows(f.from.body);
    });
  } else {
    const start = BOARDS[0]!;
    f.from.show(editableGrid([], start.grid, (rows) => unparse(rows, 'Your grid')));
    unparse(start.grid, start.name);
  }
  return stage.dispose;
};

export default mount;
