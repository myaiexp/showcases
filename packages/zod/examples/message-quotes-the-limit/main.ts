// A password message that quotes the limit (iss.minimum) and how far the typed text got
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

// The function gets the issue: minimum is the rule, input is what was typed.
const Password = z.string().min(8, {
  error: (iss) => `${String(iss.input).length} of ${String(iss.minimum)} characters: ${Number(iss.minimum) - String(iss.input).length} to go`,
});

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.string().min(8, { error: (iss) => `${len} of ${iss.minimum}…` })',
    schema: Password,
    label: 'Password',
    placeholder: 'at least 8 characters',
    hint: 'Type a password: the message counts for you, because it can read iss.minimum and iss.input.',
    samples: ['hunter', 'hunter2', 'correct horse', 'ada'],
    typed: ['hunter2', 'hunter2!?'],
    okText: 'long enough',
  });

export default mount;
