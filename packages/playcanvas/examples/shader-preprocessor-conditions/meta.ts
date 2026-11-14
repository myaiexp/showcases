// playcanvas example: Preprocessor conditions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preprocessor: comparisons, logic and #undef',
  summary:
    'The shader preprocessor resolves #if/#elif/#else chains with ==, >=, && , || and !, #define values and #undef before compilation. A QUALITY define picks the octave count of a noise sphere, GLOW and FLAT combine through defined() tests, and the full view changes the defines of one material live.',
  section: 'Graphics: Shaders',
  tags: ['#if', '#elif', '#else', '#undef', '#define', 'defined()', 'Material.setDefine'],
  docs: ['repo/docs/user-manual/graphics/shaders/preprocessor.md', 'repo/docs/user-manual/graphics/shaders/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
