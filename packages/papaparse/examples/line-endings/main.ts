// The same rows ended with \n, \r\n or \r: detected, or forced by newline
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { output } from '../../shared/config-kit.ts';
import { csvView, visible } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const ROWS = ['name,city', 'Ada,Leeds', 'Bo,Lyon'];
const WHO: Record<string, string> = { '\n': 'Linux, Mac', '\r\n': 'Windows', '\r': 'old Mac' };
// [what the text uses, the newline option ('' leaves it out)]
const SCENES: (readonly [string, string])[] = [
  ['\n', ''],
  ['\r\n', ''],
  ['\r', ''],
  ['\r', '\n'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change what the text uses, then force a newline option that does not match.' });
  const f = flow(stage, { from: 'CSV text (read-only: ␍ and ↵ are drawn)', via: 'Papa.parse(text)', to: 'Rows' });
  const out = output(stage, f.to);
  let ending = '\n';
  let option = '';

  const render = (): void => {
    const text = ROWS.join(ending);
    // Left out, newline is detected. Set it to \n, \r\n or \r to skip the detection.
    const result = Papa.parse<string[]>(text, option ? { newline: option as '\n' } : {});
    f.from.show(csvView(text));
    f.via.textContent = option ? `Papa.parse(text, { newline: '${visible(option)}' })` : 'Papa.parse(text)';
    const mismatch = option !== '' && option !== ending;
    const stray = (v: unknown): boolean => typeof v === 'string' && /[\r\n]/.test(v);
    out.show(
      dataTable(result.data, {
        numbered: false,
        rowClass: (r) => ((r as string[]).length < 2 ? 'pp-bad' : undefined),
        cellClass: (v) => (stray(v) ? 'pp-bad' : undefined),
      }),
    );
    out.pill('meta.linebreak', visible(result.meta.linebreak));
    const rows = result.data.length;
    stage.say(
      mismatch ? `Forced ${visible(option)} on ${visible(ending)} text: ${rows} row${rows === 1 ? '' : 's'}, messy cells.` : `Text uses ${visible(ending)} (${WHO[ending]}): ${rows} rows.`,
      mismatch ? 'bad' : 'ok',
    );
  };

  stage.cycle(SCENES, 2400, ([e, o]) => {
    ending = e;
    option = o;
    render();
  });
  if (stage.bar) {
    const kinds = [['\n', '\\n  (Linux, Mac)'], ['\r\n', '\\r\\n  (Windows)'], ['\r', '\\r  (old Mac)']] as const;
    select(stage.bar, 'Text ends lines with', kinds, (v) => {
      ending = v;
      render();
    });
    const opts = [['', 'left out (detect)'], ['\n', '\\n'], ['\r\n', '\\r\\n'], ['\r', '\\r']] as const;
    select(stage.bar, 'newline option', opts, (v) => {
      option = v;
      render();
    });
  }
  return stage.dispose;
};

export default mount;
