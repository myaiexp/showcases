// Function composition: @p.cycle(100% 0 0 0) is @p(@cycle(100% 0 0 0))
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composing functions with a dot',
  summary:
    'A dot chains functions and the rightmost runs first: @p.cycle(100% 0 0 0) is @p(@cycle(100% 0 0 0)). @cycle turns one corner radius into its four rotations and @p picks one per cell, so every cell is a quarter circle facing a random way.',
  section: 'Syntax overview',
  tags: ["composition", "@p", "@cycle", "border-radius"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
