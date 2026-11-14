// z.config({ customError }) words every schema at once, set only while this card parses
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';
import { keepConfig, settle } from '../../shared/error-config.ts';

// No message anywhere in this schema.
const Booking = z.object({ guests: z.number().min(1), day: z.iso.date() });

// The global map: a function of the issue, like any error map. It sits below schema-level
// and per-parse messages. z.config() is page-wide, so keepConfig puts the old config back
// right after this parse (settle reads the messages before that).
const house = (iss: z.core.$ZodRawIssue): string => `House style: ${iss.code}`;

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick a booking: the right column parses with a global error map.',
    codes: true,
    columns: [
      { title: 'No global map', code: 'z.config() untouched', schema: Booking },
      {
        title: 'Global customError',
        code: 'z.config({ customError })',
        schema: {
          safeParse: (x) =>
            keepConfig(() => {
              z.config({ customError: house });
              return settle(Booking.safeParse(x));
            }),
        },
      },
    ],
    samples: [
      { label: 'Nobody, bad date', value: { guests: 0, day: 'tomorrow' } },
      { label: 'Guests as text', value: { guests: 'two', day: '2026-12-24' } },
      { label: 'Nothing', value: {} },
      { label: 'Good booking', value: { guests: 2, day: '2026-12-24' } },
    ],
    say: (results) => (results[1]?.success ? '✓ Valid: a global map only speaks when there is a failure' : '✗ One function worded every failure, wherever the schema is'),
  });

export default mount;
