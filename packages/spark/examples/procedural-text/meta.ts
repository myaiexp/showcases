// Spark example: textSplats turning typed text into a swaying splat mesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural text splats',
  summary:
    'Text rasterised to one splat per pixel by textSplats and returned as a SplatMesh. Type your own text and change font, fontSize, textAlign and lineHeight, or choose between colouring each splat with rgb and tinting white splats with color (SplatMesh.recolor). The card cycles through words.',
  section: 'Procedural Splats',
  tags: ['textSplats', 'font', 'fontSize', 'textAlign', 'lineHeight', 'rgb', 'color', 'recolor'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
