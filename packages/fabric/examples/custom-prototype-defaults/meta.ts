// fabric example: Customization: changing defaults for every object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: changing defaults for every object',
  summary:
    'The guide sets fabric.Object.prototype.cornerColor and friends for every object. In v7 objects copy FabricObject.ownDefaults when constructed, so this changes it around the constructors and restores it in the same tick, leaving the page untouched.',
  section: 'Customization',
  tags: ['ownDefaults', 'FabricObject', 'transparentCorners', 'cornerColor', 'cornerSize', 'borderColor', 'borderDashArray'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
