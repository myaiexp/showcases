// A log separated by spaces: Papa cannot detect that, so the default delimiter decides
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { select } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { errorList } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A sensor log separated by spaces: not one of the delimiters Papa tries to guess.
const TEXT = 'Ada 31 Oslo\nBo 28 Lyon\nCy 45 Graz';
const DEFAULTS: readonly (readonly [string, string])[] = [
  [',', "',' (the stock default)"],
  [' ', "' ' (a space)"],
  ['~', "'~'"],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the default, or put ~ between the words: detection fails, so the default is used.' });
  const f = flow(stage, { from: 'Text separated by spaces', via: '', to: 'rows', split: 0.36 });
  const out = output(stage, f.to);
  let wanted = DEFAULTS[0]![0];

  const render = (): void => {
    // DefaultDelimiter is page-wide: set it, parse in the same block, put it back.
    const before = Papa.DefaultDelimiter;
    Papa.DefaultDelimiter = wanted;
    let result: Papa.ParseResult<string[]>;
    try {
      result = Papa.parse<string[]>(input.text, { skipEmptyLines: true });
    } finally {
      Papa.DefaultDelimiter = before;
    }
    const shown = wanted === ' ' ? '␣' : wanted;
    f.via.textContent = stage.preview ? `Papa.DefaultDelimiter = '${wanted}'` : `Papa.DefaultDelimiter = '${wanted}'; Papa.parse(text)`;
    input.paint({ delimiter: result.meta.delimiter });
    const lost = result.errors.some((e) => e.code === 'UndetectableDelimiter');
    out.show(dataTable(result.data, { numbered: false, maxRows: 3 }), errorList(result.errors, { compact: stage.preview, max: 1, none: 'errors: none: Papa found a delimiter itself' }));
    out.pill('delimiter used', shown, 'ok');
    out.pill('default restored to', Papa.DefaultDelimiter);
    const cols = result.data[0]?.length ?? 0;
    stage.say(
      !lost ? 'Detection worked, so the default was not needed.' : cols > 1 ? `Detection failed: default "${shown}" gave ${cols} columns.` : `Detection failed: default "${shown}" gave 1 column.`,
      cols > 1 || !lost ? 'ok' : 'warn',
    );
  };
  const input = csvInput(stage, f.from, TEXT, render);
  const show = (d: string): void => {
    wanted = d;
    render();
  };
  stage.cycle(stage.preview ? [',', ' '] : [','], 3000, show);
  if (stage.bar) select(stage.bar, 'Papa.DefaultDelimiter', DEFAULTS, show);
  return stage.dispose;
};

export default mount;
