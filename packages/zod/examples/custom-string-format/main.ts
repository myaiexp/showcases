// z.stringFormat() builds a named format from a pattern
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

// A part number: three capitals, a dash, four digits. A function works here too.
const Sku = z.stringFormat('part-number', /^[A-Z]{3}-\d{4}$/);

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.stringFormat("part-number", /^[A-Z]{3}-\\d{4}$/)',
    schema: Sku,
    label: 'Part',
    placeholder: 'ABC-1234',
    okText: 'a part-number',
    samples: ['ABC-1234', 'XYZ-0001', 'abc-1234', 'ABC-123', 'ABCD-1234'],
    typed: ['ABC-1234', 'abc-12', 'XYZ-00012'],
  });

export default mount;
