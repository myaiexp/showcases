// penrose example: rgba: channels and opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rgba: channels and opacity',
  summary:
    'The top row steps the red channel of `rgba(r, g, b, a)` from 0 to 1 while green and blue stay at sampled values, so each variation walks a different line through colour space. The bottom row keeps the colour and steps the alpha over a dark stripe.',
  section: 'Computation: Colors & Sampling',
  tags: ['rgba', 'random'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
