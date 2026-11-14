// z.templateLiteral() for "user-123" ids: the shape only is checked
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

// Matches `user-${number}`. The .positive() on the inner number does not reach the text.
const UserId = z.templateLiteral(['user-', z.number().int().positive()]);

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.templateLiteral(["user-", z.number().int().positive()])',
    schema: UserId,
    label: 'Id',
    placeholder: 'user-123',
    okText: 'looks like user-<number>',
    hint: 'Try user-0: the id still passes, because only the text shape is checked.',
    samples: ['user-123', 'user-007', 'user-0', 'user-1.5', 'user-abc', 'USER-5'],
    typed: ['user-123', 'user-0', 'user-abc'],
  });

export default mount;
