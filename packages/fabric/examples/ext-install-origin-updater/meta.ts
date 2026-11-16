// fabric example: Extensions: installOriginWrapperUpdater on a canvas load
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: installOriginWrapperUpdater on a canvas load',
  summary:
    'installOriginWrapperUpdater() wraps fromObject of every object class so loadFromJSON puts v6 data (no origin saved) at its old visual position. It changes the library for the whole page, so here it is installed, used for one load and removed again.',
  section: 'Extensions',
  tags: ['installOriginWrapperUpdater', 'loadFromJSON', 'originX', 'fromObject'],
  docs: [
    'repo/extensions/data_updaters/origins/README.md',
    'repo/extensions/data_updaters/README.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
