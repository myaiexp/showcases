// A sign-up form: one schema, safeParse per keystroke, issues routed to fields by path
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { fillLoop, textField, type Field } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';

const SignUp = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9_]+$/, { error: 'Only lowercase letters, digits and _' }),
  email: z.email(),
  // Inputs always hold text: coerce turns "29" into 29 before the number checks.
  age: z.coerce.number().int().min(13),
  website: z.url().optional(),
});

const FIELDS = [
  ['username', 'Username', 'ada_l'],
  ['email', 'Email', 'ada@example.com'],
  ['age', 'Age', '29'],
  ['website', 'Website', 'optional'],
] as const;

const STEPS = [
  ['ad', 'ada@', 'twelve', ''],
  ['Ada!', 'ada@example.com', '12', 'ada.dev'],
  ['ada_l', 'ada@example.com', '29', 'https://ada.dev'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fill the form: each field shows the issue Zod found for it.' });
  const fields: Field[] = FIELDS.map(([, label, placeholder]) => textField(stage.root, stage, { label, placeholder }));
  const out = document.createElement('div');
  if (!stage.preview) stage.root.append(out);

  const check = (): void => {
    const [username, email, age, website] = fields.map((f) => f.value);
    // An empty optional field means "not given", which is undefined, not "".
    const result = SignUp.safeParse({ username, email, age, website: website || undefined });
    FIELDS.forEach(([key], i) => {
      const f = fields[i]!;
      const issue = result.success ? undefined : result.error.issues.find((x) => x.path[0] === key);
      if (!f.value && key !== 'website') f.state(null, '');
      else f.state(!issue, issue ? issue.message : '✓');
    });
    if (result.success) {
      stage.say('✓ The whole form is valid: age is now the number ' + result.data.age, 'ok');
      out.replaceChildren(valueView(result.data, { types: true }));
    } else {
      stage.say(`✗ ${result.error.issues.length} field(s) to fix`, 'bad');
      out.replaceChildren();
    }
  };
  fields.forEach((f) => f.onInput(check));
  check();
  fillLoop(stage, fields, STEPS, 1700);
  return stage.dispose;
};

export default mount;
