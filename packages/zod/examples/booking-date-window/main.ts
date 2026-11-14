// z.date().min().max(): check-in dates against a December booking window
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const OPEN = new Date('2026-12-01T00:00:00Z');
const CLOSE = new Date('2026-12-31T23:59:59Z');

const After = z.date().min(OPEN, { error: 'Too early: bookings open on 1 December' });
const Before = z.date().max(CLOSE, { error: 'Too late: bookings close on 31 December' });
const Window = z.date().min(OPEN, { error: 'Too early: bookings open on 1 December' }).max(CLOSE, { error: 'Too late: bookings close on 31 December' });

const DATES = [
  new Date('2026-11-20T12:00:00Z'),
  new Date('2026-11-30T23:59:59Z'),
  new Date('2026-12-01T00:00:00Z'),
  new Date('2026-12-24T18:00:00Z'),
  new Date('2026-12-31T23:59:59Z'),
  new Date('2027-01-01T00:00:00Z'),
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [
      { label: 'min and max', code: 'z.date().min(1 Dec).max(31 Dec)', schema: Window, say: 'Only dates inside the window pass; each miss names its side. The edge days themselves are in' },
      { label: 'min only', code: 'z.date().min(1 Dec)', schema: After, say: 'min(): nothing earlier than the opening day gets through' },
      { label: 'max only', code: 'z.date().max(31 Dec)', schema: Before, say: 'max(): nothing later than the closing moment gets through' },
    ],
    { inputs: DATES, showOutput: false, inTitle: 'Check-in', outTitle: 'Zod says', noun: 'dates' },
  );
  return stage.dispose;
};

export default mount;
