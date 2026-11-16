// fabric example: Gotchas: strings from an input are not numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gotchas: strings from an input are not numbers',
  summary:
    'Two shapes set from an input value: one with Number(value), one with the raw string. Fabric does not convert, so the string shape turns "40" + 30 into "4030" on the next nudge and jumps off the canvas. Convert with Number() or parseFloat() first.',
  section: 'Gotchas',
  tags: ['set', 'left', 'parseFloat', 'Number'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
