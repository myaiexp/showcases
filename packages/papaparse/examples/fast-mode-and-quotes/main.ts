// Quoted addresses read with fastMode forced on, left unset, and forced off
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'name,city\nAda,"Leeds, UK"\nBo,"Lyon, FR"';
const SAYS = {
  forced: ['fastMode: true: quotes stay, commas split.', 'bad'],
  unset: ['Left unset: Papa saw quotes, stayed careful.', 'ok'],
  off: ['fastMode: false: careful, same good result.', 'ok'],
} as const;
type Mode = keyof typeof SAYS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch modes, then delete the quote marks from the text: unset fast mode turns itself on.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'rows' });
  const out = output(stage, f.to);
  let mode: Mode = 'forced';
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // true: split at every comma, no quote handling. false: always careful. Unset: decided by the text.
    const fastMode = mode === 'forced' ? true : mode === 'off' ? false : undefined;
    const result = Papa.parse<string[]>(input.text, fastMode === undefined ? {} : { fastMode });
    f.via.textContent = fastMode === undefined ? 'Papa.parse(text)' : `Papa.parse(text, { fastMode: ${fastMode} })`;
    input.paint({});
    const width = result.data[0]?.length ?? 0;
    out.show(dataTable(result.data, { numbered: false, rowClass: (r) => ((r as string[]).length !== width ? 'pp-bad' : undefined) }));
    const hasQuotes = input.text.includes('"');
    const fastRan = fastMode ?? !hasQuotes;
    out.pill('quote marks in text', hasQuotes);
    out.pill('fast mode ran', fastRan, fastRan && hasQuotes ? 'bad' : 'ok');
    const [text, tone] = SAYS[mode];
    stage.say(stage.preview || hasQuotes ? text : 'No quotes in the text: fast mode is safe here.', stage.preview || hasQuotes ? tone : 'ok');
  };

  choose<Mode>(
    stage,
    'fastMode',
    [
      ['forced', 'true (forced on)'],
      ['unset', 'left out (Papa decides)'],
      ['off', 'false (forced off)'],
    ],
    (m) => {
      mode = m;
      render();
    },
  );
  return stage.dispose;
};

export default mount;
