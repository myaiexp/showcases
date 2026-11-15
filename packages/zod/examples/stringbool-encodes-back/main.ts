// z.stringbool decodes many words and encodes with the first one
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const standard = z.stringbool();
const custom = z.stringbool({ truthy: ['yes', 'y'], falsy: ['no', 'n'] });

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'z.stringbool()',
    codec: standard,
    samples: [
      { label: '"yes"', value: 'yes' },
      { label: '"off"', value: 'off' },
      { label: '"maybe"', value: 'maybe' },
      { label: 'encode true', value: true, dir: 'encode' },
      { label: 'custom: "n"', value: 'n', codec: custom, code: 'z.stringbool({ truthy: ["yes","y"], falsy: ["no","n"] })' },
      { label: 'custom: encode true', value: true, dir: 'encode', codec: custom, code: 'z.stringbool({ truthy: ["yes","y"], falsy: ["no","n"] })' },
    ],
  });

export default mount;
