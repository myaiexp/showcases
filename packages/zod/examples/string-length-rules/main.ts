// A username typed live against min, max, length or nonempty
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, pills } from '../../shared/widgets.ts';

const RULES = [
  { label: 'min 3, max 8', code: 'z.string().min(3).max(8)', schema: z.string().min(3).max(8) },
  { label: 'exactly 5', code: 'z.string().length(5)', schema: z.string().length(5) },
  { label: 'at most 12', code: 'z.string().max(12)', schema: z.string().max(12) },
  { label: 'not empty', code: 'z.string().nonempty()  // alias for .min(1)', schema: z.string().nonempty() },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a username: the count and the verdict update on every keystroke.' });
  let rule: (typeof RULES)[number] = RULES[0];
  const code = codeLine(stage.root, rule.code);
  const field = textField(stage.root, stage, { label: 'Username', placeholder: 'ada', tries: ['ad', 'ada_l', 'ada_lovelace_1815'] });
  const [count] = pills(stage.root, ['characters']);

  const check = (text: string): void => {
    const r = rule.schema.safeParse(text);
    count!(String([...text].length), r.success ? 'ok' : 'bad');
    if (!text && rule !== RULES[3]) field.state(null, 'Type a username');
    else field.state(r.success, r.success ? '✓ long enough, short enough' : `✗ ${r.error.issues[0]!.message}`);
  };
  field.onInput(check);
  if (stage.bar) {
    select(stage.bar, 'Rule', RULES.map((r) => [r, r.label] as const), (r) => {
      rule = r;
      code.textContent = r.code;
      check(field.value);
    });
  }
  check('');
  typeLoop(stage, field, ['ad', 'ada_l', 'ada_lovelace_1815']);
  return stage.dispose;
};

export default mount;
