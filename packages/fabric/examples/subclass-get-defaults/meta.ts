// fabric example: Subclassing: getDefaults and ownDefaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: getDefaults and ownDefaults',
  summary:
    'A Chip subclass bakes in a look and overrides static getDefaults(), so canvas.includeDefaultValues = false leaves that look out of its JSON. A twin class without the override has to list it all.',
  section: 'Subclassing',
  tags: ['getDefaults', 'includeDefaultValues', 'toObject', 'Rect'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Rect.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
