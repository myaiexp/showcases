// A global error map can read the failing schema's metadata and put its title in the message
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';
import { keepConfig, settle } from '../../shared/error-config.ts';

// A registry of our own (the page-wide z.globalRegistry stays untouched): schema -> title.
const titles = z.registry<{ title: string }>();

const Account = z.object({
  password: z.string().min(8).register(titles, { title: 'Password' }),
  email: z.email().register(titles, { title: 'Email address' }),
  age: z.number().register(titles, { title: 'Age' }),
  nickname: z.string(),
});

// iss.schema is the schema that owns the issue, even when a check (min) raised it.
const withTitle = (iss: z.core.$ZodRawIssue): string => `${(iss.schema && titles.get(iss.schema)?.title) ?? 'Field'} is invalid.`;

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick an account: each message names the field through its registered title.',
    say: (results) => (results.every((r) => r.success) ? '✓ Valid: no message was needed' : '✗ The global map names each field through its registered title'),
    columns: [
      { title: 'Default', code: 'z.string().min(8)', schema: Account },
      {
        title: 'Titles from a registry',
        code: 'titles.get(iss.schema)?.title',
        schema: {
          // z.config is page-wide: set it, parse, read the messages, and restore, in one block.
          safeParse: (x) =>
            keepConfig(() => {
              z.config({ customError: withTitle });
              return settle(Account.safeParse(x));
            }),
        },
      },
    ],
    samples: [
      { label: 'Short password', value: { password: 'abc', email: 'ada@example.com', age: 30, nickname: 'ada' } },
      { label: 'Several wrong', value: { password: 'abcdefghij', email: 'ada@', age: 'x', nickname: 5 } },
      { label: 'All good', value: { password: 'abcdefghij', email: 'ada@example.com', age: 30, nickname: 'ada' } },
    ],
  });

export default mount;
