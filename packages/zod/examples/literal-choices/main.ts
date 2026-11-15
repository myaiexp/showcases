// z.literal([...]) allows several exact values; .values lists them
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, note } from '../../shared/widgets.ts';

const Size = z.literal(['small', 'medium', 'large']);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a T-shirt size: only the three allowed words pass.' });
  codeLine(stage.root, 'z.literal(["small", "medium", "large"])');
  const field = textField(stage.root, stage, { label: 'Size', placeholder: 'small', tries: ['medium', 'Medium', 'XL', ''] });
  note(stage.root, `.values → ${[...Size.values].map((v) => `"${v}"`).join(', ')}`);
  field.onInput((text) => {
    if (!text) return field.state(null, 'Type a size');
    const r = Size.safeParse(text);
    field.state(r.success, r.success ? `✓ "${r.data}" is one of the allowed sizes` : `✗ ${r.error.issues[0]!.message}`);
  });
  field.state(null, 'Type a size');
  if (stage.bar) select(stage.bar, 'Pick', [['', '(type it)'], ...[...Size.values].map((v) => [v, v] as const)], (v) => v && field.set(v));
  typeLoop(stage, field, ['large', 'Large', 'huge']);
  return stage.dispose;
};

export default mount;
