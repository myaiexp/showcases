// Branded ids pass through unchanged: the brand is a TypeScript-only label
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// Both are plain strings at run time. The brand only changes the TypeScript type.
const UserId = z.string().startsWith('u_').brand<'UserId'>();
const OrderId = z.string().startsWith('o_').brand<'OrderId'>();

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: the output is the plain text either way.',
    inputs: ['u_42', 'o_7', 'x_1'],
    inTitle: 'Id',
    outTitle: 'Output',
    types: true,
    noun: 'ids',
    variants: [
      {
        label: 'UserId',
        code: "z.string().startsWith('u_').brand<'UserId'>()",
        schema: UserId,
        say: 'u_42 comes out as the same plain text. Only TypeScript knows it is a UserId, so it cannot be passed as an OrderId',
      },
      {
        label: 'OrderId',
        code: "z.string().startsWith('o_').brand<'OrderId'>()",
        schema: OrderId,
        say: 'o_7 comes out as the same plain text. Only TypeScript knows it is an OrderId, so it cannot be passed as a UserId',
      },
    ],
  });

export default mount;
