// A handle typed live against z.string().regex()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const Handle = z.string().regex(/^[a-z][a-z0-9_]*$/);

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.string().regex(/^[a-z][a-z0-9_]*$/)',
    schema: Handle,
    label: 'Handle',
    placeholder: 'ada_l',
    okText: 'matches the pattern',
    hint: 'Type a handle: lowercase letters, digits and underscores, starting with a letter.',
    samples: ['ada_l', 'Ada', '9lives', 'ada lovelace', 'ada-l', 'ada_1815'],
    typed: ['ada_l', 'Ada-L', '9lives'],
  });

export default mount;
