// A thermostat log with notes mixed in: comment lines are skipped
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

interface Scene {
  text?: string;
  comments: string | false;
}
const HASH = '08:00,19.5\n# door open\n09:00,18.0';
const SLASH = '08:00,19.5\n// door open\n09:00,18.0';
const FULL = '# thermostat, 14 Nov\n08:00,19.5\n// door open\n09:00,18.0\n# fan on';
const CARD: Scene[] = [
  { text: HASH, comments: false },
  { text: HASH, comments: '#' },
  { text: SLASH, comments: false },
  { text: SLASH, comments: '//' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try # then //: each only skips the lines that start with it.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'rows' });
  const out = output(stage, f.to);
  let comments: string | false = false;
  const input = csvInput(stage, f.from, stage.preview ? HASH : FULL, () => render());

  const render = (): void => {
    // Any line that starts with this string is skipped.
    const result = Papa.parse<string[]>(input.text, { comments });
    f.via.textContent = comments ? `Papa.parse(text, { comments: '${comments}' })` : 'Papa.parse(text)';
    const lineText = (pieces: { text: string }[]): string => pieces.map((p) => p.text).join('');
    input.paint({
      comments: comments || undefined,
      lineClass: (_i, line) => {
        const t = lineText(line.pieces);
        if (comments && t.startsWith(comments)) return 'pp-strike';
        return /^(#|\/\/)/.test(t) ? 'pp-bad' : undefined;
      },
    });
    const note = (r: unknown): boolean => /^(#|\/\/)/.test((r as string[])[0] ?? '');
    out.show(dataTable(result.data, { numbered: false, rowClass: (r) => (note(r) ? 'pp-bad' : undefined) }));
    const stray = result.data.filter(note).length;
    out.pill('rows', result.data.length);
    stage.say(
      !comments ? `${result.data.length} rows: the notes became rows.` : stray ? `Skipped "${comments}" lines; the other note stays.` : `Notes skipped: ${result.data.length} clean rows.`,
      !comments ? 'bad' : stray ? 'warn' : 'ok',
    );
  };

  stage.cycle(stage.preview ? CARD : [{ comments: false } as Scene], 2200, (s) => {
    if (s.text) input.set(s.text);
    comments = s.comments;
    render();
  });
  if (stage.bar) {
    select<string | false>(stage.bar, 'comments', [[false, 'off'], ['#', '"#"'], ['//', '"//"']], (v) => {
      comments = v;
      render();
    });
  }
  return stage.dispose;
};

export default mount;
