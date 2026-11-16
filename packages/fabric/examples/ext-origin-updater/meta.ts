// fabric example: Extensions: originUpdaterWrapper for old data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: originUpdaterWrapper for old data',
  summary:
    'Data saved by fabric 6 with no originX or originY means a top-left corner; v7 reads left and top as the centre. originUpdaterWrapper(Rect.fromObject, "left", "top") returns a loader that puts such an object back where it was drawn, rotation included.',
  section: 'Extensions',
  tags: ['originUpdaterWrapper', 'fromObject', 'originX', 'originY', 'setPositionByOrigin'],
  docs: [
    'repo/extensions/data_updaters/origins/README.md',
    'repo/extensions/data_updaters/README.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
