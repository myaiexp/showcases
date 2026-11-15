// Sign-up text cleaned on the way in: trim, lower case, upper case
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const STEPS = [
  { label: 'trim', code: 'z.string().trim()', schema: z.string().trim(), input: '   ada@example.com  ', say: 'the spaces around it were cut off' },
  { label: 'lower case', code: 'z.string().toLowerCase()', schema: z.string().toLowerCase(), input: 'Ada@Example.COM', say: 'the capitals became lower case' },
  { label: 'upper case', code: 'z.string().toUpperCase()', schema: z.string().toUpperCase(), input: 'fi', say: 'the country code became capitals' },
  { label: 'trim + lower case', code: 'z.string().trim().toLowerCase()', schema: z.string().trim().toLowerCase(), input: '  Ada@Example.COM ', say: 'trimmed and lower-cased in one schema' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const code = codeLine(stage.root, '');
  const cp = checkpoint(stage.root, stage, { inTitle: 'Typed', outTitle: 'Stored', pass: 'Clean' });
  const show = (s: (typeof STEPS)[number]): void => {
    code.textContent = s.code;
    const r = s.schema.safeParse(s.input);
    cp.show(s.input, r);
    stage.say(r.success ? `✓ ${s.say}` : 'rejected', 'ok');
  };
  if (stage.preview) stage.cycle(STEPS, 2800, show);
  else if (stage.bar) {
    select(stage.bar, 'Clean with', STEPS.map((s) => [s, s.label] as const), show);
    show(STEPS[0]!);
  }
  return stage.dispose;
};

export default mount;
