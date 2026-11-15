// The same operations on a plain and a compiled schema, compared
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows, type Row } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { leafText } from '../../shared/value-view.ts';
import { codeLine } from '../../shared/widgets.ts';

const Player = z.object({ username: z.string().min(3), xp: z.number().int() });
const Fast = z.compile(Player);
const good = { username: 'billie', xp: 100 };
const bad = { username: 'bi', xp: 1.5 };

/** Runs one operation on both schemas; it passes when the two answers read the same. */
const compare = (label: string, op: (s: typeof Player) => unknown): Row => {
  const read = (s: typeof Player): string => {
    try {
      return leafText(op(s));
    } catch (err) {
      return `threw ${(err as Error).constructor.name}`;
    }
  };
  const a = read(Player);
  const b = read(Fast);
  return { input: label, result: a === b ? { success: true, data: b } : { success: false, error: { issues: [{ path: [], message: `plain: ${a} / compiled: ${b}` }] } } };
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each row runs one operation on Player and on z.compile(Player).' });
  codeLine(stage.root, 'Player  vs  z.compile(Player)');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Operation', outTitle: 'Both said' });
  const results = [
    compare('.parse(good)', (s) => s.parse(good)),
    compare('.safeParse(bad) issues', (s) => s.safeParse(bad).error?.issues.map((i) => [i.path.join('.'), i.message])),
    compare('.extend({ level })', (s) => s.extend({ level: z.number() }).safeParse({ ...good, level: 2 }).data),
    compare('.optional() on undefined', (s) => s.optional().parse(undefined)),
    compare('.pick({ xp })', (s) => s.pick({ xp: true }).parse(good)),
    compare('z.toJSONSchema()', (s) => z.toJSONSchema(s).required),
    compare('z.encode(…)', (s) => z.encode(s, good)),
  ];
  rows.show(stage.preview ? results.slice(0, 7) : results);
  const same = results.every((r) => r.result.success);
  stage.say(same ? '✓ every operation answered the same on both: a compiled schema is an ordinary schema' : '✗ something differed', same ? 'ok' : 'bad');
  return stage.dispose;
};

export default mount;
