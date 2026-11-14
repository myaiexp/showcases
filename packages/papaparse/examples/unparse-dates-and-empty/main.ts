// Dates come out as ISO text; invalid Dates, null and undefined as empty
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select, textInput } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

type Member = { name: string; joined: Date; left: unknown };

const when = (iso: string): Date => new Date(iso);

// A members list: some have joined, some have left, one has a broken date.
const ADA: Member = { name: 'Ada', joined: when('2026-03-01T09:30:00Z'), left: null };
const BRUNO: Member = { name: 'Bruno', joined: when('not a date'), left: undefined };

const STEPS = [
  { hit: [0], col: 'joined', say: 'A Date becomes ISO text.', tone: 'ok' },
  { hit: [1], col: 'joined', say: 'An invalid Date becomes an empty field.', tone: 'warn' },
  { hit: [0, 1], col: 'left', say: 'null and undefined: empty fields.', tone: 'warn' },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the date text (try "nope") and the "left" value.' });
  const f = flow(stage, { from: 'Members', via: 'Papa.unparse(members)', to: 'CSV text' });
  let members: Member[] = [ADA, BRUNO];

  const unparse = (hit: readonly number[], col: string, say?: string, tone: 'ok' | 'warn' = 'ok'): void => {
    // Date objects are written with toISOString(); null, undefined and invalid Dates as ''.
    const csv = Papa.unparse(members);
    f.from.show(dataTable(members, { numbered: false, cellClass: (_v, i, c) => (hit.includes(i) && c === col ? 'pp-hit' : undefined) }));
    f.to.show(csvView(csv, { lineClass: (i) => (hit.includes(i - 1) ? 'pp-hit' : undefined) }));
    if (say) stage.say(say, tone);
  };

  if (stage.preview) {
    stage.cycle(STEPS, 2800, (s) => unparse(s.hit, s.col, s.say, s.tone));
  } else {
    let text = '2026-03-01T09:30:00Z';
    let left: unknown = null;
    const refresh = (): void => {
      members = [{ name: 'Ada', joined: when(text), left }, BRUNO];
      const bad = isNaN(members[0]!.joined.getTime());
      unparse([0, 1], 'joined', bad ? 'That text is not a date: new Date(...) is invalid, so the field is empty.' : 'Ada joined: written as ISO text. Bruno\'s broken date is empty.', bad ? 'warn' : 'ok');
    };
    textInput(stage.bar!, 'new Date(', text, (v) => {
      text = v;
      refresh();
    }, 22);
    select<unknown>(stage.bar!, 'left =', [[null, 'null'], [undefined, 'undefined'], ['', "''"], ['2026-09-30', "'2026-09-30'"]], (v) => {
      left = v;
      refresh();
    });
    refresh();
  }
  return stage.dispose;
};

export default mount;
