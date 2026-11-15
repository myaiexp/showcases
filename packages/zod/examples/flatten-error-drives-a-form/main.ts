// z.flattenError gives a form one list per field plus one for the whole form
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { fillLoop, textField, type Field } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, note } from '../../shared/widgets.ts';

const Register = z
  .object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
  })
  // An issue on the whole object has path []: it lands in formErrors, not fieldErrors.
  .refine((d) => d.password !== d.username, { error: 'The password must differ from the username' });

const FIELDS = [
  ['username', 'Username', 'ada_l'],
  ['email', 'Email', 'ada@example.com'],
  ['password', 'Password', '8+ characters'],
] as const;

const STEPS = [
  ['ad', 'ada@', 'ad'],
  ['ada_lovelace', 'ada@example.com', 'ada_lovelace'],
  ['ada_l', 'ada@example.com', 'analytical-engine'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fill the form: fieldErrors feed each box, formErrors feeds the banner.' });
  codeLine(stage.root, 'const { formErrors, fieldErrors } = z.flattenError(error)');
  const fields: Field[] = FIELDS.map(([, label, placeholder]) => textField(stage.root, stage, { label, placeholder }));
  const banner = note(stage.root, '');

  const check = (): void => {
    const input = Object.fromEntries(FIELDS.map(([key], i) => [key, fields[i]!.value]));
    const result = Register.safeParse(input);
    const flat = result.success ? { formErrors: [] as string[], fieldErrors: {} as Record<string, string[] | undefined> } : z.flattenError(result.error);
    FIELDS.forEach(([key], i) => {
      const f = fields[i]!;
      const messages = flat.fieldErrors[key];
      if (!f.value) f.state(null, '');
      else f.state(!messages, messages ? messages[0]! : '✓');
    });
    // Empty boxes are equal, which would trip the refine before anyone typed: wait for both.
    const form = fields[0]!.value && fields[2]!.value ? flat.formErrors : [];
    banner.textContent = form.length ? `Form: ${form.join(' · ')}` : '';
    banner.hidden = !form.length;
    if (!fields.some((f) => f.value)) stage.say('Fill in the form: each box and the banner read their own part of the flattened error', 'info');
    else if (result.success) stage.say('✓ No field has an error and formErrors is empty', 'ok');
    else stage.say(`✗ formErrors has ${form.length}, fieldErrors names ${Object.keys(flat.fieldErrors).length} field(s)`, 'bad');
  };
  fields.forEach((f) => f.onInput(check));
  check();
  fillLoop(stage, fields, STEPS, 1800);
  return stage.dispose;
};

export default mount;
