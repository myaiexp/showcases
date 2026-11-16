// fabric example: Serialization: a missing image falls back in loadFromJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: a missing image falls back in loadFromJSON',
  summary:
    'In version 7 a saved image that cannot load no longer breaks canvas.loadFromJSON: the other objects load and that one is left out. A reviver called with the error can return a placeholder object for it.',
  section: 'Serialization',
  tags: ['loadFromJSON', 'reviver', 'FabricImage', 'Rect'],
  docs: [
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
