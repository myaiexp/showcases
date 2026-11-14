// epochSecondsToDate and epochMillisToDate codecs, defined as the docs show
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const epochSecondsToDate = z.codec(z.int().min(0), z.date(), {
  decode: (seconds) => new Date(seconds * 1000),
  encode: (date) => Math.floor(date.getTime() / 1000),
});
const epochMillisToDate = z.codec(z.int().min(0), z.date(), {
  decode: (millis) => new Date(millis),
  encode: (date) => date.getTime(),
});

const SEC = 'epochSecondsToDate';
const MS = 'epochMillisToDate';
const fraction = new Date('2024-01-15T10:30:00.999Z');

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: SEC,
    codec: epochSecondsToDate,
    samples: [
      { label: 'seconds 1705314600', value: 1705314600, code: SEC },
      { label: 'seconds, encode .999', value: fraction, dir: 'encode', code: SEC, say: '✓ both ways work, but .999 s was floored away: lossy' },
      { label: 'seconds -5', value: -5, code: SEC },
      { label: 'millis 1705314600000', value: 1705314600000, codec: epochMillisToDate, code: MS },
      { label: 'millis, encode .999', value: fraction, dir: 'encode', codec: epochMillisToDate, code: MS, say: '✓ milliseconds keep the fraction, so it comes back identical' },
    ],
  });

export default mount;
