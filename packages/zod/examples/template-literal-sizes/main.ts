// z.templateLiteral(): a number followed by px, em or rem, like a CSS size
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

// Matches `${number}px`, `${number}em` or `${number}rem`.
const Size = z.templateLiteral([z.number(), z.enum(['px', 'em', 'rem'])]);

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.templateLiteral([z.number(), z.enum(["px", "em", "rem"])])',
    schema: Size,
    label: 'Width',
    placeholder: '1.5rem',
    okText: 'a number with a unit',
    samples: ['12px', '1.5rem', '-3em', '12', '12pt', '12 px', 'px'],
    typed: ['1.5rem', '12', '12pt'],
  });

export default mount;
