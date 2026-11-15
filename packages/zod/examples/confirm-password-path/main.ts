// A refine across two fields whose issue is pinned to the confirm field with path
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { fillLoop, textField } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const PasswordForm = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ['confirm'],
  });

const STEPS = [
  ['tea-time-9', 'tea-time'],
  ['tea-time-9', 'tea-time-9'],
  ['tea', 'tea'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type in both fields: the mismatch is reported on Confirm, not on the form as a whole.' });
  codeLine(stage.root, 'refine(d => d.password === d.confirm, { path: ["confirm"] })');
  const password = textField(stage.root, stage, { label: 'Password', placeholder: '8+ characters' });
  const confirm = textField(stage.root, stage, { label: 'Confirm', placeholder: 'again' });

  const check = (): void => {
    const result = PasswordForm.safeParse({ password: password.value, confirm: confirm.value });
    const issueOn = (key: string) => (result.success ? undefined : result.error.issues.find((i) => i.path[0] === key));
    const pw = issueOn('password');
    const cf = issueOn('confirm');
    password.state(password.value ? !pw : null, password.value ? (pw ? pw.message : '✓') : '');
    confirm.state(confirm.value ? !cf : null, confirm.value ? (cf ? `${cf.message}  (path: confirm)` : '✓') : '');
    if (result.success) stage.say('✓ The form is valid', 'ok');
    else if (cf) stage.say('✗ The mismatch issue arrived with path ["confirm"]', 'bad');
    else stage.say(`✗ ${result.error.issues[0]!.message}`, 'warn');
  };
  password.onInput(check);
  confirm.onInput(check);
  check();
  fillLoop(stage, [password, confirm], STEPS, 1700);
  return stage.dispose;
};

export default mount;
