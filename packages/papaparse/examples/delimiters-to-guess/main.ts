// A tilde-separated file: delimitersToGuess teaches detection about "~"
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'Ada~Leeds~40\nBo~Lyon~15\nCy~Graz~22';
const COMMON = [',', '\t', '|', ';'];
const EXTRA = ['~', '^'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick candidates for Papa to try. Swap ~ for ^ in the text and tick ^ instead.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'Rows' });
  const out = output(stage, f.to);
  let extra: string[] = [];
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    const candidates = [...COMMON, ...extra];
    // The list of separators Papa may pick from when delimiter is left out.
    const result = Papa.parse<string[]>(input.text, { delimitersToGuess: candidates });
    const found = !result.errors.some((e) => e.code === 'UndetectableDelimiter');
    const d = result.meta.delimiter;
    f.via.textContent = extra.length ? `{ delimitersToGuess: [..., '${extra.join("', '")}'] }` : 'Papa.parse(text)';
    input.paint({ delimiter: found ? d : '' });
    out.show(dataTable(result.data, { numbered: false, rowClass: () => (found ? 'pp-ok' : 'pp-bad') }));
    out.pill('looked for', candidates.map((c) => (c === '\t' ? 'tab' : c)).join(' '));
    out.pill('found', found ? d : 'nothing', found ? 'ok' : 'bad');
    stage.say(found ? `Found "${d}": ${result.data[0]?.length ?? 0} columns.` : 'No separator found: one column, all glued.', found ? 'ok' : 'bad');
  };

  stage.cycle([[], ['~']], 2600, (list) => {
    extra = list;
    render();
  });
  if (stage.bar) for (const c of EXTRA) checkbox(stage.bar, `also guess ${c}`, extra.includes(c), (on) => {
    extra = on ? [...extra, c] : extra.filter((x) => x !== c);
    render();
  });
  return stage.dispose;
};

export default mount;
