// AntV Infographic example: Custom pattern: a checkerboard with your own colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom pattern: a checkerboard with your own colours',
  summary:
    'showcase-checks draws two squares per tile from the foregroundColor and backgroundColor the generator receives. The theme can pass its own pair under stylize pattern, so the same generator gives a blue board, a green one and a black-and-white one in the steps.',
  section: 'Custom patterns',
  tags: ['registerPattern', 'backgroundColor', 'foregroundColor', 'PatternConfig', 'stylize'],
  docs: [
    'repo/site/src/content/learn/custom-pattern.en.md',
    'repo/site/src/content/reference/built-in-patterns.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
