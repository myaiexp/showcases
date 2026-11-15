// A counter in a refine: once on good data, twice when compiled and bad
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { columns, logLine } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { verdictView } from '../../shared/verdict.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

let runs = 0;
const Booking = z.object({
  code: z.string().refine((code) => {
    runs++; // counts every time Zod calls this check
    return /^[A-Z]{3}\d{3}$/.test(code);
  }, 'A booking code looks like ABC123'),
  seats: z.int().min(1).max(8),
});
const FastBooking = z.compile(Booking);

const SAMPLES = [
  { label: 'good booking', value: { code: 'XYZ123', seats: 2 } },
  { label: 'seats wrong', value: { code: 'XYZ123', seats: 40 } },
  { label: 'code wrong', value: { code: 'xyz', seats: 2 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The counter lives inside the refine: it counts how often Zod called it.' });
  codeLine(stage.root, 'code: z.string().refine(() => { runs++ … })');
  const [plain, fast] = columns(stage.root, ['plain Booking', 'z.compile(Booking)']);
  const run = (schema: typeof Booking, input: unknown): { runs: number; ok: boolean; result: ReturnType<typeof Booking.safeParse> } => {
    runs = 0;
    const result = schema.safeParse(input);
    return { runs, ok: result.success, result };
  };
  drive(stage, SAMPLES, (input) => {
    const a = run(Booking, input);
    const b = run(FastBooking, input);
    const max = 1;
    plain!.body.replaceChildren(verdictView(a.result, { max }));
    fast!.body.replaceChildren(verdictView(b.result, { max }));
    logLine(plain!, `check ran ${plural(a.runs, 'time')}`);
    logLine(fast!, `check ran ${plural(b.runs, 'time')}`, b.runs > a.runs ? 'bad' : 'ok');
    stage.say(
      a.ok ? '✓ valid data: the fast path answered, the check ran once on both' : b.runs > a.runs ? '✗ invalid data: the compiled schema ran the check, failed, and re-ran the standard parser to build the error' : 'both ran the check once',
      a.ok ? 'ok' : 'warn',
    );
  });
  return stage.dispose;
};

export default mount;
