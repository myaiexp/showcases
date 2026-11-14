// z.emoji() over faces, flags, keycaps and look-alike plain characters
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.emoji()',
    schema: z.emoji(),
    samples: ['😀', '1️⃣', '🇫🇮', '👍🏽', '123', '#', '*'],
    typed: ['1', '12', '😀'],
    okText: 'an emoji',
    cardRows: 6,
    hint: 'Type digits, then an emoji: digits alone are not emoji.',
  });

export default mount;
