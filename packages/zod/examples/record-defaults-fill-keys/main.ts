// z.record(z.enum([...]), value.default(...)): missing keys come back filled in
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

// A default on the value makes its key optional in the input.
const Settings = z.record(z.enum(['theme', 'language', 'font']), z.string().default('system'));

const SAMPLES = [
  { label: 'only theme', value: { theme: 'dark' } },
  { label: 'nothing set', value: {} },
  { label: 'all set', value: { theme: 'light', language: 'fi', font: 'serif' } },
  { label: 'wrong type', value: { theme: 3 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remove keys from the JSON: they return in the output.' });
  objectLab(
    stage,
    [{ label: 'settings', code: "z.record(z.enum(['theme','language','font']), z.string().default('system'))", schema: Settings, say: (r) => (r.success ? '✓ Missing keys were added with the default' : '✗ A given value must still be text') }],
    SAMPLES,
    { plan: [[0, 0], [0, 1], [0, 3]], inTitle: 'Settings in', outTitle: 'Settings out' },
  );
  return stage.dispose;
};

export default mount;
