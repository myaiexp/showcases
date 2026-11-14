// escapeFormulae puts a ' before cells a spreadsheet would run as formulas
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { jsonEditor, sheetView } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];

// A sign-up list where visitors typed what they liked into the "Note" box.
const CARD_ROWS: Grid = [
  ['Name', 'Note'],
  ['Ada', '=1+1'],
  ['Bruno', '@SUM(A1)'],
];
const FULL_ROWS: Grid = [
  ['Name', 'Note'],
  ['Ada', '=HYPERLINK("http://evil.example","Click me")'],
  ['Bruno', '@SUM(A1)'],
  ['Chen', '+49 301234'],
  ['Dalia', 'Great shop'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a note starting with =, +, - or @ and see what the spreadsheet would do.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.unparse(rows, { escapeFormulae })', to: 'Opened in a spreadsheet' });
  let rows: Grid = stage.preview ? CARD_ROWS : FULL_ROWS;

  const unparse = (escapeFormulae: boolean): void => {
    // true: a value that starts with = + - @ (or a tab or return) gets a ' put in front of it
    const csv = Papa.unparse(rows, { escapeFormulae });
    f.from.show(csvView(csv));
    f.to.show(sheetView(csv, stage.preview ? '' : 'What the spreadsheet shows'));
    const runs = f.to.body.querySelectorAll('.pp-sheet-run').length;
    if (runs) stage.say(`Off: ${runs} cells would run as formulas.`, 'bad');
    else stage.say("On: a ' keeps them plain text.", 'ok');
  };

  if (stage.preview) {
    stage.cycle([false, true], 3000, (on) => {
      unparse(on);
      revealRows(f.to.body);
    });
  } else {
    let on = true;
    checkbox(stage.bar!, 'escapeFormulae: true', on, (v) => {
      on = v;
      unparse(on);
    });
    stage.root.prepend(jsonEditor(FULL_ROWS, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(on);
      }
    }, 7).el);
    unparse(on);
  }
  return stage.dispose;
};

export default mount;
