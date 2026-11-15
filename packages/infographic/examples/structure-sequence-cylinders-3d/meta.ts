// AntV Infographic example: Structure: SequenceCylinders3d
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequenceCylinders3d",
  summary:
    "The SequenceCylinders3d structure (id sequence-cylinders-3d) draws cylinders that grow taller along the sequence, chosen with a design block in the infographic syntax. The 5 steps change baseHeight, heightIncrement, cylinderRx, cylinderRy, itemVerticalAlign and depthSpacing under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-cylinders-3d', 'design', 'baseHeight', 'heightIncrement', 'cylinderRx', 'cylinderRy', 'itemVerticalAlign', 'depthSpacing'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
