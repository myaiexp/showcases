// Empty and spaces-only lines: false keeps both, true one, greedy none
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const CARD = 'Ada,2\n\n   ';
const FULL = 'name,qty\nAda,2\n\nBo,5\n   \nCy,1';
type Mode = false | true | 'greedy';
const SAYS: Record<string, [string, 'ok' | 'warn' | 'bad']> = {
  false: ['3 rows: two are blank junk.', 'bad'],
  true: ['2 rows: the empty line went, spaces stay.', 'warn'],
  greedy: ['1 row: both blank lines went.', 'ok'],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the setting. Add a line with a few spaces, or a Tab, to see which setting drops it.' });
  const f = flow(stage, { from: 'CSV text (blank lines marked)', via: 'Papa.parse(text)', to: 'rows' });
  const out = output(stage, f.to);
  let mode: Mode = false;
  const input = csvInput(stage, f.from, stage.preview ? CARD : FULL, () => render());

  const render = (): void => {
    // false keeps every line, true drops empty ones, 'greedy' also drops whitespace-only ones.
    const result = Papa.parse<string[]>(input.text, { skipEmptyLines: mode });
    f.via.textContent = `{ skipEmptyLines: ${typeof mode === 'string' ? `'${mode}'` : mode} }`;
    const blank = (s: string): boolean => s.trim() === '';
    input.paint({ lineClass: (_i, line) => (blank(line.pieces.map((p) => p.text).join('')) ? 'pp-hit' : undefined) });
    const junk = (r: unknown): boolean => blank((r as string[]).join(''));
    out.show(dataTable(result.data, { numbered: false, rowClass: (r) => (junk(r) ? 'pp-bad' : undefined) }));
    const left = result.data.filter(junk).length;
    out.pill('junk rows left', left, left ? 'bad' : 'ok');
    const [text, tone] = stage.preview ? SAYS[String(mode)]! : [`${result.data.length} rows, ${left} of them blank.`, left ? 'warn' : 'ok'];
    stage.say(text as string, tone as 'ok' | 'warn' | 'bad');
  };

  choose<Mode>(
    stage,
    'skipEmptyLines',
    [
      [false, 'false (default)'],
      [true, 'true'],
      ['greedy', "'greedy'"],
    ],
    (m) => {
      mode = m;
      render();
    },
  );
  return stage.dispose;
};

export default mount;
