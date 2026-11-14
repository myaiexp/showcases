// A start/end date rule on an object: the issue with no path vs pinned to the end field
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import type { Result } from '../../shared/verdict.ts';
import { createStage } from '../../shared/stage.ts';

const Trip = z.object({ traveller: z.string().min(1), start: z.iso.date(), end: z.iso.date() });
const endsAfterStart = (t: { start: string; end: string }): boolean => t.end >= t.start;

// ISO dates sort like text, so comparing the strings compares the days.
const loose = Trip.refine(endsAfterStart, { error: 'The trip ends before it starts' });
const pinned = Trip.refine(endsAfterStart, { error: 'The trip ends before it starts', path: ['end'] });

const SAMPLES = [
  { label: 'ends too early', value: { traveller: 'Ada', start: '2026-03-10', end: '2026-03-08' } },
  { label: 'good trip', value: { traveller: 'Ada', start: '2026-03-10', end: '2026-03-14' } },
];

const sayOf = (r: Result): string => (r.success ? '✓ A valid trip' : r.error.issues[0]!.path.length ? '✗ The issue is pinned on the end field: a form can show it there' : '✗ The issue belongs to the trip as a whole: no field is marked');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a rule version, then change the dates in the JSON.' });
  objectLab(
    stage,
    [
      { label: 'No path', code: 'Trip.refine(endsAfterStart, { error })', schema: loose, say: sayOf },
      { label: 'path: ["end"]', code: 'Trip.refine(endsAfterStart, { error, path: ["end"] })', schema: pinned, say: sayOf },
    ],
    SAMPLES,
    { plan: [[0, 0], [1, 0], [1, 1]], messages: true },
  );
  return stage.dispose;
};

export default mount;
