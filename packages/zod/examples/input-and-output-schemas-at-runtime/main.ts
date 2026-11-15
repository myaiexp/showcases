// z.input() and z.output() turn a schema with a codec inside into one schema per side
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const stringToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});

const Event = z.object({ name: z.string(), at: stringToDate });

const asText = z.input(Event);
const asDate = z.output(Event);

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'The Date sample has no JSON editor: JSON cannot hold a Date.',
    columns: [
      { title: 'z.input(Event)', code: 'at must be ISO text', schema: asText },
      { title: 'z.output(Event)', code: 'at must be a Date', schema: asDate },
    ],
    samples: [
      { label: 'at as text', value: { name: 'launch', at: '2024-01-01T00:00:00Z' } },
      { label: 'at as a Date', value: { name: 'launch', at: new Date('2024-01-01T00:00:00Z') } },
      { label: 'at is nonsense', value: { name: 'launch', at: 'soon' } },
    ],
    say: ([i, o]) => (i?.success ? '✓ The input side takes the text form' : o?.success ? '✓ The output side takes the Date form' : '✗ Neither side recognises it'),
  });

export default mount;
