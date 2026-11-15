// AntV Infographic example: Syntax: extra dashes and arrow styles are normalised
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: extra dashes and arrow styles are normalised',
  summary:
    'The syntax page says longer dash runs, -.-, ==>, --x and --o are normalised to -- or ->, and that id1(label) means id1[label]. Each step writes one of those spellings and draws the plain edge.',
  section: 'Infographic syntax',
  tags: ['relations', 'normalised edges', '---->', '-.-', '==>', 'id(label)'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
