// Strictness is per object: an outer loose or strict one does not change inner ones
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { pathText } from '../../shared/paths.ts';

const OuterLoose = z.looseObject({ name: z.string(), address: z.object({ city: z.string() }) });
const InnerStrict = z.object({ name: z.string(), address: z.strictObject({ city: z.string() }) });
const OuterStrict = z.strictObject({ name: z.string(), address: z.looseObject({ city: z.string() }) });

const base = { name: 'Ada' };
const SAMPLES = [
  { label: 'note and zip', value: { ...base, address: { city: 'Oslo', zip: '0150' }, note: 'hi' } },
  { label: 'only a note', value: { ...base, address: { city: 'Oslo' }, note: 'hi' } },
  { label: 'only a zip', value: { ...base, address: { city: 'Oslo', zip: '0150' } } },
];

const report = (r: Parameters<NonNullable<ObjectVariant['say']>>[0], input: unknown): string => {
  if (!r.success) {
    const i = r.error.issues[0]!;
    return `✗ ${i.message} at ${i.path.length ? pathText(i.path) : 'the top level'}`;
  }
  const gone = droppedPaths(input, r.data);
  return gone.length ? `✓ Passed; dropped ${gone.join(', ')}, kept the rest` : '✓ Passed; nothing was dropped';
};

const VARIANTS: ObjectVariant[] = [
  { label: 'loose outside', code: 'z.looseObject({ name, address: z.object({ city }) })', schema: OuterLoose, say: report },
  { label: 'strict inside', code: 'z.object({ name, address: z.strictObject({ city }) })', schema: InnerStrict, say: report },
  { label: 'strict outside', code: 'z.strictObject({ name, address: z.looseObject({ city }) })', schema: OuterStrict, say: report },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Each level obeys its own constructor." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
