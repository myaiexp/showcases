// Zod example: z.input and z.output: check either side of a codec
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.input and z.output: check either side of a codec',
  summary:
    "An event has a date field that is a codec, text on the way in and a Date on the way out. z.input(Event) is a schema for the text side, z.output(Event) for the Date side, so each accepts the form of the data it is named for and refuses the other.",
  section: 'Transforms and pipes',
  tags: ['z.input', 'z.output', 'z.codec', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
