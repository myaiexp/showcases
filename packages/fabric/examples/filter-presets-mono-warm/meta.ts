// fabric example: Image filters: BlackWhite, Brownie, Vintage, Sepia
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: BlackWhite, Brownie, Vintage, Sepia',
  summary:
    'The colour-matrix presets filters.BlackWhite, Brownie, Vintage and Sepia on the same portrait: each is a ready-made ColorMatrix subclass built with no options.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'BlackWhite', 'Brownie', 'Vintage', 'Sepia', 'ColorMatrix'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/variables/BlackWhite.md',
    'repo/src/content/docs/api/namespaces/filters/variables/Brownie.md',
    'repo/src/content/docs/api/namespaces/filters/variables/Vintage.md',
    'repo/src/content/docs/api/namespaces/filters/variables/Sepia.md',
    'repo/src/content/docs/api/namespaces/filters/classes/ColorMatrix.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
