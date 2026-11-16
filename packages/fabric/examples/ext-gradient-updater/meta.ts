// fabric example: Extensions: gradientUpdaterWrapper for old stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: gradientUpdaterWrapper for old stops',
  summary:
    'Gradients saved by fabric 6 kept an opacity next to each colour stop; v7 ignores it. gradientUpdaterWrapper(Gradient.fromObject) merges that opacity into an rgba colour so the old data renders as it used to.',
  section: 'Extensions',
  tags: ['gradientUpdaterWrapper', 'installGradientUpdater', 'Gradient', 'fromObject', 'colorStops'],
  docs: [
    'repo/extensions/data_updaters/README.md',
    'repo/src/content/docs/api/classes/Gradient.md',
    'repo/src/content/docs/api/classes/Color.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
