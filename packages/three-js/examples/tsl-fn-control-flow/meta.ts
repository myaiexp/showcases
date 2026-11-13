// Three.js example: a Fn shader function using Loop, If and Break
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fn, If and Loop in TSL',
  summary:
    'An escape-time Julia fractal written as a TSL Fn(): Loop() iterates z = z^2 + c per pixel, If() and Break() leave early when the point escapes, and uniforms feed the parameters.',
  section: 'TSL',
  tags: ['Fn', 'If', 'Loop', 'Break', 'toVar', 'assign'],
  docs: ['repo/docs/llms-full.txt', 'repo/docs/pages/LoopNode.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
