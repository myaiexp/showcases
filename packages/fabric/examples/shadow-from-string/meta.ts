// fabric example: Patterns and shadows: Shadow from a CSS-like string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Patterns and shadows: Shadow from a CSS-like string',
  summary:
    "new Shadow('10px 10px 5px red') parses offsetX, offsetY, blur and color; the parsed fields and toString() are printed while you edit the string.",
  section: 'Patterns and shadows',
  tags: ['Shadow', 'parseShadow', 'toString'],
  docs: ['repo/src/content/docs/api/classes/Shadow.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/classes/Circle.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
