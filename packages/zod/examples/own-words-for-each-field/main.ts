// The same sign-up schema with default messages and with your own words per field
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

// Default wording: nothing is passed to the schema functions.
const Plain = z.object({
  name: z.string().min(2),
  email: z.email(),
  age: z.number().min(18),
});

// Own words: every function takes the message as its last argument.
const OwnWords = z.object({
  name: z.string('Tell us your name').min(2, 'Names need two letters or more'),
  email: z.email('That does not look like an email'),
  age: z.number('Age is a number').min(18, 'You must be 18 or older'),
});

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick a sign-up or edit the JSON: both schemas check the same data.',
    columns: [
      { title: 'Default messages', code: 'z.string().min(2)', schema: Plain },
      { title: 'Your own words', code: "z.string('Tell us…').min(2, '…')", schema: OwnWords },
    ],
    samples: [
      { label: 'Short name, young', value: { name: 'A', email: 'ada@example.com', age: 15 } },
      { label: 'Fields left out', value: {} },
      { label: 'Bad email', value: { name: 'Ada', email: 'ada@', age: 30 } },
      { label: 'All good', value: { name: 'Ada', email: 'ada@example.com', age: 30 } },
    ],
    say: (results) => (results.every((r) => r.success) ? '✓ Both accept it: custom words only matter when something fails' : '✗ Same problems, same places: only the words differ'),
  });

export default mount;
