// AntV Infographic example: Item: LetterCard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Item: LetterCard",
  summary:
    "The LetterCard item (id letter-card) is a card with optional stripes, gradient and bottom shadow, placed in a list-grid structure with a design block. The 5 steps change showStripe, showGradient, showBottomShade, width and height under the item line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in items",
  tags: ['letter-card', 'design', 'showStripe', 'showGradient', 'showBottomShade', 'width', 'height'],
  docs: [
    'repo/site/src/content/reference/built-in-items.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
