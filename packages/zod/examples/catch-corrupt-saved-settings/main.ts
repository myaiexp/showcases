// A corrupt saved file: strict schema rejects it, .catch() swaps the bad fields
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { plural } from '../../shared/widgets.ts';

const Strict = z.object({ volume: z.number().min(0).max(100), theme: z.enum(['dark', 'light']), name: z.string() });
// Each field keeps a safe fallback for the day its saved value is garbage.
const Forgiving = z.object({
  volume: z.number().min(0).max(100).catch(50),
  theme: z.enum(['dark', 'light']).catch('dark'),
  name: z.string().catch('Player'),
});

const SAMPLES = [
  { label: 'damaged', value: { volume: 'loud', theme: 'neon', name: 'Ada' } },
  { label: 'out of range', value: { volume: 400, theme: 'light', name: 'Ada' } },
  { label: 'all good', value: { volume: 30, theme: 'light', name: 'Ada' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a saved file or edit the JSON, and switch the schema.' });
  objectLab(
    stage,
    [
      {
        label: 'Strict',
        code: 'volume: z.number().min(0).max(100), theme: z.enum([…]), …',
        schema: Strict,
        say: (r) => (r.success ? '✓ Every value was fine' : `✗ Rejected: ${plural(r.error.issues.length, 'bad value')} and nothing is loaded`),
      },
      {
        label: 'With catch',
        code: 'volume: z.number().min(0).max(100).catch(50), theme: …catch("dark"), …',
        schema: Forgiving,
        say: (r, input) => {
          const changed = r.success ? Object.keys(r.data as object).filter((k) => (r.data as Record<string, unknown>)[k] !== (input as Record<string, unknown>)[k]).length : 0;
          return changed ? `✓ Loaded: ${plural(changed, 'bad value')} replaced by a fallback` : '✓ Loaded: nothing needed a fallback';
        },
      },
    ],
    SAMPLES,
    { plan: [[0, 0], [1, 0], [1, 1]], ms: 3000 },
  );
  return stage.dispose;
};

export default mount;
