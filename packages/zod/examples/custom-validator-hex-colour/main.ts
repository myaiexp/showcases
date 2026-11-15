// z.custom(): your own yes/no function becomes a schema with your own message
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

// A hex colour is written #rrggbb. The type argument tells TypeScript what a pass means.
const HexColour = z.custom<`#${string}`>((val) => typeof val === 'string' && /^#[0-9a-f]{6}$/i.test(val), 'Not a #rrggbb colour');

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: "z.custom<`#${string}`>(val => /^#[0-9a-f]{6}$/i.test(val), 'Not a #rrggbb colour')",
    schema: HexColour,
    samples: ['#ff8800', '#00AAFF', 'orange', '#fff', '#ff880', '#gg0000'],
    typed: ['#ff8800', '#fff', 'orange'],
    label: 'Colour',
    placeholder: '#rrggbb',
    okText: 'a hex colour',
    showOutput: true,
    cardRows: 4,
  });

export default mount;
